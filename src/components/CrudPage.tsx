import { ReactNode, useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { toast } from "sonner";

export type Column = {
  key: string;
  label: string;
  type?: "text" | "number" | "date" | "textarea" | "select";
  options?: string[];
  format?: (v: any, row: any) => ReactNode;
  required?: boolean;
  hideInTable?: boolean;
  hideInForm?: boolean;
  readOnly?: boolean;
  placeholder?: string;
};

type Props = {
  title: string;
  table: string;
  columns: Column[];
  defaults?: Record<string, any>;
  orderBy?: string;
  searchable?: string[];
  onBeforeSave?: (row: any) => any | Promise<any>;
  customActions?: (row: any) => ReactNode;
  filter?: { column: string; value: any };
  headerExtra?: ReactNode;
};

export function CrudPage({
  title, table, columns, defaults = {}, orderBy = "created_at", searchable = [],
  onBeforeSave, customActions, filter, headerExtra,
}: Props) {
  const qc = useQueryClient();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);

  const { data = [], isLoading } = useQuery({
    queryKey: [table, filter?.column, filter?.value],
    queryFn: async () => {
      let q = supabase.from(table as any).select("*").order(orderBy, { ascending: false }).limit(1000);
      if (filter) q = q.eq(filter.column, filter.value);
      const { data, error } = await q;
      if (error) throw error;
      return data as any[];
    },
  });

  const filtered = useMemo(() => {
    if (!search) return data;
    const q = search.toLowerCase();
    return data.filter((r: any) =>
      searchable.some((k: string) => String(r[k] ?? "").toLowerCase().includes(q))
    );
  }, [data, search, searchable]);

  const save = useMutation({
    mutationFn: async (row: any) => {
      const payload = onBeforeSave ? await onBeforeSave(row) : row;
      const cleaned: any = {};
      for (const c of columns) {
        let v = payload[c.key];
        if (v === "" || v === undefined) v = null;
        if (c.type === "number" && v != null) v = Number(v);
        cleaned[c.key] = v;
      }
      if (row.id) {
        const { error } = await supabase.from(table as any).update(cleaned).eq("id", row.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from(table as any).insert(cleaned);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [table] });
      setOpen(false);
      setEditing(null);
      toast.success("تم الحفظ");
    },
    onError: (e: any) => toast.error(e.message || "خطأ في الحفظ"),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from(table as any).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [table] });
      toast.success("تم الحذف");
    },
    onError: (e: any) => toast.error(e.message || "خطأ في الحذف"),
  });

  function onNew() { setEditing({ ...defaults }); setOpen(true); }
  function onEdit(row: any) { setEditing({ ...row }); setOpen(true); }

  const tableCols = columns.filter((c: Column) => !c.hideInTable);
  const formCols = columns.filter((c: Column) => !c.hideInForm);

  return (
    <div className="p-4 sm:p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">{title}</h1>
          <p className="text-xs sm:text-sm text-muted-foreground">إجمالي السجلات: {data.length}</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          {searchable.length > 0 && (
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input value={search} onChange={(e) => setSearch(e.target.value)}
                     placeholder="بحث..." className="pr-9 w-full sm:w-64" />
            </div>
          )}
          {headerExtra}
          <Button onClick={onNew} className="w-full sm:w-auto"><Plus className="size-4" /> إضافة جديد</Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-xs sm:text-sm">
            <thead className="bg-muted/60">
              <tr>
                {tableCols.map((c: Column) => (
                  <th key={c.key} className="text-right p-3 font-semibold whitespace-nowrap">{c.label}</th>
                ))}
                <th className="p-3 w-20 sm:w-32"></th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr><td colSpan={tableCols.length + 1} className="p-8 text-center text-muted-foreground">جارٍ التحميل...</td></tr>
              )}
              {!isLoading && filtered.length === 0 && (
                <tr><td colSpan={tableCols.length + 1} className="p-8 text-center text-muted-foreground">لا توجد بيانات</td></tr>
              )}
              {filtered.map((row: any) => (
                <tr key={row.id} className="border-t hover:bg-muted/30">
                  {tableCols.map((c: Column) => (
                    <td key={c.key} className="p-3 whitespace-nowrap">
                      {c.format ? c.format(row[c.key], row) : (row[c.key] ?? "—")}
                    </td>
                  ))}
                  <td className="p-3">
                    <div className="flex items-center gap-1 justify-end">
                      {customActions?.(row)}
                      <Button variant="ghost" size="icon" className="size-8" onClick={() => onEdit(row)}><Pencil className="size-4" /></Button>
                      <Button variant="ghost" size="icon" className="size-8" onClick={() => {
                        if (confirm("تأكيد حذف هذا السجل؟")) remove.mutate(row.id);
                      }}><Trash2 className="size-4 text-destructive" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) setEditing(null); }}>
        <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto p-4 sm:p-6" dir="rtl">
          <DialogHeader>
            <DialogTitle>{editing?.id ? "تعديل سجل" : "إضافة سجل جديد"}</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => { e.preventDefault(); save.mutate(editing); }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2"
          >
            {formCols.map((c: Column) => (
              <div key={c.key} className={c.type === "textarea" ? "sm:col-span-2" : ""}>
                <label className="text-sm font-medium block mb-1">
                  {c.label}{c.required && <span className="text-destructive"> *</span>}
                </label>
                {c.type === "textarea" ? (
                  <textarea
                    className="w-full rounded-md border border-input bg-background p-2 text-sm min-h-20"
                    value={editing?.[c.key] ?? ""}
                    onChange={(e) => setEditing({ ...editing, [c.key]: e.target.value })}
                  />
                ) : c.type === "select" ? (
                  <select
                    className="w-full rounded-md border border-input bg-background p-2 text-sm"
                    value={editing?.[c.key] ?? ""}
                    required={c.required}
                    onChange={(e) => setEditing({ ...editing, [c.key]: e.target.value })}
                  >
                    <option value="">— اختر —</option>
                    {(c.options || []).map((o: string) => <option key={o} value={o}>{o}</option>)}
                  </select>
                ) : (
                  <Input
                    type={c.type === "number" ? "number" : c.type === "date" ? "date" : "text"}
                    step={c.type === "number" ? "any" : undefined}
                    required={c.required}
                    readOnly={c.readOnly}
                    placeholder={c.placeholder}
                    value={editing?.[c.key] ?? ""}
                    onChange={(e) => setEditing({ ...editing, [c.key]: e.target.value })}
                  />
                )}
              </div>
            ))}
            <DialogFooter className="sm:col-span-2 flex flex-col-reverse sm:flex-row gap-2 mt-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)} className="w-full sm:w-auto">إلغاء</Button>
              <Button type="submit" disabled={save.isPending} className="w-full sm:w-auto">{save.isPending ? "..." : "حفظ"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function fmtNumber(n: any) {
  if (n == null || n === "") return "—";
  return Number(n).toLocaleString("ar-EG", { maximumFractionDigits: 2 });
}
export function fmtMoney(n: any) {
  if (n == null || n === "") return "—";
  return Number(n).toLocaleString("ar-EG", { maximumFractionDigits: 2 }) + " ر.ي";
}
