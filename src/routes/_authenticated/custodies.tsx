import { createFileRoute } from "@tanstack/react-router";
import { CrudPage, fmtMoney } from "@/components/CrudPage";
import { UNIT_OPTIONS } from "@/lib/options";
import { Badge } from "@/components/ui/badge";

const STATUS = ["نشطة", "مسددة جزئياً", "مسددة", "ملغاة"];

export const Route = createFileRoute("/_authenticated/custodies")({
  component: () => (
    <CrudPage
      title="العهد المالية"
      table="custodies"
      orderBy="custody_date"
      searchable={["custody_no", "holder_name", "purpose"]}
      defaults={{ status: "نشطة", custody_date: new Date().toISOString().slice(0, 10) }}
      columns={[
        { key: "custody_no", label: "رقم العهدة" },
        { key: "custody_date", label: "التاريخ", type: "date", required: true },
        { key: "holder_name", label: "اسم المستلم", required: true },
        { key: "amount", label: "المبلغ", type: "number", required: true, format: fmtMoney },
        { key: "settled_amount", label: "المسدد", type: "number", format: fmtMoney },
        { key: "remaining", label: "المتبقي", type: "number", format: fmtMoney },
        { key: "unit_name", label: "الوحدة التشغيلية", type: "select", options: UNIT_OPTIONS },
        { key: "purpose", label: "الغرض", type: "textarea", hideInTable: true },
        { key: "status", label: "الحالة", type: "select", options: STATUS,
          format: (v) => <Badge variant={v === "مسددة" ? "default" : v === "ملغاة" ? "destructive" : "secondary"}>{v}</Badge> },
        { key: "notes", label: "ملاحظات", type: "textarea", hideInTable: true },
      ]}
      onBeforeSave={(row) => {
        const amount = Number(row.amount || 0);
        const settled = Number(row.settled_amount || 0);
        return { ...row, remaining: Math.max(0, amount - settled) };
      }}
    />
  ),
});
