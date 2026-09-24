import { Link, useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cohorts, projects } from "@/assets/publicContent";
import { getCohortPeople, getInitials } from "@/assets/cohortPeople";

const projectTeamBySlug: Record<string, string[]> = {
  "katiba-news": ["Amina Otieno", "David Mwangi", "Faith Njeri", "Kevin Kiptoo"],
  agripulse: ["Mercy Atieno", "Ian Muturi", "Purity Nduta", "Brian Karanja"],
  "open-community-portal": ["Sharon Naliaka", "Victor Mumo", "Samuel Ochieng", "Grace Wambui"],
};

const projectLinksBySlug: Record<string, { demo?: string; repo?: string }> = {
  "katiba-news": {
    demo: "#",
    repo: "#",
  },
  agripulse: {
    demo: "#",
    repo: "#",
  },
  "open-community-portal": {
    demo: "#",
    repo: "#",
  },
};

export function ProjectDetailPage() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return (
      <main className="container py-20">
        <h1 className="text-3xl font-bold">Project not found</h1>
        <Link to="/projects" className="mt-2 inline-flex text-primary hover:underline">
          Back to Projects
        </Link>
      </main>
    );
  }

  const relatedCohort = cohorts.find((item) => item.title === project.cohort);
  const cohortPeople = getCohortPeople(relatedCohort?.slug);
  const mentees = cohortPeople.mentees.slice(0, 3);
  const mentors = cohortPeople.mentors.slice(0, 3);
  const extraMentees = Math.max(0, cohortPeople.mentees.length - mentees.length);
  const extraMentors = Math.max(0, cohortPeople.mentors.length - mentors.length);
  const teamMembers = projectTeamBySlug[project.slug] || [];
  const projectLinks = projectLinksBySlug[project.slug] || {};

  return (
    <main className="container space-y-8 py-12 md:py-16">
      <section className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{project.name}</h1>
        <p className="mt-3 text-muted-foreground text-lg">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((item) => (
            <Badge key={item}>{item}</Badge>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-3 gap-2 sm:gap-4">
        <Card>
          <CardHeader className="p-3 pb-2 sm:p-6 sm:pb-3">
            <CardTitle className="text-xs sm:text-lg">Built During</CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0 text-xs sm:p-6 sm:pt-0 sm:text-base">{project.cohort}</CardContent>
        </Card>

        <Link to="/cohorts" className="block">
          <Card className="h-full transition-all hover:shadow-md hover:border-primary/40">
            <CardHeader className="p-3 pb-2 sm:p-6 sm:pb-3">
              <CardTitle className="text-xs sm:text-lg">Mentees</CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0 sm:p-6 sm:pt-0">
              <div className="space-y-2">
                <div className="flex -space-x-2">
                  {mentees.map((person) => (
                    <div
                      key={person.id}
                      className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-primary/15 text-[10px] font-semibold text-primary sm:h-9 sm:w-9 sm:text-[11px]"
                    >
                      {getInitials(person.name)}
                    </div>
                  ))}
                  {extraMentees > 0 && (
                    <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-muted text-[10px] font-semibold text-muted-foreground sm:h-9 sm:w-9 sm:text-[11px]">
                      +{extraMentees}
                    </div>
                  )}
                </div>
                <p className="text-[10px] text-muted-foreground sm:text-sm">View cohort members</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/mentors" className="block">
          <Card className="h-full transition-all hover:shadow-md hover:border-primary/40">
            <CardHeader className="p-3 pb-2 sm:p-6 sm:pb-3">
              <CardTitle className="text-xs sm:text-lg">Mentors</CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0 sm:p-6 sm:pt-0">
              <div className="space-y-2">
                <div className="flex -space-x-2">
                  {mentors.map((person) => (
                    <div
                      key={person.id}
                      className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-emerald-100 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 sm:h-9 sm:w-9 sm:text-[11px]"
                    >
                      {getInitials(person.name)}
                    </div>
                  ))}
                  {extraMentors > 0 && (
                    <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-muted text-[10px] font-semibold text-muted-foreground sm:h-9 sm:w-9 sm:text-[11px]">
                      +{extraMentors}
                    </div>
                  )}
                </div>
                <p className="text-[10px] text-muted-foreground sm:text-sm">See mentors</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </section>

      <section className="space-y-6 sm:space-y-8">
        <article className="rounded-2xl border border-border/70 bg-background/80 p-4 sm:p-6 md:p-7">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Project Context</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
            This project was delivered inside a cohort-driven workflow where mentees worked in guided sprints and mentors
            supported architecture decisions, quality reviews, and delivery planning.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
            The output combines practical engineering and collaboration discipline, with emphasis on clarity of scope,
            clean implementation, and demonstrable impact.
          </p>
        </article>

        <article className="rounded-2xl border border-border/70 bg-background/80 p-4 sm:p-6 md:p-7">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Team</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <div key={member} className="rounded-xl border border-border/70 bg-background px-3 py-2 text-sm font-medium">
                {member}
              </div>
            ))}
            {teamMembers.length === 0 && (
              <p className="text-sm text-muted-foreground">Team roster will be listed here.</p>
            )}
          </div>
        </article>
      </section>

      <section className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
        <a
          href={projectLinks.demo || "#"}
          className="inline-flex items-center text-primary hover:underline"
        >
          View demo
        </a>
        <a
          href={projectLinks.repo || "#"}
          className="inline-flex items-center text-primary/80 hover:text-primary hover:underline"
        >
          View repository
        </a>
        <Link to="/projects" className="inline-flex items-center text-muted-foreground hover:text-foreground hover:underline">
          Back to projects
        </Link>
      </section>
    </main>
  );
}
