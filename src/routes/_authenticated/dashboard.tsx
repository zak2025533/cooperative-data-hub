import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import {
  TrendingUp, TrendingDown, Wallet, Users, Banknote, FolderKanban,
  Building2, ListChecks, AlertTriangle,
} from "lucide-react";
import { fmtMoney, fmtNumber } from "@/components/CrudPage";

export const Route = createFileRoute("/_authenticated/dashboard")({ component: DashboardPage });

function StatCard({ icon: Icon, label, value, accent }: any) {
  return (
    <Card className="p-5 relative overflow-hidden">
      <div className={`absolute -left-4 -bottom-4 size-24 rounded-full opacity-10 ${accent}`} />
      <div className="flex items-start gap-4">
        <div className={`size-11 rounded-xl grid place-items-center text-primary-foreground ${accent}`}>
          <Icon className="size-5" />
        </div>
        <div>
          <div className="text-xs text-muted-foreground">{label}</div>
          <div className="text-xl font-bold mt-1">{value}</div>
        </div>
      </div>
    </Card>
  );
}

function DashboardPage() {
  const { data: stats } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const [b, l, p, m, i, c] = await Promise.all([
        supabase.from("beneficiaries").select("id", { count: "exact", head: true }),
        supabase.from("loans").select("amount,total_paid,remaining"),
        supabase.from("projects").select("id,total_amount", { count: "exact" }),
        supabase.from("memberships").select("id,shares_count,total_value", { count: "exact" }),
        supabase.from("installments").select("id,status,amount,remaining"),
        supabase.from("cash_movements").select("amount_in,amount_out"),
      ]);
      const loans = l.data || [];
      const total_loans = loans.reduce((s, r: any) => s + Number(r.amount || 0), 0);
      const total_paid = loans.reduce((s, r: any) => s + Number(r.total_paid || 0), 0);
      const total_remaining = loans.reduce((s, r: any) => s + Number(r.remaining || 0), 0);
      const cm = c.data || [];
      const inflow = cm.reduce((s, r: any) => s + Number(r.amount_in || 0), 0);
      const outflow = cm.reduce((s, r: any) => s + Number(r.amount_out || 0), 0);
      const overdue = (i.data || []).filter((x: any) => x.status === "متأخر").length;
      return {
        beneficiaries: b.count ?? 0,
        projects: p.count ?? 0,
        members: m.count ?? 0,
        total_loans, total_paid, total_remaining,
        inflow, outflow, cash_balance: inflow - outflow,
        overdue,
        installments_count: (i.data || []).length,
      };
    },
  });

  const s = stats;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">لوحة المؤشرات</h1>
        <p className="text-sm text-muted-foreground">نظرة عامة حية على بيانات الجمعية</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        <StatCard icon={TrendingUp} label="إجمالي المقبوضات" value={fmtMoney(s?.inflow)} accent="bg-success" />
        <StatCard icon={TrendingDown} label="إجمالي المصروفات" value={fmtMoney(s?.outflow)} accent="bg-destructive" />
        <StatCard icon={Wallet} label="رصيد الصندوق" value={fmtMoney(s?.cash_balance)} accent="bg-primary" />
        <StatCard icon={Users} label="عدد المستفيدين" value={fmtNumber(s?.beneficiaries)} accent="bg-accent" />
        <StatCard icon={Banknote} label="إجمالي القروض" value={fmtMoney(s?.total_loans)} accent="bg-primary" />
        <StatCard icon={TrendingUp} label="المدفوع من القروض" value={fmtMoney(s?.total_paid)} accent="bg-success" />
        <StatCard icon={TrendingDown} label="المتبقي من القروض" value={fmtMoney(s?.total_remaining)} accent="bg-warning" />
        <StatCard icon={AlertTriangle} label="أقساط متأخرة" value={fmtNumber(s?.overdue)} accent="bg-destructive" />
        <StatCard icon={FolderKanban} label="عدد المشاريع" value={fmtNumber(s?.projects)} accent="bg-accent" />
        <StatCard icon={Building2} label="عدد الأعضاء" value={fmtNumber(s?.members)} accent="bg-primary" />
        <StatCard icon={ListChecks} label="إجمالي الأقساط" value={fmtNumber(s?.installments_count)} accent="bg-accent" />
      </div>
    </div>
  );
}
