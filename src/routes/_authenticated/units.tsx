import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/CrudPage";

export const Route = createFileRoute("/_authenticated/units")({
  component: () => (
    <CrudPage
      title="الوحدات التشغيلية"
      table="units"
      orderBy="name"
      searchable={["name","manager_name"]}
      columns={[
        { key: "name", label: "اسم الوحدة", required: true },
        { key: "manager_name", label: "مسؤول الوحدة" },
        { key: "description", label: "الوصف", type: "textarea" },
      ]}
    />
  ),
});
