import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getCohortPeople, getInitials } from "@/assets/cohortPeople";

type PersonKind = "mentees" | "mentors";

interface CohortPeoplePageProps {
  kind: PersonKind;
}

export function CohortPeoplePage({ kind }: CohortPeoplePageProps) {
  const { slug } = useParams();
  const peopleData = getCohortPeople(slug);
  const people = kind === "mentees" ? peopleData.mentees : peopleData.mentors;
  const title = kind === "mentees" ? "Mentees" : "Mentors";

  return (
    <main className="container py-12 md:py-16 space-y-8">
      <section className="space-y-3">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{title}</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          A quick summary of everyone currently visible in this cohort.
        </p>
        <Button asChild variant="link" className="px-0">
          <Link to={`/cohorts/${slug}`}>Back to Cohort Detail</Link>
        </Button>
      </section>

      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {people.map((person) => (
          <Card key={person.id}>
            <CardHeader className="space-y-3">
              <div className="h-11 w-11 rounded-full bg-primary/15 text-primary text-sm font-semibold flex items-center justify-center">
                {getInitials(person.name)}
              </div>
              <div>
                <CardTitle>{person.name}</CardTitle>
                <CardDescription className="mt-1">{person.title}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-6">
              {person.summary}
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}

export function CohortMenteesPage() {
  return <CohortPeoplePage kind="mentees" />;
}

export function CohortMentorsPage() {
  return <CohortPeoplePage kind="mentors" />;
}
