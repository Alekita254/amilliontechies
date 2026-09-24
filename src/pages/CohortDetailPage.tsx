import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
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
  const menteeCount = mentees.length || cohort.learner_count || 0;
  const mentorCount = mentors.length || cohort.mentor_count || 0;

  return (
    <main className="container py-12 md:py-16 space-y-10">
      <section>
        <Badge className="mb-3">{cohort.status}</Badge>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{cohort.title}</h1>
        <p className="mt-3 max-w-3xl text-muted-foreground text-lg">{cohort.short_description || cohort.description || ""}</p>
      </section>

      <section className="grid sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Duration</CardTitle>
          </CardHeader>
          <CardContent>{cohort.duration || "TBD"}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Mentees</CardTitle>
          </CardHeader>
          <CardContent>{menteeCount || "-"}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Mentors</CardTitle>
          </CardHeader>
          <CardContent>{mentorCount || "-"}</CardContent>
        </Card>
      </section>

      <section className="grid md:grid-cols-2 gap-5">
        <Card>
          <CardHeader>
            <CardTitle>Mentees in this Cohort</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {mentees.slice(0, 3).map((person) => (
                <div key={person.id} className="flex items-start gap-3">
                  <div className="h-9 w-9 shrink-0 rounded-full bg-primary/15 text-primary text-xs font-semibold flex items-center justify-center">
                    {getInitials(person.name)}
                  </div>
                  <div>
                    <p className="font-medium leading-tight">{person.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{person.title}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link to={`/cohorts/${cohort.slug}/mentees`}>View all mentees</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mentors in this Cohort</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {mentors.slice(0, 3).map((person) => (
                <div key={person.id} className="flex items-start gap-3">
                  <div className="h-9 w-9 shrink-0 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold flex items-center justify-center dark:bg-emerald-900/30 dark:text-emerald-300">
                    {getInitials(person.name)}
                  </div>
                  <div>
                    <p className="font-medium leading-tight">{person.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{person.title}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link to={`/cohorts/${cohort.slug}/mentors`}>View all mentors</Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <section className="grid md:grid-cols-2 gap-5">
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            This cohort focuses on practical, project-led learning. Participants collaborate in guided sprints and present real outcomes.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>What Mentees Build</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Production-style portfolio projects, technical writeups, and teamwork artifacts that reflect real-world delivery.
          </CardContent>
        </Card>
      </section>

      <section className="flex gap-3">
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
