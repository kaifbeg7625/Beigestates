import { NextRequest, NextResponse } from "next/server";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

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
    const redirectTo = `${req.nextUrl.origin}/admin/accept-invite`;

    const { data: invited, error: inviteError } =
      await admin.auth.admin.inviteUserByEmail(email, {
        data: { name },
        redirectTo,
      });

    if (inviteError || !invited.user) {
      // "already been registered" is the common case — someone re-inviting
      // an email that's already a team member.
      return NextResponse.json(
        { error: inviteError?.message || "Could not send the invite." },
        { status: 400 }
      );
    }

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
  } catch (err) {
    console.error("Team invite error:", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
