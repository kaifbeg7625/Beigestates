import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-paper">
      <nav className="bg-blueprint py-4">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          <div className="font-serif font-semibold text-lg text-paper flex items-center gap-4">
            Beig Estates{" "}
            <span className="font-mono text-xs text-brass-bright uppercase">Admin</span>
          </div>
          <div className="flex items-center gap-6 text-[13px] font-mono">
            <Link href="/admin" className="text-paper/75 hover:text-brass-bright">
              Dashboard
            </Link>
            <Link href="/admin/properties" className="text-paper/75 hover:text-brass-bright">
              Properties
            </Link>
            <Link href="/admin/leads" className="text-paper/75 hover:text-brass-bright">
              Leads
            </Link>
            <LogoutButton />
          </div>
        </div>
      </nav>
      <main className="max-w-5xl mx-auto px-6 py-10">{children}</main>
    </div>
  );
}
