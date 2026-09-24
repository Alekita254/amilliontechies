import { Link, useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StoryActions } from "@/components/StoryActions";
import { stories } from "@/assets/publicContent";

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export function StoryDetailPage() {
  const { slug } = useParams();
  const story = stories.find((item) => item.slug === slug);
  const relatedStories = stories
    .filter((item) => item.slug !== slug)
    .filter((item) => item.personType === story?.personType || item.cohort === story?.cohort)
    .slice(0, 3);

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
      <article className="max-w-4xl">
        <Badge variant="outline">{story.personType}</Badge>
        <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">{story.title}</h1>
        <p className="mt-2 text-muted-foreground">
          By {story.author} • {story.cohort} • {formatDate(story.publishedAt)} • {story.readTime}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {story.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="font-normal">{tag}</Badge>
          ))}
        </div>

        <img
          src={story.coverImage}
          alt={story.title}
          className="mt-8 h-64 w-full rounded-xl object-cover md:h-[420px]"
          loading="lazy"
        />

        <div className="mt-8 space-y-6 text-zinc-700 leading-relaxed dark:text-zinc-200">
          <p>{story.excerpt}</p>
          {story.content.map((paragraph, index) => (
            <p key={`${story.slug}-paragraph-${index}`}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link to="/cohorts">Related Cohort</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/stories">More Stories</Link>
          </Button>
        </div>

        <div className="mt-10">
          <StoryActions storySlug={story.slug} storyTitle={story.title} />
        </div>

        {relatedStories.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-semibold tracking-tight">Related Stories</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {relatedStories.map((item) => (
                <Card key={item.slug} className="h-full border-border/70">
                  <CardHeader>
                    <CardTitle className="text-lg leading-tight">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{item.excerpt}</p>
                    <Link to={`/stories/${item.slug}`} className="text-sm font-medium text-primary hover:underline">
                      Continue reading
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </article>
    </main>
  );
}
