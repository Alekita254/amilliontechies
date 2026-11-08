import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CohortForm } from "@/admin/components/CohortForm";
import { PageHeader } from "@/admin/components/PageHeader";
import { apiGetRequest } from "@/backend/functions";

export function CohortDetailEdit() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [cohort, setCohort] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const res = await apiGetRequest(`cohorts/${slug}/`);
      const item = res.data?.data;
      if (item?.slug) setCohort(item);
      setLoading(false);
    })();
  }, [slug]);

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

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {back}
      <PageHeader title={cohort.title} description="Edit this cohort's details." />
      <Card>
        <CardContent className="p-6">
          <CohortForm
            cohort={cohort}
            onCancel={() => navigate("/admin/cohorts")}
            onSuccess={() => navigate("/admin/cohorts")}
          />
        </CardContent>
      </Card>
    </div>
  );
}
