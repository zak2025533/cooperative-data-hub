import { createFileRoute } from "@tanstack/react-router";
import { CrudPage, fmtMoney } from "@/components/CrudPage";

const AREAS = ["حقين","بني وائل","حليمة","بني الفخر","بني سليمان","المزارقة","الأجعوم","سيدم","الشعاور","يريس","الأصيور","الأبعون","الإسلوم","الأحكوم","المجاهدة","جبل حريم","بني أسعد","المعيضة","الشرقي"];

export const Route = createFileRoute("/_authenticated/cash")({
  component: () => (
    <CrudPage
      title="حركات الصندوق"
      table="cash_movements"
      orderBy="movement_date"
      searchable={["voucher_no","description","operation_type"]}
      columns={[
        { key: "movement_date", label: "التاريخ", type: "date", required: true },
        { key: "voucher_no", label: "رقم السند" },
        { key: "operation_type", label: "نوع العملية", type: "select",
          options: ["قبض","صرف","قيد تسوية","إيداع بنكي","سحب بنكي"] },
        { key: "description", label: "البيان", type: "textarea" },
        { key: "amount_in", label: "الوارد", type: "number", format: fmtMoney },
        { key: "amount_out", label: "المنصرف", type: "number", format: fmtMoney },
        { key: "counter_account", label: "الحساب المقابل", hideInTable: true },
        { key: "area", label: "العزلة", type: "select", options: AREAS, hideInTable: true },
        { key: "notes", label: "ملاحظات", type: "textarea", hideInTable: true },
      ]}
    />
  ),
});
