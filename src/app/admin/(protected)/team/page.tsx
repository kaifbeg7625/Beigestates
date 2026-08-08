import { createClient } from "@/lib/supabase/server";
import InviteTeamMemberForm from "@/components/InviteTeamMemberForm";
import TeamRoster from "@/components/TeamRoster";

type Member = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role_id: string;
};

export default async function TeamPage() {
  const supabase = await createClient();

  const [
    {
      data: { user },
    },
    { data: isOwner },
    { data: members },
    { data: roles },
  ] = await Promise.all([
    supabase.auth.getUser(),
    supabase.rpc("is_owner"),
    supabase
      .from("team_members")
      .select("id, name, email, phone, role_id")
      .order("created_at", { ascending: true })
      .returns<Member[]>(),
    supabase.from("roles").select("id, name").order("name"),
  ]);

  return (
    <div className="space-y-8">
      <h1 className="font-extrabold text-2xl">Team</h1>

      {isOwner && roles && <InviteTeamMemberForm roles={roles} />}

      <TeamRoster
        members={members ?? []}
        roles={roles ?? []}
        currentUserId={user?.id ?? ""}
        isOwner={!!isOwner}
      />
    </div>
  );
}
