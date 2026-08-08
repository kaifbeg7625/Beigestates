import { createClient } from "@/lib/supabase/server";
import InviteTeamMemberForm from "@/components/InviteTeamMemberForm";

type Member = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  roles: { name: string } | null;
};

export default async function TeamPage() {
  const supabase = await createClient();

  const [{ data: isOwner }, { data: members }, { data: roles }] = await Promise.all([
    supabase.rpc("is_owner"),
    supabase
      .from("team_members")
      .select("id, name, email, phone, roles(name)")
      .order("created_at", { ascending: true })
      .returns<Member[]>(),
    supabase.from("roles").select("id, name").order("name"),
  ]);

  return (
    <div className="space-y-8">
      <h1 className="font-extrabold text-2xl">Team</h1>

      {isOwner && roles && <InviteTeamMemberForm roles={roles} />}

      <div className="surface rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-ink/10 text-sm text-ink-soft">
              <th className="p-4 font-bold">Name</th>
              <th className="p-4 font-bold">Department</th>
              <th className="p-4 font-bold">Email</th>
              <th className="p-4 font-bold">Phone</th>
            </tr>
          </thead>
          <tbody>
            {(members ?? []).map((m) => (
              <tr key={m.id} className="border-b border-ink/6 last:border-0">
                <td className="p-4 font-semibold">{m.name}</td>
                <td className="p-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-brass/15 text-brass">
                    {m.roles?.name ?? "—"}
                  </span>
                </td>
                <td className="p-4 text-sm text-ink-soft">{m.email}</td>
                <td className="p-4 text-sm text-ink-soft">{m.phone ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {(!members || members.length === 0) && (
          <p className="p-6 text-sm text-ink-soft">No team members yet.</p>
        )}
      </div>
    </div>
  );
}
