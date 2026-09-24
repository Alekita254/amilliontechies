import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { apiGetRequest } from "@/backend/functions";
import { CohortCard, CohortCardData } from "@/components/CohortCard";

type CohortFilter = "PRESENT" | "PAST";

export function CohortsPage() {
  const [filter, setFilter] = useState<CohortFilter>("PRESENT");
  const [cohorts, setCohorts] = useState<CohortCardData[]>([]);
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
          <CohortCard key={cohort.slug} cohort={cohort} />
        ))}
      </section>
    </main>
  );
}
