import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mentors } from "@/assets/publicContent";

export function MentorsPage() {
  return (
    <main className="container py-12 md:py-16">
      <section className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Meet Our Mentors</h1>
        <p className="mt-3 text-muted-foreground text-lg">
          People giving their time, knowledge, and experience to help others grow.
        </p>
      </section>

      <section className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {mentors.map((mentor) => (
          <Card key={mentor.slug} className="border-zinc-200/80">
            <CardHeader>
              <CardTitle>{mentor.name}</CardTitle>
              <CardDescription>{mentor.headline}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{mentor.shortBio}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {mentor.expertise.map((item) => (
                  <Badge key={item} variant="outline">{item}</Badge>
                ))}
              </div>
              <Link to={`/mentors/${mentor.slug}`} className="text-green-700 font-medium hover:underline">
                View profile
              </Link>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
