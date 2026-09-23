import { Link, useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mentors } from "@/assets/publicContent";

export function MentorDetailPage() {
  const { slug } = useParams();
  const mentor = mentors.find((item) => item.slug === slug);

  if (!mentor) {
    return (
      <main className="container py-20">
        <h1 className="text-3xl font-bold">Mentor not found</h1>
        <Button asChild variant="link" className="px-0 mt-2">
          <Link to="/mentors">Back to Mentors</Link>
        </Button>
      </main>
    );
  }

  return (
    <main className="container py-12 md:py-16 space-y-8">
      <section className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{mentor.name}</h1>
        <p className="mt-2 text-lg text-muted-foreground">{mentor.headline}</p>
        <p className="mt-4 text-zinc-700 dark:text-zinc-200">{mentor.shortBio}</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Areas of Expertise</h2>
        <div className="flex flex-wrap gap-2">
          {mentor.expertise.map((item) => (
            <Badge key={item} variant="outline">{item}</Badge>
          ))}
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-5">
        <Card>
          <CardHeader>
            <CardTitle>Cohorts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {mentor.cohorts.map((cohort) => (
              <p key={cohort} className="text-sm">{cohort}</p>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Stories and Projects</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            This panel is ready for related stories and projects once entity relationships are connected in the API.
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
