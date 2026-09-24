import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { apiGetRequest } from "@/backend/functions";

type CohortStatus = "UPCOMING" | "ACTIVE" | "COMPLETED";
type CohortFilter = "PRESENT" | "PAST";

type Cohort = {
  title: string;
  slug: string;
  status: CohortStatus;
  short_description?: string;
  description?: string;
  duration?: string;
  learner_count?: number;
  mentor_count?: number;
  program_type?: string;
};

const statusClasses: Record<CohortStatus, string> = {
  UPCOMING: "bg-blue-100 text-blue-700 border-blue-200",
  ACTIVE: "bg-emerald-100 text-emerald-700 border-emerald-200",
  COMPLETED: "bg-slate-100 text-slate-700 border-slate-200",
};

export function CohortsPage() {
  const [filter, setFilter] = useState<CohortFilter>("PRESENT");
  const [cohorts, setCohorts] = useState<Cohort[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCohorts = async () => {
      setLoading(true);
      setError(null);

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
          setLoading(false);
          return;
        }
      }

      setError("We couldn't load cohorts right now. Please try again.");
      setLoading(false);
    };

    loadCohorts();
  }, []);

  const filtered = useMemo(() => {
    if (filter === "PRESENT") {
      return cohorts.filter((cohort) => cohort.status === "ACTIVE");
    }

    return cohorts.filter((cohort) => cohort.status !== "ACTIVE");
  }, [cohorts, filter]);

  if (loading) {
    return (
      <main className="container py-12 md:py-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Cohorts</h1>
        <p className="mt-4 text-muted-foreground">Loading cohorts...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container py-12 md:py-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Cohorts</h1>
        <p className="mt-4 text-red-600">{error}</p>
      </main>
    );
  }

  return (
    <main className="container py-12 md:py-16">
      <section className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Cohorts</h1>
        <p className="mt-3 text-muted-foreground text-lg">
          Explore active and past cohorts in the A Million Techies community.
        </p>
      </section>

      <section className="mt-8">
        <div className="inline-flex rounded-xl border border-border/80 bg-muted/40 p-1">
          {([
            { key: "PRESENT", label: "Present" },
            { key: "PAST", label: "Past Cohorts" },
          ] as const).map((item) => (
            <Button
              key={item.key}
              variant="ghost"
              onClick={() => setFilter(item.key)}
              className={
                filter === item.key
                  ? "rounded-lg bg-background shadow-sm text-foreground"
                  : "rounded-lg text-muted-foreground hover:text-foreground"
              }
            >
              {item.label}
            </Button>
          ))}
        </div>
      </section>

      <section className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.length === 0 && (
          <p className="text-muted-foreground">
            {filter === "PRESENT"
              ? "No active cohorts are available right now."
              : "No past cohorts have been published yet."}
          </p>
        )}
        {filtered.map((cohort) => (
          <Card key={cohort.slug} className="border-zinc-200/80">
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <Badge className={statusClasses[cohort.status]}>{cohort.status}</Badge>
                <span className="text-xs text-muted-foreground">{cohort.program_type || "Program"}</span>
              </div>
              <CardTitle className="text-xl leading-tight">{cohort.title}</CardTitle>
              <CardDescription>{cohort.short_description || cohort.description || ""}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2 text-sm mb-4">
                <div>
                  <p className="text-muted-foreground">Duration</p>
                  <p className="font-medium">{cohort.duration || "TBD"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Learners</p>
                  <p className="font-medium">{cohort.learner_count ?? "-"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Mentors</p>
                  <p className="font-medium">{cohort.mentor_count ?? "-"}</p>
                </div>
              </div>

              <Button asChild className="w-full">
                <Link to={`/cohorts/${cohort.slug}`}>Explore Cohort</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
