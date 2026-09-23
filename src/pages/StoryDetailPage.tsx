import { Link, useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { stories } from "@/assets/publicContent";

export function StoryDetailPage() {
  const { slug } = useParams();
  const story = stories.find((item) => item.slug === slug);

  if (!story) {
    return (
      <main className="container py-20">
        <h1 className="text-3xl font-bold">Story not found</h1>
        <Button asChild variant="link" className="px-0 mt-2">
          <Link to="/stories">Back to Stories</Link>
        </Button>
      </main>
    );
  }

  return (
    <main className="container py-12 md:py-16">
      <article className="max-w-3xl">
        <Badge variant="outline">{story.personType}</Badge>
        <h1 className="text-4xl md:text-5xl font-bold mt-3 tracking-tight">{story.title}</h1>
        <p className="text-muted-foreground mt-2">By {story.author} • {story.cohort}</p>

        <div className="mt-8 space-y-6 text-zinc-700 dark:text-zinc-200 leading-relaxed">
          <p>
            {story.excerpt}
          </p>
          <p>
            This page is ready for your full editorial structure: introduction, journey, challenge, experience, what I built, what I learned, and what comes next.
          </p>
          <p>
            As content relationships are wired, this view can automatically surface related cohort, related project, and related stories.
          </p>
        </div>

        <div className="mt-10 flex gap-3">
          <Button asChild>
            <Link to="/cohorts">Related Cohort</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/projects">Related Project</Link>
          </Button>
        </div>
      </article>
    </main>
  );
}
