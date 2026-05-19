import { createFileRoute } from "@tanstack/react-router";
import { CrudPage } from "@/components/CrudPage";

const AREAS = ["حقين","بني وائل","حليمة","بني الفخر","بني سليمان","المزارقة","الأجعوم","سيدم","الشعاور","يريس","الأصيور","الأبعون","الإسلوم","الأحكوم","المجاهدة","جبل حريم","بني أسعد","المعيضة","الشرقي"];
const VALUE_CHAINS = ["البن","العسل","الذرة الشامية","الثروة الحيوانية","الألبان","الجلود والأصواف","الحراجيات والأخشاب","الأعلاف"];

export const Route = createFileRoute("/_authenticated/beneficiaries")({
  component: () => (
    <CrudPage
      title="المستفيدين"
      table="beneficiaries"
      orderBy="created_at"
      searchable={["name","code","phone","village","national_id"]}
      columns={[
        { key: "code", label: "الرقم" },
        { key: "name", label: "الاسم", required: true },
        { key: "area", label: "العزلة", type: "select", options: AREAS },
        { key: "village", label: "القرية" },
        { key: "phone", label: "الهاتف" },
        { key: "activity_type", label: "نوع النشاط" },
        { key: "value_chain", label: "السلسلة", type: "select", options: VALUE_CHAINS },
        { key: "national_id", label: "رقم البطاقة", hideInTable: true },
        { key: "guarantor1_name", label: "اسم الضامن 1", hideInTable: true },
        { key: "guarantor1_phone", label: "هاتف الضامن 1", hideInTable: true },
        { key: "guarantor2_name", label: "اسم الضامن 2", hideInTable: true },
        { key: "guarantor2_phone", label: "هاتف الضامن 2", hideInTable: true },
        { key: "notes", label: "ملاحظات", type: "textarea", hideInTable: true },
      ]}
    />
  ),
});
