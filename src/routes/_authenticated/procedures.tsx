import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/CrudPage";
import { Badge } from "@/components/ui/badge";

const TYPES = ["اعتماد", "طلب صرف", "تحويل", "موافقة", "تقرير", "أخرى"];
const PRIORITIES = ["عاجلة", "عالية", "عادية", "منخفضة"];
const STATUS = ["جديد", "قيد التنفيذ", "منجز", "ملغي"];

export const Route = createFileRoute("/_authenticated/procedures")({
  component: () => (
    <CrudPage
      title="قائمة الإجراءات"
      table="procedures"
      orderBy="procedure_date"
      searchable={["procedure_no", "title", "requester", "assignee"]}
      defaults={{ status: "جديد", priority: "عادية", procedure_date: new Date().toISOString().slice(0, 10) }}
      columns={[
        { key: "procedure_no", label: "رقم الإجراء" },
        { key: "procedure_date", label: "تاريخ الإجراء", type: "date", required: true },
        { key: "title", label: "عنوان الإجراء", required: true },
        { key: "procedure_type", label: "النوع", type: "select", options: TYPES },
        { key: "requester", label: "مقدم الطلب" },
        { key: "assignee", label: "المسؤول" },
        { key: "priority", label: "الأولوية", type: "select", options: PRIORITIES,
          format: (v) => <Badge variant={v === "عاجلة" ? "destructive" : v === "عالية" ? "default" : "secondary"}>{v}</Badge> },
        { key: "due_date", label: "تاريخ الاستحقاق", type: "date" },
        { key: "status", label: "الحالة", type: "select", options: STATUS,
          format: (v) => <Badge variant={v === "منجز" ? "default" : v === "ملغي" ? "destructive" : "secondary"}>{v}</Badge> },
        { key: "description", label: "الوصف", type: "textarea", hideInTable: true },
        { key: "notes", label: "ملاحظات", type: "textarea", hideInTable: true },
      ]}
    />
  ),
});
