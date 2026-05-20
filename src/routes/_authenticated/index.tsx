import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import {
  LayoutDashboard, BookOpen, ScrollText, Wallet, Users, Banknote, ListChecks,
  ClipboardList, FolderKanban, Boxes, ShoppingCart, Stethoscope,
  Sprout, Receipt, FileText, FilePlus, FileMinus, Building2, Settings,
  Coffee, Wheat, TreePine, FlaskConical, Warehouse, Beef, Megaphone, Handshake,
  HandCoins, Droplets, Bone, TrendingUp, Tractor, ArrowLeftRight,
} from "lucide-react";

export const Route = createFileRoute("/_authenticated/")({ component: MainHub });

const GROUPS: { title: string; color: string; items: { to: string; label: string; icon: any; soon?: boolean }[] }[] = [
  {
    title: "النظام والتقارير", color: "from-emerald-500/15 to-emerald-500/5",
    items: [
      { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { to: "/accounts", label: "دليل الحسابات", icon: BookOpen },
      { to: "/journal", label: "كشف حساب", icon: FileText },
      { to: "/journal", label: "قائمة الإجراءات", icon: ClipboardList },
    ],
  },
  {
    title: "العمليات المالية", color: "from-amber-500/15 to-amber-500/5",
    items: [
      { to: "/journal", label: "القيود اليومية", icon: ScrollText },
      { to: "/cash", label: "الصندوق", icon: Wallet },
      { to: "/vouchers", label: "سند قبض", icon: FilePlus },
      { to: "/vouchers", label: "سند صرف", icon: FileMinus },
      { to: "/cash", label: "العهد المالية", icon: HandCoins, soon: true },
    ],
  },
  {
    title: "المستفيدين والقروض", color: "from-blue-500/15 to-blue-500/5",
    items: [
      { to: "/beneficiaries", label: "المستفيدين", icon: Users },
      { to: "/loans", label: "القروض", icon: Banknote },
      { to: "/installments", label: "الأقساط", icon: ListChecks },
      { to: "/loans", label: "المديونيات", icon: Receipt },
      { to: "/beneficiaries", label: "بيانات المزارعين", icon: Tractor },
    ],
  },
  {
    title: "المخزون والمبيعات", color: "from-green-500/15 to-green-500/5",
    items: [
      { to: "/items", label: "أصناف المخزون", icon: Boxes },
      { to: "/stock", label: "حركات المخزون", icon: ArrowLeftRight },
      { to: "/invoices", label: "فواتير البيع/الشراء", icon: ShoppingCart },
      { to: "/stocktake", label: "الجرد", icon: ClipboardList },
      { to: "/contract-farming", label: "الزراعة التعاقدية", icon: Handshake },
    ],
  },
  {
    title: "المشاريع والإدارة", color: "from-orange-500/15 to-orange-500/5",
    items: [
      { to: "/projects", label: "المشاريع والتمويل", icon: FolderKanban },
      { to: "/memberships", label: "العضوية والأسهم", icon: Building2 },
      { to: "/units", label: "الوحدات", icon: Sprout },
      { to: "/units", label: "رموز الخدمات", icon: Settings, soon: true },
      { to: "/units", label: "الإدارة التنفيذية", icon: Building2, soon: true },
    ],
  },
  {
    title: "الوحدات التشغيلية", color: "from-teal-500/15 to-teal-500/5",
    items: [
      { to: "/units", label: "وحدة البن", icon: Coffee },
      { to: "/units", label: "وحدة البذور", icon: Wheat },
      { to: "/units", label: "وحدة المشاتل", icon: TreePine },
      { to: "/units", label: "وحدة العسل", icon: FlaskConical },
      { to: "/units", label: "الإنتاج والمباني", icon: Warehouse },
      { to: "/units", label: "الثروة الحيوانية", icon: Beef },
      { to: "/units", label: "وحدة التسويق", icon: Megaphone },
      { to: "/units", label: "الزراعة التعاقدية", icon: Handshake },
      { to: "/units", label: "وحدة الإقراض", icon: HandCoins },
      { to: "/units", label: "وحدة الري", icon: Droplets },
      { to: "/units", label: "وحدة الأعلاف", icon: Bone },
      { to: "/units", label: "التمكين الاقتصادي", icon: TrendingUp },
      { to: "/units", label: "الصيدلية البيطرية", icon: Stethoscope },
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
