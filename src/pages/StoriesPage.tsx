import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { stories } from "@/assets/publicContent";

type StoryTypeFilter = "ALL" | "MENTEE" | "MENTOR" | "ALUMNI";

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export function StoriesPage() {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<StoryTypeFilter>("ALL");

  const featuredStory = useMemo(
    () => stories.find((item) => item.featured) || stories[0],
    []
  );

  const filteredStories = useMemo(() => {
    return stories.filter((story) => {
      const matchesType = typeFilter === "ALL" ? true : story.personType === typeFilter;
      const searchable = `${story.title} ${story.author} ${story.cohort} ${story.tags.join(" ")} ${story.excerpt}`.toLowerCase();
      const matchesQuery = query.trim().length === 0 ? true : searchable.includes(query.toLowerCase());
      return matchesType && matchesQuery;
    });
  }, [query, typeFilter]);

  return (
    <main className="container py-12 md:py-16">
      <section className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Stories</h1>
        <p className="mt-3 text-muted-foreground text-lg">
          Real experiences from learners, mentors, and alumni in the A Million Techies community.
        </p>
      </section>

      {featuredStory && (
        <section className="mt-8">
          <Card className="overflow-hidden border-border/70">
            <div className="grid md:grid-cols-2">
              <img
                src={featuredStory.coverImage}
                alt={featuredStory.title}
                className="h-64 w-full object-cover md:h-full"
              />

              <div className="p-6 md:p-8">
                <Badge variant="outline" className="w-fit">Featured Story</Badge>
                <h2 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">{featuredStory.title}</h2>
                <p className="mt-3 text-muted-foreground leading-7">{featuredStory.excerpt}</p>

                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  <span>By {featuredStory.author}</span>
                  <span>{formatDate(featuredStory.publishedAt)}</span>
                  <span>{featuredStory.readTime}</span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {featuredStory.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="font-normal">{tag}</Badge>
                  ))}
                </div>

                <Link
                  to={`/stories/${featuredStory.slug}`}
                  className="mt-6 inline-flex text-sm font-medium text-primary hover:underline"
                >
                  Read featured story
                </Link>
              </div>
            </div>
          </Card>
        </section>
      )}

      <section className="mt-8 grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search stories by title, author, cohort, or tags"
        />

        <div className="flex flex-wrap gap-2">
          {(["ALL", "MENTEE", "MENTOR", "ALUMNI"] as StoryTypeFilter[]).map((item) => (
            <button
              key={item}
              type="button"
              className={
                typeFilter === item
                  ? "rounded-md bg-primary px-3 py-2 text-xs font-medium text-primary-foreground sm:text-sm"
                  : "rounded-md border border-border/70 px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground sm:text-sm"
              }
              onClick={() => setTypeFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filteredStories.map((story) => (
          <Card key={story.slug} className="overflow-hidden border-border/70 transition-shadow hover:shadow-md">
            <img src={story.coverImage} alt={story.title} className="h-44 w-full object-cover" loading="lazy" />
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <Badge variant="outline" className="w-fit">{story.personType}</Badge>
                <span className="text-xs text-muted-foreground">{story.readTime}</span>
              </div>
              <CardTitle className="text-xl">{story.title}</CardTitle>
              <CardDescription>
                By {story.author} • {formatDate(story.publishedAt)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{story.excerpt}</p>
              <p className="text-xs text-muted-foreground mb-3">{story.cohort}</p>
              <div className="mb-4 flex flex-wrap gap-2">
                {story.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="font-normal">{tag}</Badge>
                ))}
              </div>
              <Link to={`/stories/${story.slug}`} className="text-green-700 font-medium hover:underline">
                Read story
              </Link>
            </CardContent>
          </Card>
        ))}

        {filteredStories.length === 0 && (
          <p className="text-muted-foreground">No stories matched your filters yet.</p>
        )}
      </section>
    </main>
  );
}
