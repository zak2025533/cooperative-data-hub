import { Link, useLocation, useNavigate, Outlet } from "@tanstack/react-router";
import {
  Home, LayoutDashboard, Users, Banknote, ListChecks, BookOpen, FolderKanban,
  Wallet, Building2, ScrollText, LogOut, Sprout, Boxes, ArrowLeftRight,
  Receipt, FileText, ClipboardList, Handshake, Menu, HandCoins,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const NAV_GROUPS: { title: string; items: { to: string; label: string; icon: any }[] }[] = [
  {
    title: "النظام",
    items: [
      { to: "/", label: "الرئيسية", icon: Home },
      { to: "/dashboard", label: "لوحة المؤشرات", icon: LayoutDashboard },
      { to: "/accounts", label: "دليل الحسابات", icon: BookOpen },
      { to: "/service-codes", label: "رموز الخدمات", icon: ListChecks },
    ],
  },
  {
    title: "العمليات المالية",
    items: [
      { to: "/cash", label: "الصندوق", icon: Wallet },
      { to: "/vouchers/receipts", label: "سندات القبض", icon: Receipt },
      { to: "/vouchers/payments", label: "سندات الصرف", icon: Receipt },
      { to: "/custodies", label: "العهد المالية", icon: HandCoins },
      { to: "/journal", label: "القيود اليومية", icon: ScrollText },
      { to: "/procedures", label: "قائمة الإجراءات", icon: ClipboardList },
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
    title: "المخزون والمبيعات",
    items: [
      { to: "/items", label: "أصناف المخزون", icon: Boxes },
      { to: "/stock", label: "حركات المخزون", icon: ArrowLeftRight },
      { to: "/invoices", label: "الفواتير", icon: FileText },
      { to: "/stocktake", label: "الجرد", icon: ClipboardList },
    ],
  },
  {
    title: "المشاريع والوحدات",
    items: [
      { to: "/projects", label: "المشاريع والتمويل", icon: FolderKanban },
      { to: "/contract-farming", label: "الزراعة التعاقدية", icon: Handshake },
      { to: "/memberships", label: "العضوية والأسهم", icon: Building2 },
      { to: "/units", label: "الوحدات التشغيلية", icon: Sprout },
    ],
  },
];

export function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  async function signOut() {
    await supabase.auth.signOut();
    toast.success("تم تسجيل الخروج");
    navigate({ to: "/login" });
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-sidebar text-sidebar-foreground">
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
                      onClick={() => isMobile && setOpen(false)}
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
    </div>
  );

  return (
    <div className="min-h-screen flex bg-background pattern-grain">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <aside className="w-64 shrink-0 sticky top-0 h-screen border-l border-sidebar-border">
          <SidebarContent />
        </aside>
      )}

      {/* Mobile Header & Sidebar */}
      {isMobile && (
        <div className="fixed top-0 left-0 right-0 h-14 border-b bg-background/80 backdrop-blur-md z-40 flex items-center px-4 justify-between">
          <div className="flex items-center gap-2">
            <Sprout className="size-5 text-primary" />
            <span className="font-bold text-sm">جمعية حزم العدين</span>
          </div>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="p-0 w-72">
              <SidebarContent />
            </SheetContent>
          </Sheet>
        </div>
      )}

      <main className={`flex-1 min-w-0 ${isMobile ? "pt-14" : ""}`}>
        <Outlet />
      </main>
    </div>
  );
}
