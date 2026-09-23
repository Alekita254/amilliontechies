import { Link, useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { projects } from "@/assets/publicContent";

export function ProjectDetailPage() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return (
      <main className="container py-20">
        <h1 className="text-3xl font-bold">Project not found</h1>
        <Button asChild variant="link" className="px-0 mt-2">
          <Link to="/projects">Back to Projects</Link>
        </Button>
      </main>
    );
  }

  return (
    <main className="container py-12 md:py-16 space-y-8">
      <section className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{project.name}</h1>
        <p className="mt-3 text-muted-foreground text-lg">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((item) => (
            <Badge key={item}>{item}</Badge>
          ))}
        </div>
      </section>

      <section className="flex gap-3">
        <Button>Live Demo</Button>
        <Button variant="outline">GitHub</Button>
      </section>

      <section className="grid md:grid-cols-2 gap-5">
        <Card>
          <CardHeader>
            <CardTitle>About the Project</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            This section is ready for long project descriptions, architecture decisions, and delivery outcomes.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Built During</CardTitle>
          </CardHeader>
          <CardContent>{project.cohort}</CardContent>
        </Card>
      </section>
    </main>
  );
}
