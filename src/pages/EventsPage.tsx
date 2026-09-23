import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { events } from "@/assets/publicContent";

export function EventsPage() {
  return (
    <main className="container py-12 md:py-16">
      <section className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Events</h1>
        <p className="mt-3 text-muted-foreground text-lg">
          Workshops, meetups, webinars, and demo days across the A Million Techies community.
        </p>
      </section>

      <section className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {events.map((event) => (
          <Card key={event.slug} className="border-zinc-200/80">
            <CardHeader>
              <Badge variant="outline" className="w-fit">{event.eventType}</Badge>
              <CardTitle>{event.title}</CardTitle>
              <CardDescription>{event.shortDescription}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{event.location}</p>
              <p className="text-sm text-muted-foreground mb-3">{event.startDate}</p>
              <Link to={`/events/${event.slug}`} className="text-green-700 font-medium hover:underline">
                View event
              </Link>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
