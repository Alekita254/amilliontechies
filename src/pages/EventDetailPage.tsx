import { Link, useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { events } from "@/assets/publicContent";

export function EventDetailPage() {
  const { slug } = useParams();
  const event = events.find((item) => item.slug === slug);

  if (!event) {
    return (
      <main className="container py-20">
        <h1 className="text-3xl font-bold">Event not found</h1>
        <Button asChild variant="link" className="px-0 mt-2">
          <Link to="/events">Back to Events</Link>
        </Button>
      </main>
    );
  }

  return (
    <main className="container py-12 md:py-16 space-y-8">
      <section className="max-w-3xl">
        <Badge variant="outline">{event.eventType}</Badge>
        <h1 className="text-4xl md:text-5xl font-bold mt-3 tracking-tight">{event.title}</h1>
        <p className="mt-3 text-muted-foreground text-lg">{event.shortDescription}</p>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Date</CardTitle>
          </CardHeader>
          <CardContent>{event.startDate}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Location</CardTitle>
          </CardHeader>
          <CardContent>{event.location}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Type</CardTitle>
          </CardHeader>
          <CardContent>{event.eventType}</CardContent>
        </Card>
      </section>

      <section className="flex gap-3">
        <Button>Register</Button>
        <Button variant="outline">Share Event</Button>
      </section>
    </main>
  );
}
