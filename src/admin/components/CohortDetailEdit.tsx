import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CohortForm } from "@/admin/components/CohortForm";
import { apiGetRequest } from "@/backend/functions";
import { toast } from "sonner";

type Cohort = {
  id: number;
  title: string;
  slug: string;
  short_description?: string;
  description?: string;
  program_type?: string;
  status: "UPCOMING" | "ACTIVE" | "COMPLETED";
  start_date?: string;
  end_date?: string;
  learner_count?: number;
  mentor_count?: number;
  featured?: boolean;
  published?: boolean;
};

export function CohortDetailEdit() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [cohort, setCohort] = useState<Cohort | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!slug) {
        setLoading(false);
        return;
      }

      const candidates = [`cohorts/${slug}/`, `public/cohorts/${slug}/`];

      for (const endpoint of candidates) {
        const res = await apiGetRequest(endpoint);
        const payload = res?.data;
        const item = payload?.data || payload;

        if (item && typeof item === "object" && item.slug) {
          setCohort(item as Cohort);
          setLoading(false);
          return;
        }
      }

      toast.error("Failed to load cohort");
      setLoading(false);
    };

    load();
  }, [slug]);

  if (loading) {
    return <p className="p-6">Loading cohort...</p>;
  }

  if (!cohort) {
    return (
      <div className="p-6 space-y-3">
        <p className="text-red-600">Cohort not found.</p>
        <Button variant="outline" onClick={() => navigate("/admin/cohorts")}>Back to cohorts</Button>
      </div>
    );
  }

  return (
    <Card className="mt-6 max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Edit Cohort: {cohort.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CohortForm
          cohort={cohort}
          onSuccess={() => {
            toast.success("Cohort saved");
            navigate("/admin/cohorts");
          }}
        />
      </CardContent>
    </Card>
  );
}
