import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { apiDeleteRequest, apiGetRequest } from "@/backend/functions";
import { toast } from "sonner";

type Cohort = {
  id: number;
  title: string;
  slug: string;
  status: "UPCOMING" | "ACTIVE" | "COMPLETED";
  program_type?: string;
  learner_count?: number;
  mentor_count?: number;
  start_date?: string;
  end_date?: string;
  published?: boolean;
};

export function CohortTable({ refreshKey = 0 }: { refreshKey?: number }) {
  const [cohorts, setCohorts] = useState<Cohort[]>([]);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  const fetchCohorts = async () => {
    const candidates = ["cohorts/", "public/cohorts/"];

    for (const endpoint of candidates) {
      const res = await apiGetRequest(endpoint);
      const payload = res?.data;
      const rows = Array.isArray(payload?.results)
        ? payload.results
        : Array.isArray(payload?.data)
          ? payload.data
          : Array.isArray(payload)
            ? payload
            : null;

      if (rows) {
        setCohorts(rows);
        return;
      }
    }

    toast.error("Failed to load cohorts");
  };

  useEffect(() => {
    fetchCohorts();
  }, [refreshKey]);

  const handleDelete = async (slug: string) => {
    if (!confirm("Delete this cohort?")) return;

    const response = await apiDeleteRequest(`cohorts/${slug}/`);
    if (response?.success) {
      toast.success("Cohort deleted");
      setCohorts((prev) => prev.filter((item) => item.slug !== slug));
    } else {
      toast.error(response?.message || "Failed to delete cohort");
    }
  };

  const columns: ColumnDef<Cohort>[] = [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "program_type",
      header: "Program",
      cell: ({ getValue }) => <span>{getValue<string>() || "-"}</span>,
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      id: "counts",
      header: "Learners / Mentors",
      cell: ({ row }) => (
        <span>
          {row.original.learner_count ?? "-"} / {row.original.mentor_count ?? "-"}
        </span>
      ),
    },
    {
      accessorKey: "published",
      header: "Published",
      cell: ({ getValue }) => (getValue<boolean>() ? "Yes" : "No"),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/admin/cohorts/${row.original.slug}/edit`)}
          >
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => handleDelete(row.original.slug)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const filtered = cohorts.filter((cohort) => {
    const q = filter.toLowerCase();
    return (
      cohort.title?.toLowerCase().includes(q) ||
      cohort.program_type?.toLowerCase().includes(q) ||
      cohort.status?.toLowerCase().includes(q)
    );
  });

  return (
    <Card className="mt-6">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <CardTitle>Cohorts</CardTitle>
          <Input
            placeholder="Search cohorts..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="max-w-sm"
          />
        </div>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={filtered} />
      </CardContent>
    </Card>
  );
}
