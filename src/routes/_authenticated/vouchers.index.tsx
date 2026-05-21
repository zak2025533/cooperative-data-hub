import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Receipt, ArrowDownCircle, ArrowUpCircle } from "lucide-react";

export const Route = createFileRoute("/_authenticated/vouchers/")({
  component: VouchersHub,
});

function VouchersHub() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Receipt className="size-6" /> السندات
        </h1>
        <p className="text-sm text-muted-foreground">إدارة سندات القبض والصرف مع ترقيم تلقائي وتتبع الحالة.</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Link to="/vouchers/receipts">
          <Card className="p-6 hover:border-primary transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-lg bg-emerald-100 text-emerald-700 grid place-items-center">
                <ArrowDownCircle className="size-6" />
              </div>
              <div>
                <div className="font-bold text-lg">سندات القبض</div>
                <div className="text-sm text-muted-foreground">المبالغ المستلمة من العملاء والمستفيدين</div>
              </div>
            </div>
          </Card>
        </Link>
        <Link to="/vouchers/payments">
          <Card className="p-6 hover:border-primary transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-lg bg-rose-100 text-rose-700 grid place-items-center">
                <ArrowUpCircle className="size-6" />
              </div>
              <div>
                <div className="font-bold text-lg">سندات الصرف</div>
                <div className="text-sm text-muted-foreground">المبالغ المدفوعة للموردين والمستحقات</div>
              </div>
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
}
