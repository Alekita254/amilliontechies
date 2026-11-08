import { useEffect, useMemo, useState } from "react";
import { apiGetRequest } from "@/backend/functions";
import { CohortCard, CohortCardData, CohortStatus } from "@/components/CohortCard";

const time = (d?: string | null) => (d ? Date.parse(d) : NaN);
// Dated cohorts first; undated ones sink to the bottom of their section.
const byDate = (key: "start_date" | "end_date", dir: 1 | -1) => (a: CohortCardData, b: CohortCardData) => {
  const [x, y] = [time(a[key] ?? a.start_date), time(b[key] ?? b.start_date)];
  if (Number.isNaN(x) && Number.isNaN(y)) return 0;
  if (Number.isNaN(x)) return 1;
  if (Number.isNaN(y)) return -1;
  return (x - y) * dir;
};

// What people most want to see first: what they can still join, then what is running, then history.
const SECTIONS: { status: CohortStatus; title: string; hint: string; sort: (a: CohortCardData, b: CohortCardData) => number }[] = [
  { status: "UPCOMING", title: "Upcoming", hint: "Starting soon. Have a look and register.", sort: byDate("start_date", 1) },
  { status: "ACTIVE", title: "Present", hint: "Running right now.", sort: byDate("start_date", 1) },
  { status: "COMPLETED", title: "Past", hint: "Cohorts we have already completed.", sort: byDate("end_date", -1) },
];

export function CohortsPage() {
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

  const groups = useMemo(
    () => SECTIONS.map((section) => ({ ...section, items: cohorts.filter((c) => c.status === section.status).sort(section.sort) })),
    [cohorts]
  );

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
          Explore upcoming, current and past cohorts in the A Million Techies community.
        </p>
      </section>

      {groups.every((g) => g.items.length === 0) && (
        <p className="mt-8 text-muted-foreground">No cohorts have been published yet.</p>
      )}

      {groups.map(
        (group) =>
          group.items.length > 0 && (
            <section key={group.status} className="mt-10">
              <h2 className="text-2xl font-semibold tracking-tight">{group.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{group.hint}</p>
              <div className="mt-5 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {group.items.map((cohort) => (
                  <CohortCard key={cohort.slug} cohort={cohort} />
                ))}
              </div>
            </section>
          )
      )}
    </main>
  );
}
