import { NextRequest, NextResponse } from "next/server";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { SITE_URL } from "@/lib/site";

// Creates a real Supabase Auth account for a team member and sends them an
// invite email to set their own password — nobody's password, including the
// owner's, ever passes through this code or gets typed by anyone but them.
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
    // gets a link to your laptop instead of the real site, which is exactly
    // what happened here.
    const redirectTo = `${SITE_URL}/admin/accept-invite`;

    const { data: invited, error: inviteError } =
      await admin.auth.admin.inviteUserByEmail(email, {
        data: { name },
        redirectTo,
      });

    if (invited?.user) {
      // team_members.id references auth.users.id directly, so this row can
      // exist immediately — the person shows up on the roster right away,
      // before they've clicked the invite or set a password.
      const { error: rowError } = await supabase.from("team_members").insert({
        id: invited.user.id,
        role_id: roleId,
        name,
        phone: phone || null,
        email,
      });

      if (rowError) {
        // The auth account now exists but isn't a team member — clean it up
        // rather than leaving an orphaned login nobody can see or manage.
        await admin.auth.admin.deleteUser(invited.user.id);
        return NextResponse.json({ error: rowError.message }, { status: 500 });
      }

      return NextResponse.json({ success: true });
    }

    // The common retry case: this email already has an auth account, most
    // often because a previous invite to it was sent but never completed
    // (e.g. the very bug that made the first version of this route mail out
    // a localhost link). inviteUserByEmail refuses a second time for an
    // existing account — a password-reset link is the right tool instead:
    // it works regardless of confirmation state, and lands on the same
    // /admin/accept-invite page either way, since that page just calls
    // updateUser({ password }).
    if (inviteError?.message.includes("already been registered")) {
      const { data: existing } = await admin.auth.admin.listUsers();
      const existingUser = existing?.users.find((u) => u.email === email);

      if (!existingUser) {
        return NextResponse.json(
          { error: "Could not find that existing account." },
          { status: 500 }
        );
      }

      const { error: upsertError } = await supabase
        .from("team_members")
        .upsert({ id: existingUser.id, role_id: roleId, name, phone: phone || null, email });

      if (upsertError) {
        return NextResponse.json({ error: upsertError.message }, { status: 500 });
      }

      const { error: resetError } = await admin.auth.resetPasswordForEmail(email, {
        redirectTo,
      });

      if (resetError) {
        return NextResponse.json({ error: resetError.message }, { status: 500 });
      }

      return NextResponse.json({ success: true, resent: true });
    }

    return NextResponse.json(
      { error: inviteError?.message || "Could not send the invite." },
      { status: 400 }
    );
  } catch (err) {
    console.error("Team invite error:", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
