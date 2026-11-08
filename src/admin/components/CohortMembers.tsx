import { useCallback, useEffect, useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Check, Plus, RefreshCw, Search, Trash2, UserPlus, Users, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { apiDeleteRequest, apiGetRequest, apiPatchRequest } from "@/backend/functions";
import { cn } from "@/lib/utils";
import { errorText } from "../lib/errors";
import {
  type Member, type MemberRole, type MemberStatus,
  ROLE_LABEL, STATUS_LABEL, STATUS_TONE,
} from "../lib/cohortMembers";
import { ConfirmDialog } from "./ConfirmDialog";
import { EmptyState } from "./EmptyState";
import { NativeSelect } from "./Field";
import { MemberDialog } from "./MemberDialog";
import { Pill } from "./Pill";

const ROLE_FILTERS: { value: "ALL" | MemberRole; label: string }[] = [
  { value: "ALL", label: "All" },
  { value: "MENTEE", label: "Mentees" },
  { value: "MENTOR", label: "Mentors" },
];
const STATUS_FILTERS: { value: "ALL" | MemberStatus; label: string }[] = [
  { value: "ALL", label: "Any status" },
  { value: "PENDING", label: "Pending" },
  { value: "APPROVED", label: "Approved" },
  { value: "REJECTED", label: "Rejected" },
];

const fmt = (d: string) => new Date(d).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });

function Chips<T extends string>({
  options, value, onChange,
}: { options: { value: T; label: string }[]; value: T; onChange: (v: T) => void }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={cn(
            "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
            value === o.value ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function CohortMembers({
  slug,
  cohort,
  onChange,
}: {
  slug: string;
  cohort: { capacity?: number | null; seats_taken?: number };
  onChange?: () => void;
}) {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [role, setRole] = useState<"ALL" | MemberRole>("ALL");
  const [status, setStatus] = useState<"ALL" | MemberStatus>("ALL");
  const [dialog, setDialog] = useState<{ member: Member | null } | null>(null);
  const [toRemove, setToRemove] = useState<Member | null>(null);

  const load = useCallback(async () => {
    setError(null);
    const res = await apiGetRequest(`cohorts/${slug}/members/`);
    const rows = res.data?.data;
    if (Array.isArray(rows)) setMembers(rows);
    else setError(res.message || "Failed to load members");
    setLoading(false);
  }, [slug]);

  useEffect(() => {
    load();
  }, [load]);

  const changed = async () => {
    await load();
    onChange?.();
  };

  const update = useCallback(
    async (m: Member, patch: Partial<Pick<Member, "status" | "mentor">>) => {
      try {
        await apiPatchRequest(`cohorts/${slug}/members/${m.id}/`, patch);
        await load();
        onChange?.();
      } catch (err) {
        toast.error(errorText(err, "Couldn't update the member"));
      }
    },
    [slug, load, onChange]
  );

  const remove = async () => {
    if (!toRemove) return;
    const res = await apiDeleteRequest(`cohorts/${slug}/members/${toRemove.id}/`);
    if (res.success) {
      toast.success("Member removed");
      await changed();
    } else {
      toast.error(res.message || "Failed to remove the member");
    }
  };

  const approvedMentors = members.filter((m) => m.role === "MENTOR" && m.status === "APPROVED");
  const approvedMentees = members.filter((m) => m.role === "MENTEE" && m.status === "APPROVED").length;

  const columns: ColumnDef<Member>[] = useMemo(
    () => [
      {
        accessorKey: "full_name",
        header: "Person",
        cell: ({ row }) => (
          <div className="min-w-0 max-w-[12rem] sm:max-w-none">
            <p className="truncate font-medium">{row.original.full_name}</p>
            <p className="truncate text-xs text-muted-foreground">{row.original.email}</p>
          </div>
        ),
      },
      {
        accessorKey: "role",
        header: "Role",
        meta: { className: "hidden sm:table-cell" },
        cell: ({ getValue }) => (
          <Pill tone={getValue<MemberRole>() === "MENTOR" ? "blue" : "gray"}>{ROLE_LABEL[getValue<MemberRole>()]}</Pill>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => (
          <Pill tone={STATUS_TONE[getValue<MemberStatus>()]}>{STATUS_LABEL[getValue<MemberStatus>()]}</Pill>
        ),
      },
      {
        id: "mentor",
        header: "Mentor",
        enableSorting: false,
        meta: { className: "hidden md:table-cell" },
        cell: ({ row }) => {
          const m = row.original;
          if (m.role !== "MENTEE" || m.status === "REJECTED") return <span className="text-muted-foreground">—</span>;
          return (
            <div onClick={(e) => e.stopPropagation()}>
              <NativeSelect
                aria-label={`Mentor for ${m.full_name}`}
                className="h-9 w-44"
                value={m.mentor ?? ""}
                onChange={(e) => update(m, { mentor: e.target.value ? Number(e.target.value) : null })}
              >
                <option value="">Unassigned</option>
                {approvedMentors.map((mentor) => (
                  <option key={mentor.id} value={mentor.id}>{mentor.full_name}</option>
                ))}
              </NativeSelect>
            </div>
          );
        },
      },
      {
        accessorKey: "created_at",
        header: "Applied",
        meta: { className: "hidden lg:table-cell" },
        cell: ({ getValue }) => <span className="whitespace-nowrap text-sm text-muted-foreground">{fmt(getValue<string>())}</span>,
      },
      {
        id: "actions",
        header: "",
        enableSorting: false,
        cell: ({ row }) => {
          const m = row.original;
          return (
            <div className="flex justify-end gap-1" onClick={(e) => e.stopPropagation()}>
              {m.status !== "APPROVED" && (
                <Button variant="ghost" size="icon" className="h-9 w-9 text-emerald-600" title="Approve" onClick={() => update(m, { status: "APPROVED" })}>
                  <Check className="h-4 w-4" />
                  <span className="sr-only">Approve</span>
                </Button>
              )}
              {m.status !== "REJECTED" && (
                <Button variant="ghost" size="icon" className="h-9 w-9" title="Reject" onClick={() => update(m, { status: "REJECTED" })}>
                  <X className="h-4 w-4" />
                  <span className="sr-only">Reject</span>
                </Button>
              )}
              <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-destructive" title="Remove" onClick={() => setToRemove(m)}>
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Remove</span>
              </Button>
            </div>
          );
        },
      },
    ],
    [update, approvedMentors]
  );

  const filtered = members.filter((m) => (role === "ALL" || m.role === role) && (status === "ALL" || m.status === status));
  const menteeSummary = cohort.capacity == null ? `${approvedMentees} (no seat limit)` : `${approvedMentees} / ${cohort.capacity} seats`;

  return (
    <Card>
      <div className="flex flex-col gap-3 border-b p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Mentees</span> {menteeSummary} ·{" "}
            <span className="font-medium text-foreground">Mentors</span> {approvedMentors.length}
          </p>
          <Button onClick={() => setDialog({ member: null })}>
            <UserPlus className="mr-2 h-4 w-4" /> Add member
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <Chips<"ALL" | MemberRole> options={ROLE_FILTERS} value={role} onChange={setRole} />
          <Chips<"ALL" | MemberStatus> options={STATUS_FILTERS} value={status} onChange={setStatus} />
        </div>
      </div>

      {loading ? (
        <div className="space-y-3 p-4">
          {[0, 1, 2].map((i) => <div key={i} className="h-14 animate-pulse rounded-lg bg-muted" />)}
        </div>
      ) : error ? (
        <EmptyState
          icon={<RefreshCw className="h-5 w-5" />}
          title="Couldn't load members"
          text={error}
          action={<Button variant="outline" onClick={load}>Try again</Button>}
        />
      ) : (
        <DataTable
          columns={columns}
          data={filtered}
          onRowClick={(m) => setDialog({ member: m })}
          empty={
            members.length === 0 ? (
              <EmptyState
                icon={<Users className="h-5 w-5" />}
                title="No members yet"
                text="Applications will appear here once registration is open, or add someone yourself."
                action={
                  <Button onClick={() => setDialog({ member: null })}>
                    <Plus className="mr-2 h-4 w-4" /> Add member
                  </Button>
                }
              />
            ) : (
              <EmptyState icon={<Search className="h-5 w-5" />} title="No matching members" text="Try a different filter." />
            )
          }
        />
      )}

      {dialog && (
        <MemberDialog
          key={dialog.member?.id ?? "new"}
          member={dialog.member}
          slug={slug}
          onClose={() => setDialog(null)}
          onSaved={() => {
            setDialog(null);
            changed();
          }}
        />
      )}

      <ConfirmDialog
        open={!!toRemove}
        title="Remove this member?"
        description={toRemove ? `“${toRemove.full_name}” will be removed from the cohort. Their mentees, if any, become unassigned.` : undefined}
        confirmLabel="Remove"
        onConfirm={remove}
        onClose={() => setToRemove(null)}
      />
    </Card>
  );
}
