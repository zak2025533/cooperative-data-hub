import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import {
  LayoutDashboard, BookOpen, ScrollText, Wallet, Building, Users, Banknote, ListChecks,
  ClipboardList, FolderKanban, Boxes, ShoppingCart, ShoppingBag, BarChart3, Stethoscope,
  Sprout, Receipt, FileText, FileMinus, FilePlus, FileX, Building2, Network, Settings,
  Coffee, Wheat, TreePine, FlaskConical, Warehouse, Beef, Megaphone, Handshake,
  HandCoins, Droplets, Bone, TrendingUp, Tractor,
} from "lucide-react";

export const Route = createFileRoute("/_authenticated/")({ component: MainHub });

const GROUPS: { title: string; color: string; items: { to: string; label: string; icon: any; soon?: boolean }[] }[] = [
  {
    title: "النظام والتقارير", color: "from-emerald-500/15 to-emerald-500/5",
    items: [
      { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { to: "/accounts", label: "دليل الحسابات", icon: BookOpen },
      { to: "/journal", label: "كشف حساب", icon: FileText, soon: true },
      { to: "/journal", label: "قائمة الإجراءات", icon: ClipboardList, soon: true },
    ],
  },
  {
    title: "العمليات المالية", color: "from-amber-500/15 to-amber-500/5",
    items: [
      { to: "/journal", label: "القيود اليومية", icon: ScrollText },
      { to: "/cash", label: "الصندوق", icon: Wallet },
      { to: "/cash", label: "البنك", icon: Building, soon: true },
      { to: "/cash", label: "العهد المالية", icon: HandCoins, soon: true },
      { to: "/cash", label: "البنوك والصناديق", icon: Building, soon: true },
    ],
  },
  {
    title: "المستفيدين والقروض", color: "from-blue-500/15 to-blue-500/5",
    items: [
      { to: "/beneficiaries", label: "المستفيدين", icon: Users },
      { to: "/loans", label: "القروض", icon: Banknote },
      { to: "/installments", label: "الأقساط", icon: ListChecks },
      { to: "/loans", label: "المديونيات", icon: Receipt, soon: true },
      { to: "/beneficiaries", label: "بيانات المزارقة", icon: Tractor, soon: true },
    ],
  },
  {
    title: "المشاريع والأنشطة", color: "from-green-500/15 to-green-500/5",
    items: [
      { to: "/projects", label: "المشاريع والتمويل", icon: FolderKanban },
      { to: "/units", label: "المخزون", icon: Boxes, soon: true },
      { to: "/units", label: "المبيعات", icon: ShoppingCart, soon: true },
      { to: "/units", label: "المشتريات", icon: ShoppingBag, soon: true },
      { to: "/units", label: "المجاميع الإنتاجية", icon: BarChart3, soon: true },
      { to: "/units", label: "الصيدلية البيطرية", icon: Stethoscope, soon: true },
      { to: "/units", label: "الزراعة التعاقدية", icon: Sprout, soon: true },
      { to: "/units", label: "الجرد", icon: ClipboardList, soon: true },
    ],
  },
  {
    title: "السندات والفواتير", color: "from-orange-500/15 to-orange-500/5",
    items: [
      { to: "/cash", label: "سند قبض", icon: FilePlus, soon: true },
      { to: "/cash", label: "سند صرف", icon: FileMinus, soon: true },
      { to: "/cash", label: "فاتورة بيع", icon: Receipt, soon: true },
      { to: "/cash", label: "فاتورة شراء", icon: Receipt, soon: true },
      { to: "/cash", label: "أمر شراء", icon: FileText, soon: true },
      { to: "/cash", label: "أمر صرف", icon: FileX, soon: true },
      { to: "/cash", label: "الإقرارات والتعهدات", icon: ClipboardList, soon: true },
    ],
  },
  {
    title: "الإدارة والقطاعات", color: "from-purple-500/15 to-purple-500/5",
    items: [
      { to: "/memberships", label: "العضوية والأسهم", icon: Building2 },
      { to: "/units", label: "القطاعات", icon: Network, soon: true },
      { to: "/units", label: "رموز الخدمات", icon: Settings, soon: true },
      { to: "/units", label: "الإدارة التنفيذية", icon: Building2, soon: true },
      { to: "/units", label: "الوحدات", icon: Sprout },
    ],
  },
  {
    title: "الوحدات التشغيلية", color: "from-teal-500/15 to-teal-500/5",
    items: [
      { to: "/units", label: "وحدة البن", icon: Coffee, soon: true },
      { to: "/units", label: "وحدة البذور", icon: Wheat, soon: true },
      { to: "/units", label: "وحدة المشاتل", icon: TreePine, soon: true },
      { to: "/units", label: "وحدة العسل", icon: FlaskConical, soon: true },
      { to: "/units", label: "الإنتاج والمباني", icon: Warehouse, soon: true },
      { to: "/units", label: "الثروة الحيوانية", icon: Beef, soon: true },
      { to: "/units", label: "وحدة التسويق", icon: Megaphone, soon: true },
      { to: "/units", label: "الزراعة التعاقدية", icon: Handshake, soon: true },
      { to: "/units", label: "وحدة الإقراض", icon: HandCoins, soon: true },
      { to: "/units", label: "وحدة الري", icon: Droplets, soon: true },
      { to: "/units", label: "وحدة الأعلاف", icon: Bone, soon: true },
      { to: "/units", label: "التمكين الاقتصادي", icon: TrendingUp, soon: true },
    ],
  },
];

function MainHub() {
  return (
    <div className="p-6 space-y-6">
      <header className="rounded-2xl bg-gradient-to-bl from-primary to-primary/70 text-primary-foreground p-8 shadow-lg">
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div>
            <div className="text-sm opacity-80 mb-2">لوحة التحكم الرئيسية</div>
            <h1 className="text-3xl font-bold leading-tight">
              نظام إدارة جمعية حزم العدين<br />التعاونية الزراعية متعددة الأغراض
            </h1>
            <p className="mt-3 opacity-90 max-w-xl text-sm">
              نظام متكامل لإدارة العمليات المالية، المستفيدين، القروض، المشاريع والوحدات التشغيلية.
            </p>
          </div>
          <Link to="/dashboard"
                className="rounded-xl bg-accent text-accent-foreground px-5 py-3 text-sm font-semibold hover:opacity-90 transition shadow">
            عرض المؤشرات الحية ←
          </Link>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
        {GROUPS.map((g) => (
          <Card key={g.title} className={`p-5 bg-gradient-to-br ${g.color} border-border`}>
            <h2 className="font-bold text-base mb-4 pb-3 border-b border-border/50">{g.title}</h2>
            <ul className="space-y-1">
              {g.items.map((it, i) => {
                const Icon = it.icon;
                return (
                  <li key={i}>
                    <Link
                      to={it.to}
                      className="group flex items-center gap-2 px-2 py-1.5 rounded-md text-sm hover:bg-background/70 transition"
                    >
                      <Icon className="size-4 text-primary opacity-80 group-hover:opacity-100" />
                      <span className="flex-1">{it.label}</span>
                      {it.soon && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">قريباً</span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
}
