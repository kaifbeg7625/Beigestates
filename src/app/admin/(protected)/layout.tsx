import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";

// Same ink navigation bar as the public site header, not the old navy
// "bg-blueprint" — the admin panel had been the last place still on the
// pre-redesign colour.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-paper">
      <nav className="bg-ink py-4">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          <div className="font-extrabold text-lg text-paper flex items-center gap-3">
            Beig Estates
            <span className="label text-brass-bright">Admin</span>
          </div>
          <div className="flex items-center gap-6 text-base">
            <Link href="/admin" className="text-paper/75 hover:text-brass-bright transition-colors">
              Dashboard
            </Link>
            <Link href="/admin/properties" className="text-paper/75 hover:text-brass-bright transition-colors">
              Properties
            </Link>
            <Link href="/admin/leads" className="text-paper/75 hover:text-brass-bright transition-colors">
              Leads
            </Link>
            <Link href="/admin/team" className="text-paper/75 hover:text-brass-bright transition-colors">
              Team
            </Link>
            <LogoutButton />
          </div>
        </div>
      </nav>
      <main className="max-w-5xl mx-auto px-6 py-10">{children}</main>
    </div>
  );
}
