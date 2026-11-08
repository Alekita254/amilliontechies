import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CohortForm } from "@/admin/components/CohortForm";
import { CohortMembers } from "@/admin/components/CohortMembers";
import { PageHeader } from "@/admin/components/PageHeader";
import { Pill } from "@/admin/components/Pill";
import { apiGetRequest } from "@/backend/functions";
import { cn } from "@/lib/utils";

type Tab = "details" | "members";

export function CohortDetailEdit() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [cohort, setCohort] = useState<any>(null);
  const [tab, setTab] = useState<Tab>("details");

  const load = useCallback(async () => {
    const res = await apiGetRequest(`cohorts/${slug}/`);
    const item = res.data?.data;
    if (item?.slug) setCohort(item);
    setLoading(false);
  }, [slug]);

  useEffect(() => {
    load();
  }, [load]);

  const back = (
    <Link to="/admin/cohorts" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
      <ArrowLeft className="h-4 w-4" /> Back to cohorts
    </Link>
  );

  if (loading) {
    return <div className="mx-auto h-96 max-w-3xl animate-pulse rounded-xl bg-muted" />;
  }

  if (!cohort) {
    return (
      <Card className="mx-auto mt-10 max-w-md space-y-3 p-8 text-center">
        <p className="font-semibold">Cohort not found</p>
        <p className="text-sm text-muted-foreground">It may have been deleted, or you may not have access.</p>
        <Button variant="outline" onClick={() => navigate("/admin/cohorts")}>Back to cohorts</Button>
      </Card>
    );
  }

  const tabs: { id: Tab; label: string; badge?: number }[] = [
    { id: "details", label: "Details" },
    { id: "members", label: "Members", badge: cohort.pending_count },
  ];

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {back}
      <PageHeader title={cohort.title} description="Edit this cohort and manage who is in it." />

      <div className="inline-flex rounded-lg bg-muted p-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "flex items-center gap-2 rounded-md px-4 py-1.5 text-sm font-medium transition-colors",
              tab === t.id ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {t.label}
            {!!t.badge && <Pill tone="amber">{t.badge}</Pill>}
          </button>
        ))}
      </div>

      {tab === "details" ? (
        <Card>
          <CardContent className="p-6">
            <CohortForm
              cohort={cohort}
              onCancel={() => navigate("/admin/cohorts")}
              onSuccess={() => navigate("/admin/cohorts")}
            />
          </CardContent>
        </Card>
      ) : (
        <CohortMembers slug={cohort.slug} cohort={cohort} onChange={load} />
      )}
    </div>
  );
}
