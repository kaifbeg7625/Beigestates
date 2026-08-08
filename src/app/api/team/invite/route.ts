import { NextRequest, NextResponse } from "next/server";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { SITE_URL } from "@/lib/site";

// Creates a real Supabase Auth account for a team member (or, for an
// existing one, refreshes their access) and returns a link the owner can
// share however they want — copy it into WhatsApp, resend the email, both.
// Nobody's password, including the owner's, ever passes through this code.
export async function POST(req: NextRequest) {
  try {
    // Verify against the CALLER'S OWN session, never anything the request
    // body claims. Anyone can put "roleId": "<owner's role>" in a POST body;
    // only a real session tied to an owner-role team_members row gets past
    // this.
    const supabase = await createServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Not signed in." }, { status: 401 });
    }

    const { data: isOwner } = await supabase.rpc("is_owner");
    if (!isOwner) {
      return NextResponse.json(
        { error: "Only the owner can add team members." },
        { status: 403 }
      );
    }

    const { email, name, phone, roleId } = await req.json();

    if (!email || !name || !roleId) {
      return NextResponse.json(
        { error: "Name, email, and department are required." },
        { status: 400 }
      );
    }

    const admin = createAdminClient();
    // Not req.nextUrl.origin — that's whatever machine happened to make this
    // request. Send the invite from a local dev server and the recipient
    // gets a link to your laptop instead of the real site.
    const redirectTo = `${SITE_URL}/admin/accept-invite`;

    const { data: invited, error: inviteError } =
      await admin.auth.admin.inviteUserByEmail(email, {
        data: { name },
        redirectTo,
      });

    let userId: string | null = null;
    let resent = false;

    if (invited?.user) {
      userId = invited.user.id;

      // team_members.id references auth.users.id directly, so this row can
      // exist immediately — the person shows up on the roster right away,
      // before they've clicked the invite or set a password.
      const { error: rowError } = await supabase.from("team_members").insert({
        id: userId,
        role_id: roleId,
        name,
        phone: phone || null,
        email,
      });

      if (rowError) {
        // The auth account now exists but isn't a team member — clean it up
        // rather than leaving an orphaned login nobody can see or manage.
        await admin.auth.admin.deleteUser(userId);
        return NextResponse.json({ error: rowError.message }, { status: 500 });
      }
    } else if (inviteError?.message.includes("already been registered")) {
      // The common retry/resend case: this email already has an auth
      // account — from a previous invite, or from clicking "Resend" on the
      // roster. inviteUserByEmail refuses a second time for an existing
      // account, so find it and update its team_members row directly
      // instead of erroring out.
      const { data: existing } = await admin.auth.admin.listUsers();
      const existingUser = existing?.users.find((u) => u.email === email);

      if (!existingUser) {
        return NextResponse.json(
          { error: "Could not find that existing account." },
          { status: 500 }
        );
      }
      userId = existingUser.id;
      resent = true;

      const { error: upsertError } = await supabase
        .from("team_members")
        .upsert({ id: userId, role_id: roleId, name, phone: phone || null, email });

      if (upsertError) {
        return NextResponse.json({ error: upsertError.message }, { status: 500 });
      }
    } else {
      return NextResponse.json(
        { error: inviteError?.message || "Could not send the invite." },
        { status: 400 }
      );
    }

    // A copyable link as well as the email — Supabase's own delivery has
    // been the unreliable part all along today (rate limits, spam
    // filtering, the wrong redirect URL until a few minutes ago). Covers
    // both branches: a brand-new account uses type "invite", one that
    // already existed (the resend/retry path) uses "recovery" — the same
    // type that already worked for the earlier manual fix.
    const { data: linkData, error: linkError } = await admin.auth.admin.generateLink({
      type: resent ? "recovery" : "invite",
      email,
      options: { redirectTo },
    });
    const link = linkError ? null : linkData.properties.action_link;

    if (resent) {
      // Belt and suspenders — still trigger Supabase's own email too, in
      // case the owner doesn't want to relay the link manually.
      await admin.auth.resetPasswordForEmail(email, { redirectTo });
    }

    return NextResponse.json({ success: true, resent, link });
  } catch (err) {
    console.error("Team invite error:", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
