import { createFileRoute } from "@tanstack/react-router";
import { CrudPage, fmtMoney } from "@/components/CrudPage";

const AREAS = ["حقين","بني وائل","حليمة","بني الفخر","بني سليمان","المزارقة","الأجعوم","سيدم","الشعاور","يريس","الأصيور","الأبعون","الإسلوم","الأحكوم","المجاهدة","جبل حريم","بني أسعد","المعيضة","الشرقي"];

export const Route = createFileRoute("/_authenticated/memberships")({
  component: () => (
    <CrudPage
      title="العضوية والأسهم"
      table="memberships"
      orderBy="created_at"
      searchable={["member_no","member_name","phone"]}
      columns={[
        { key: "member_no", label: "رقم العضو" },
        { key: "member_name", label: "اسم العضو", required: true },
        { key: "area", label: "العزلة", type: "select", options: AREAS },
        { key: "join_date", label: "تاريخ الانضمام", type: "date" },
        { key: "shares_count", label: "عدد الأسهم", type: "number" },
        { key: "share_value", label: "قيمة السهم", type: "number", format: fmtMoney },
        { key: "total_value", label: "إجمالي القيمة", type: "number", format: fmtMoney },
        { key: "phone", label: "الهاتف" },
        { key: "status", label: "الحالة", type: "select", options: ["نشط","منسحب","موقوف"] },
        { key: "notes", label: "ملاحظات", type: "textarea", hideInTable: true },
      ]}
      onBeforeSave={(row) => {
        const sc = Number(row.shares_count || 0);
        const sv = Number(row.share_value || 0);
        return { ...row, total_value: sc * sv };
      }}
    />
  ),
});
