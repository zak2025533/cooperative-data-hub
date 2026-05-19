import { Link, useLocation, useNavigate, Outlet } from "@tanstack/react-router";
import {
  Home, LayoutDashboard, Users, Banknote, ListChecks, BookOpen, FolderKanban,
  Wallet, Building2, ScrollText, LogOut, Sprout, ReceiptText, Warehouse,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const NAV_GROUPS: { title: string; items: { to: string; label: string; icon: any }[] }[] = [
  {
    title: "النظام",
    items: [
      { to: "/", label: "الرئيسية", icon: Home },
      { to: "/dashboard", label: "لوحة المؤشرات", icon: LayoutDashboard },
      { to: "/accounts", label: "دليل الحسابات", icon: BookOpen },
    ],
  },
  {
    title: "العمليات المالية",
    items: [
      { to: "/cash", label: "الصندوق", icon: Wallet },
      { to: "/journal", label: "القيود اليومية", icon: ScrollText },
    ],
  },
  {
    title: "المستفيدين والقروض",
    items: [
      { to: "/beneficiaries", label: "المستفيدين", icon: Users },
      { to: "/loans", label: "القروض", icon: Banknote },
      { to: "/installments", label: "الأقساط", icon: ListChecks },
    ],
  },
  {
    title: "المشاريع والعضوية",
    items: [
      { to: "/projects", label: "المشاريع والتمويل", icon: FolderKanban },
      { to: "/memberships", label: "العضوية والأسهم", icon: Building2 },
      { to: "/units", label: "الوحدات التشغيلية", icon: Sprout },
    ],
  },
];

export function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  async function signOut() {
    await supabase.auth.signOut();
    toast.success("تم تسجيل الخروج");
    navigate({ to: "/login" });
  }

  return (
    <div className="min-h-screen flex bg-background pattern-grain">
      <aside className="w-64 shrink-0 bg-sidebar text-sidebar-foreground flex flex-col sticky top-0 h-screen">
        <div className="p-5 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-sidebar-primary text-sidebar-primary-foreground grid place-items-center">
              <Sprout className="size-5" />
            </div>
            <div>
              <div className="font-bold text-sm leading-tight">جمعية حزم العدين</div>
              <div className="text-xs opacity-70">التعاونية الزراعية</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto p-3 space-y-5">
          {NAV_GROUPS.map((g) => (
            <div key={g.title}>
              <div className="text-[11px] uppercase tracking-wide opacity-60 px-3 mb-2">{g.title}</div>
              <ul className="space-y-1">
                {g.items.map((it) => {
                  const active = location.pathname === it.to;
                  const Icon = it.icon;
                  return (
                    <li key={it.to}>
                      <Link
                        to={it.to}
                        className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                          active
                            ? "bg-sidebar-primary text-sidebar-primary-foreground font-semibold"
                            : "hover:bg-sidebar-accent"
                        }`}
                      >
                        <Icon className="size-4" />
                        <span>{it.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
        <button
          onClick={signOut}
          className="m-3 flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-sidebar-accent border border-sidebar-border"
        >
          <LogOut className="size-4" />
          تسجيل الخروج
        </button>
      </aside>

      <main className="flex-1 min-w-0">
        <Outlet />
      </main>
    </div>
  );
}
