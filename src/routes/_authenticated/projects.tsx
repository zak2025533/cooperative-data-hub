import { createFileRoute } from "@tanstack/react-router";
import { CrudPage, fmtMoney } from "@/components/CrudPage";

export const Route = createFileRoute("/_authenticated/projects")({
  component: () => (
    <CrudPage
      title="المشاريع والتمويل"
      table="projects"
      orderBy="created_at"
      searchable={["code","name","funder"]}
      columns={[
        { key: "code", label: "رقم المشروع" },
        { key: "name", label: "اسم المشروع", required: true },
        { key: "funder", label: "الجهة الممولة" },
        { key: "funding_type", label: "نوع التمويل", type: "select",
          options: ["دعم","قرض أبيض","قرض مسترد","تمويل دوار","مساهمة مجتمعية"] },
        { key: "start_date", label: "تاريخ البداية", type: "date" },
        { key: "end_date", label: "تاريخ النهاية", type: "date" },
        { key: "total_amount", label: "قيمة التمويل", type: "number", format: fmtMoney },
        { key: "status", label: "الحالة", type: "select", options: ["نشط","مكتمل","موقوف"] },
        { key: "notes", label: "ملاحظات", type: "textarea", hideInTable: true },
      ]}
    />
  ),
});
