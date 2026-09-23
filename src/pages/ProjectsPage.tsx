import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { projects } from "@/assets/publicContent";

export function ProjectsPage() {
  return (
    <main className="container py-12 md:py-16">
      <section className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Built by our community</h1>
        <p className="mt-3 text-muted-foreground text-lg">
          Explore projects created by A Million Techies learners and community members.
        </p>
      </section>

      <section className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project) => (
          <Card key={project.slug} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <Badge variant="outline" className="w-fit">{project.projectType}</Badge>
              <CardTitle>{project.name}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((item) => (
                  <Badge key={item}>{item}</Badge>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mb-3">Built during {project.cohort}</p>
              <Link to={`/projects/${project.slug}`} className="text-green-700 font-medium hover:underline">
                Explore project
              </Link>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
