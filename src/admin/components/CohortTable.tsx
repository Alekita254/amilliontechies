import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ColumnDef } from "@tanstack/react-table";
import { Briefcase, Pencil, Plus, RefreshCw, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { apiDeleteRequest, apiGetRequest } from "@/backend/functions";
import { cn } from "@/lib/utils";
import { ConfirmDialog } from "./ConfirmDialog";
import { EmptyState } from "./EmptyState";
import { Pill } from "./Pill";

type Status = "UPCOMING" | "ACTIVE" | "COMPLETED";

type Cohort = {
  id: number;
  title: string;
  slug: string;
  status: Status;
  program_type?: string;
  learner_count?: number;
  mentor_count?: number;
  start_date?: string | null;
  end_date?: string | null;
  published?: boolean;
  pending_count?: number;
};

const STATUS: Record<Status, { label: string; tone: "blue" | "green" | "gray" }> = {
  UPCOMING: { label: "Upcoming", tone: "blue" },
  ACTIVE: { label: "Active", tone: "green" },
  COMPLETED: { label: "Completed", tone: "gray" },
};

const FILTERS: { value: "ALL" | Status; label: string }[] = [
  { value: "ALL", label: "All" },
  { value: "ACTIVE", label: "Active" },
  { value: "UPCOMING", label: "Upcoming" },
  { value: "COMPLETED", label: "Completed" },
];

const fmt = (d?: string | null) =>
  d ? new Date(d).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" }) : "";

export function CohortTable({
  refreshKey = 0,
  onCreate,
}: {
  refreshKey?: number;
  onCreate?: () => void;
}) {
  const [cohorts, setCohorts] = useState<Cohort[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"ALL" | Status>("ALL");
  const [toDelete, setToDelete] = useState<Cohort | null>(null);
  const navigate = useNavigate();

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const res = await apiGetRequest("cohorts/");
    const rows = res.data?.data;
    if (Array.isArray(rows)) setCohorts(rows);
    else setError(res.message || "Failed to load cohorts");
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load, refreshKey]);

  const remove = async () => {
    if (!toDelete) return;
    const res = await apiDeleteRequest(`cohorts/${toDelete.slug}/`);
    if (res?.success) {
      toast.success("Cohort deleted");
      setCohorts((prev) => prev.filter((c) => c.slug !== toDelete.slug));
    } else {
      toast.error(res?.message || "Failed to delete cohort");
    }
  };

  const columns: ColumnDef<Cohort>[] = useMemo(
    () => [
      {
        accessorKey: "title",
        header: "Cohort",
        cell: ({ row }) => (
          <div className="min-w-0 max-w-[9.5rem] sm:max-w-none">
            <p className="truncate font-medium">{row.original.title}</p>
            <p className="truncate text-xs text-muted-foreground">
              {row.original.program_type || "No program set"}
            </p>
            {!!row.original.pending_count && (
              <Pill tone="amber" className="mt-1">{row.original.pending_count} pending</Pill>
            )}
          </div>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => {
          const s = STATUS[getValue<Status>()];
          return <Pill tone={s.tone}>{s.label}</Pill>;
        },
      },
      {
        id: "dates",
        header: "Dates",
        meta: { className: "hidden lg:table-cell" },
        enableSorting: false,
        cell: ({ row }) => {
          const { start_date: s, end_date: e } = row.original;
          return (
            <span className="whitespace-nowrap text-sm text-muted-foreground">
              {s || e ? `${fmt(s) || "—"} → ${fmt(e) || "—"}` : "Not scheduled"}
            </span>
          );
        },
      },
      {
        id: "people",
        header: "Learners / Mentors",
        meta: { className: "hidden md:table-cell" },
        enableSorting: false,
        cell: ({ row }) => (
          <span className="text-sm">
            {row.original.learner_count ?? 0} <span className="text-muted-foreground">/</span>{" "}
            {row.original.mentor_count ?? 0}
          </span>
        ),
      },
      {
        accessorKey: "published",
        header: "Visibility",
        meta: { className: "hidden sm:table-cell" },
        cell: ({ getValue }) =>
          getValue<boolean>() ? <Pill tone="green">Published</Pill> : <Pill tone="amber">Draft</Pill>,
      },
      {
        id: "actions",
        header: "",
        enableSorting: false,
        cell: ({ row }) => (
          <div className="flex justify-end gap-1" onClick={(e) => e.stopPropagation()}>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              title="Edit"
              onClick={() => navigate(`/admin/cohorts/${row.original.slug}/edit`)}
            >
              <Pencil className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              title="Delete"
              className="h-9 w-9 text-muted-foreground hover:text-destructive"
              onClick={() => setToDelete(row.original)}
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        ),
      },
    ],
    [navigate]
  );

  const q = search.trim().toLowerCase();
  const filtered = cohorts.filter(
    (c) =>
      (status === "ALL" || c.status === status) &&
      (!q || c.title?.toLowerCase().includes(q) || c.program_type?.toLowerCase().includes(q))
  );

  return (
    <Card>
      <div className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-1.5">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setStatus(f.value)}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                status === f.value
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="relative sm:w-64">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search cohorts…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {loading ? (
        <div className="space-y-3 p-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-14 animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      ) : error ? (
        <EmptyState
          icon={<RefreshCw className="h-5 w-5" />}
          title="Couldn't load cohorts"
          text={error}
          action={<Button variant="outline" onClick={load}>Try again</Button>}
        />
      ) : (
        <DataTable
          columns={columns}
          data={filtered}
          onRowClick={(c) => navigate(`/admin/cohorts/${c.slug}/edit`)}
          empty={
            cohorts.length === 0 ? (
              <EmptyState
                icon={<Briefcase className="h-5 w-5" />}
                title="No cohorts yet"
                text="Create your first cohort to get started."
                action={
                  onCreate && (
                    <Button onClick={onCreate}>
                      <Plus className="mr-2 h-4 w-4" /> New cohort
                    </Button>
                  )
                }
              />
            ) : (
              <EmptyState
                icon={<Search className="h-5 w-5" />}
                title="No matching cohorts"
                text="Try a different search or filter."
              />
            )
          }
        />
      )}

      <ConfirmDialog
        open={!!toDelete}
        title="Delete this cohort?"
        description={toDelete ? `“${toDelete.title}” will be permanently removed.` : undefined}
        onConfirm={remove}
        onClose={() => setToDelete(null)}
      />
    </Card>
  );
}
