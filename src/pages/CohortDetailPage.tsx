import { Link, useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cohorts } from "@/assets/publicContent";

export function CohortDetailPage() {
  const { slug } = useParams();
  const cohort = cohorts.find((item) => item.slug === slug);

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

  return (
    <main className="container py-12 md:py-16 space-y-10">
      <section>
        <Badge className="mb-3">{cohort.status}</Badge>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{cohort.title}</h1>
        <p className="mt-3 max-w-3xl text-muted-foreground text-lg">{cohort.shortDescription}</p>
      </section>

      <section className="grid sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Duration</CardTitle>
          </CardHeader>
          <CardContent>{cohort.duration}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Learners</CardTitle>
          </CardHeader>
          <CardContent>{cohort.learnerCount}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Mentors</CardTitle>
          </CardHeader>
          <CardContent>{cohort.mentorCount}</CardContent>
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
            <CardTitle>What Learners Build</CardTitle>
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
