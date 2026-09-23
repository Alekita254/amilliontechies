import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cohorts } from "@/assets/publicContent";

type StatusFilter = "ALL" | "UPCOMING" | "ACTIVE" | "COMPLETED";

const statusClasses: Record<StatusFilter, string> = {
  ALL: "",
  UPCOMING: "bg-blue-100 text-blue-700 border-blue-200",
  ACTIVE: "bg-emerald-100 text-emerald-700 border-emerald-200",
  COMPLETED: "bg-slate-100 text-slate-700 border-slate-200",
};

export function CohortsPage() {
  const [status, setStatus] = useState<StatusFilter>("ALL");

  const filtered = useMemo(() => {
    if (status === "ALL") return cohorts;
    return cohorts.filter((cohort) => cohort.status === status);
  }, [status]);

  return (
    <main className="container py-12 md:py-16">
      <section className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Cohorts</h1>
        <p className="mt-3 text-muted-foreground text-lg">
          Explore current, upcoming, and completed cohorts in the A Million Techies community.
        </p>
      </section>

      <section className="mt-8 flex flex-wrap gap-2">
        {(["ALL", "UPCOMING", "ACTIVE", "COMPLETED"] as StatusFilter[]).map((item) => (
          <Button
            key={item}
            variant={status === item ? "default" : "outline"}
            onClick={() => setStatus(item)}
          >
            {item}
          </Button>
        ))}
      </section>

      <section className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((cohort) => (
          <Card key={cohort.slug} className="border-zinc-200/80">
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <Badge className={statusClasses[cohort.status]}>{cohort.status}</Badge>
                <span className="text-xs text-muted-foreground">{cohort.track}</span>
              </div>
              <CardTitle className="text-xl leading-tight">{cohort.title}</CardTitle>
              <CardDescription>{cohort.shortDescription}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2 text-sm mb-4">
                <div>
                  <p className="text-muted-foreground">Duration</p>
                  <p className="font-medium">{cohort.duration}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Learners</p>
                  <p className="font-medium">{cohort.learnerCount}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Mentors</p>
                  <p className="font-medium">{cohort.mentorCount}</p>
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
