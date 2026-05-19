import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/CrudPage";

export const Route = createFileRoute("/_authenticated/accounts")({
  component: () => (
    <CrudPage
      title="دليل الحسابات"
      table="accounts"
      orderBy="account_no"
      searchable={["account_no","name"]}
      columns={[
        { key: "account_no", label: "رقم الحساب", required: true },
        { key: "name", label: "اسم الحساب", required: true },
        { key: "account_type", label: "نوع الحساب", type: "select", required: true,
          options: ["أصول","خصوم","حقوق ملكية","إيرادات","مصروفات"] },
        { key: "nature", label: "طبيعة الحساب", type: "select", required: true, options: ["مدين","دائن"] },
        { key: "level", label: "المستوى", type: "number" },
        { key: "parent_no", label: "الحساب الأب" },
        { key: "notes", label: "ملاحظات", type: "textarea", hideInTable: true },
      ]}
    />
  ),
});
