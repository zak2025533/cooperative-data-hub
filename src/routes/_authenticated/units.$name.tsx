import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { fmtNumber, fmtMoney } from "@/components/CrudPage";
import { Boxes, ArrowLeftRight, FileText, HandCoins, Receipt } from "lucide-react";

export const Route = createFileRoute("/_authenticated/units/$name")({
  component: UnitDashboard,
});

function UnitDashboard() {
  const { name } = Route.useParams();
  const unit = decodeURIComponent(name);

  const { data, isLoading } = useQuery({
    queryKey: ["unit-dashboard", unit],
    queryFn: async () => {
      const [items, stock, invoices, custodies] = await Promise.all([
        supabase.from("items").select("*").eq("unit_name", unit).limit(1000),
        supabase.from("stock_movements").select("*").eq("unit_name", unit).order("movement_date", { ascending: false }).limit(20),
        supabase.from("invoices").select("*").eq("unit_name", unit).order("invoice_date", { ascending: false }).limit(20),
        supabase.from("custodies").select("*").eq("unit_name", unit).order("custody_date", { ascending: false }).limit(20),
      ]);
      return {
        items: items.data || [],
        stock: stock.data || [],
        invoices: invoices.data || [],
        custodies: custodies.data || [],
      };
    },
  });

  if (isLoading) return <div className="p-6 text-muted-foreground">جارٍ التحميل...</div>;
  const totalStockValue = (data?.items || []).reduce((s: number, i: any) => s + Number(i.current_qty || 0) * Number(i.cost_price || 0), 0);
  const totalSales = (data?.invoices || []).filter((i: any) => i.invoice_type === "بيع").reduce((s: number, i: any) => s + Number(i.net_amount || 0), 0);
  const totalCustodies = (data?.custodies || []).reduce((s: number, c: any) => s + Number(c.remaining || 0), 0);

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <header className="rounded-2xl bg-gradient-to-bl from-primary to-primary/70 text-primary-foreground p-5 sm:p-7 shadow-lg">
        <div className="text-xs opacity-80 mb-1">الوحدة التشغيلية</div>
        <h1 className="text-xl sm:text-3xl font-bold">{unit}</h1>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon={Boxes} label="عدد الأصناف" value={fmtNumber(data?.items.length || 0)} to="/items" />
        <StatCard icon={ArrowLeftRight} label="قيمة المخزون" value={fmtMoney(totalStockValue)} to="/stock" />
        <StatCard icon={FileText} label="إجمالي المبيعات" value={fmtMoney(totalSales)} to="/invoices" />
        <StatCard icon={HandCoins} label="عهد قائمة" value={fmtMoney(totalCustodies)} to="/custodies" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ListCard title="آخر حركات المخزون" icon={ArrowLeftRight} rows={data?.stock || []} render={(r) => (
          <div className="flex justify-between text-xs sm:text-sm py-1 border-b last:border-0">
            <span>{r.item_name} — <span className="text-muted-foreground">{r.movement_type}</span></span>
            <span className="text-muted-foreground">{r.movement_date}</span>
          </div>
        )} />
        <ListCard title="آخر الفواتير" icon={Receipt} rows={data?.invoices || []} render={(r) => (
          <div className="flex justify-between text-xs sm:text-sm py-1 border-b last:border-0">
            <span>{r.invoice_no || "—"} — {r.party_name || "—"}</span>
            <span>{fmtMoney(r.net_amount)}</span>
          </div>
        )} />
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, to }: any) {
  return (
    <Link to={to}>
      <Card className="p-4 hover:shadow-md transition">
        <Icon className="size-5 text-primary mb-2" />
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="text-base sm:text-lg font-bold">{value}</div>
      </Card>
    </Link>
  );
}

function ListCard({ title, icon: Icon, rows, render }: any) {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b">
        <Icon className="size-4 text-primary" />
        <h3 className="font-semibold text-sm">{title}</h3>
      </div>
      {rows.length === 0 ? (
        <div className="text-xs text-muted-foreground py-4 text-center">لا توجد بيانات</div>
      ) : rows.slice(0, 8).map((r: any, i: number) => <div key={i}>{render(r)}</div>)}
    </Card>
  );
}
