import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { stories } from "@/assets/publicContent";

export function StoriesPage() {
  return (
    <main className="container py-12 md:py-16">
      <section className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Stories</h1>
        <p className="mt-3 text-muted-foreground text-lg">
          Real experiences from learners, mentors, and alumni inside the A Million Techies community.
        </p>
      </section>

      <section className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {stories.map((story) => (
          <Card key={story.slug} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <Badge variant="outline" className="w-fit">{story.personType}</Badge>
              <CardTitle className="text-xl">{story.title}</CardTitle>
              <CardDescription>By {story.author}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{story.excerpt}</p>
              <p className="text-xs text-muted-foreground mb-3">{story.cohort}</p>
              <Link to={`/stories/${story.slug}`} className="text-green-700 font-medium hover:underline">
                Read story
              </Link>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
