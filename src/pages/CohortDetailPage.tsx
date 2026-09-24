import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { apiGetRequest } from "@/backend/functions";
import { getCohortPeople, getInitials } from "@/assets/cohortPeople";

type Cohort = {
  title: string;
  slug: string;
  status: string;
  short_description?: string;
  description?: string;
  duration?: string;
  learner_count?: number;
  mentor_count?: number;
};

export function CohortDetailPage() {
  const { slug } = useParams();
  const [cohort, setCohort] = useState<Cohort | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCohort = async () => {
      if (!slug) {
        setError("Cohort slug is missing.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

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

      setError("We couldn't load this cohort right now.");
      setLoading(false);
    };

    loadCohort();
  }, [slug]);

  if (loading) {
    return (
      <main className="container py-20">
        <h1 className="text-3xl font-bold">Loading cohort...</h1>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container py-20">
        <h1 className="text-3xl font-bold">Unable to load cohort</h1>
        <p className="text-red-600 mt-2">{error}</p>
        <Button asChild variant="link" className="px-0 mt-2">
          <Link to="/cohorts">Back to Cohorts</Link>
        </Button>
      </main>
    );
  }

  if (!cohort) {
    return (
      <main className="container py-20">
        <h1 className="text-3xl font-bold">Cohort not found</h1>
        <Button asChild variant="link" className="px-0 mt-2">
          <Link to="/cohorts">Back to Cohorts</Link>
        </Button>
      </main>
    );
  }

  const { mentees, mentors } = getCohortPeople(cohort.slug);
  const menteeCount = Math.max(cohort.learner_count ?? 0, mentees.length);
  const mentorCount = Math.max(cohort.mentor_count ?? 0, mentors.length);
  const menteePreview = mentees.slice(0, 2);
  const mentorPreview = mentors.slice(0, 2);
  const extraMentees = Math.max(0, menteeCount - menteePreview.length);
  const extraMentors = Math.max(0, mentorCount - mentorPreview.length);

  return (
    <main className="container space-y-10 py-12 md:py-16">
      <section>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">{cohort.title}</h1>
        <p className="mt-3 max-w-3xl text-base text-muted-foreground sm:text-lg">{cohort.short_description || cohort.description || ""}</p>
      </section>

      <section className="grid grid-cols-3 gap-2 sm:gap-4">
        <Card>
          <CardHeader className="p-3 pb-2 sm:p-6 sm:pb-3">
            <CardTitle className="text-xs sm:text-lg">Duration</CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0 text-xs font-medium sm:p-6 sm:pt-0 sm:text-base">{cohort.duration || "TBD"}</CardContent>
        </Card>

        <Link to={`/cohorts/${cohort.slug}/mentees`} className="block">
          <Card className="h-full transition-all hover:shadow-md hover:border-primary/40">
            <CardHeader className="p-3 pb-2 sm:p-6 sm:pb-3">
              <CardTitle className="text-xs sm:text-lg">Mentees</CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0 sm:p-6 sm:pt-0">
              <div className="space-y-2">
                <div className="flex -space-x-2">
                  {menteePreview.map((person) => (
                    <div
                      key={person.id}
                      className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-primary/15 text-[10px] font-semibold text-primary sm:h-9 sm:w-9 sm:text-[11px]"
                    >
                      {getInitials(person.name)}
                    </div>
                  ))}
                  {extraMentees > 0 && (
                    <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-muted text-[10px] font-semibold text-muted-foreground sm:h-9 sm:w-9 sm:text-[11px]">
                      +{extraMentees}
                    </div>
                  )}
                </div>
                <p className="text-[10px] text-muted-foreground sm:text-sm">Click to see all</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to={`/cohorts/${cohort.slug}/mentors`} className="block">
          <Card className="h-full transition-all hover:shadow-md hover:border-primary/40">
            <CardHeader className="p-3 pb-2 sm:p-6 sm:pb-3">
              <CardTitle className="text-xs sm:text-lg">Mentors</CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0 sm:p-6 sm:pt-0">
              <div className="space-y-2">
                <div className="flex -space-x-2">
                  {mentorPreview.map((person) => (
                    <div
                      key={person.id}
                      className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-emerald-100 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 sm:h-9 sm:w-9 sm:text-[11px]"
                    >
                      {getInitials(person.name)}
                    </div>
                  ))}
                  {extraMentors > 0 && (
                    <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-muted text-[10px] font-semibold text-muted-foreground sm:h-9 sm:w-9 sm:text-[11px]">
                      +{extraMentors}
                    </div>
                  )}
                </div>
                <p className="text-[10px] text-muted-foreground sm:text-sm">Click to see all</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </section>

      <section className="space-y-6 sm:space-y-8">
        <article className="rounded-2xl border border-border/70 bg-background/80 p-4 sm:p-6 md:p-7">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Cohort Overview</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
            This cohort is designed around practical, project-led learning. Mentees move through guided weekly sprints,
            collaborate in peer groups, and receive direct support from mentors who review progress and provide feedback.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
            The experience balances technical depth with delivery discipline so participants can confidently build,
            ship, and communicate real outcomes that reflect industry expectations.
          </p>
        </article>

        <article className="rounded-2xl border border-border/70 bg-background/80 p-4 sm:p-6 md:p-7">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Learning Structure</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
            Sessions are organized into mentor check-ins, implementation windows, and demo reviews. Each stage is meant
            to make progress visible, improve consistency, and help mentees gain confidence through repeated practice.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
            By the end of the cohort, participants are expected to present complete work artifacts, explain their
            technical decisions, and show measurable growth across collaboration and delivery quality.
          </p>
        </article>
      </section>

      <section>
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl">What Mentees Build</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-muted-foreground sm:text-base">
              <li>Production-style portfolio projects with real product constraints.</li>
              <li>Technical documentation and implementation notes for each sprint.</li>
              <li>Team collaboration artifacts such as planning boards and review logs.</li>
              <li>Demo-ready outcomes that can be shared with hiring teams or communities.</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="flex flex-col gap-3 sm:flex-row">
        <Button asChild>
          <Link to="/joinus">Apply / Join</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/projects">See Related Projects</Link>
        </Button>
      </section>
    </main>
  );
}
