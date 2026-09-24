import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CohortPerson, getCohortPeople, getInitials } from "@/assets/cohortPeople";

type PersonKind = "mentees" | "mentors";

interface CohortPeoplePageProps {
  kind: PersonKind;
}

export function CohortPeoplePage({ kind }: CohortPeoplePageProps) {
  const { slug } = useParams();
  const peopleData = getCohortPeople(slug);
  const people = kind === "mentees" ? peopleData.mentees : peopleData.mentors;
  const title = kind === "mentees" ? "Mentees" : "Mentors";
  const [selectedPerson, setSelectedPerson] = useState<CohortPerson | null>(null);

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

      <section className="grid grid-cols-3 gap-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
        {people.map((person) => (
          <Card key={person.id} className="h-full border-border/70">
            <CardHeader className="space-y-3 pb-3">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary">
                  {getInitials(person.name)}
                </div>
                <div className="min-w-0">
                  <CardTitle className="truncate text-lg">{person.name}</CardTitle>
                  <CardDescription className="mt-1 truncate">{person.title}</CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex h-[calc(100%-6.5rem)] flex-col justify-between gap-3">
              <p className="line-clamp-3 text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-6">{person.summary}</p>

              <button
                type="button"
                className="inline-flex w-full items-center justify-between rounded-md border border-border/70 px-2 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/5 sm:px-3 sm:py-2 sm:text-sm"
                onClick={() => setSelectedPerson(person)}
              >
                <span>More of me</span>
                <span aria-hidden>→</span>
              </button>
            </CardContent>
          </Card>
        ))}
      </section>

      <Dialog open={Boolean(selectedPerson)} onOpenChange={(open) => !open && setSelectedPerson(null)}>
        <DialogContent className="sm:max-w-xl">
          {selectedPerson && (
            <>
              <DialogHeader>
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary">
                  {getInitials(selectedPerson.name)}
                </div>
                <DialogTitle>{selectedPerson.name}</DialogTitle>
                <DialogDescription>{selectedPerson.title}</DialogDescription>
              </DialogHeader>

              <div className="text-sm leading-7 text-muted-foreground">
                {selectedPerson.summary}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}

export function CohortMenteesPage() {
  return <CohortPeoplePage kind="mentees" />;
}

export function CohortMentorsPage() {
  return <CohortPeoplePage kind="mentors" />;
}
