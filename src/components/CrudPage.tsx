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
};

type Props = {
  title: string;
  table: string;
  columns: Column[];
  defaults?: Record<string, any>;
  orderBy?: string;
  searchable?: string[];
  onBeforeSave?: (row: any) => any;
};

export function CrudPage({
  title, table, columns, defaults = {}, orderBy = "created_at", searchable = [],
  onBeforeSave,
}: Props) {
  const qc = useQueryClient();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);

  const { data = [], isLoading } = useQuery({
    queryKey: [table],
    queryFn: async () => {
      const { data, error } = await supabase.from(table as any).select("*").order(orderBy, { ascending: false }).limit(1000);
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
      const payload = onBeforeSave ? onBeforeSave(row) : row;
      // strip empty strings on number/date fields
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
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-sm text-muted-foreground">إجمالي السجلات: {data.length}</p>
        </div>
        <div className="flex items-center gap-2">
          {searchable.length > 0 && (
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input value={search} onChange={(e) => setSearch(e.target.value)}
                     placeholder="بحث..." className="pr-9 w-64" />
            </div>
          )}
          <Button onClick={onNew}><Plus className="size-4" /> إضافة جديد</Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/60">
              <tr>
                {tableCols.map((c: Column) => (
                  <th key={c.key} className="text-right p-3 font-semibold whitespace-nowrap">{c.label}</th>
                ))}
                <th className="p-3 w-32"></th>
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
                      <Button variant="ghost" size="icon" onClick={() => onEdit(row)}><Pencil className="size-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => {
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
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" dir="rtl">
          <DialogHeader>
            <DialogTitle>{editing?.id ? "تعديل سجل" : "إضافة سجل جديد"}</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => { e.preventDefault(); save.mutate(editing); }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2"
          >
            {formCols.map((c: Column) => (
              <div key={c.key} className={c.type === "textarea" ? "md:col-span-2" : ""}>
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
                    value={editing?.[c.key] ?? ""}
                    onChange={(e) => setEditing({ ...editing, [c.key]: e.target.value })}
                  />
                )}
              </div>
            ))}
            <DialogFooter className="md:col-span-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>إلغاء</Button>
              <Button type="submit" disabled={save.isPending}>{save.isPending ? "..." : "حفظ"}</Button>
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
