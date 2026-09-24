import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mentors } from "@/assets/publicContent";

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");

const MentorProfileVisual = ({ name, mentorImage }: { name: string; mentorImage?: string }) => {
  const [hasError, setHasError] = useState(false);
  const showImage = Boolean(mentorImage) && !hasError;

  if (showImage) {
    return (
      <img
        src={mentorImage}
        alt={`${name} profile`}
        loading="lazy"
        onError={() => setHasError(true)}
        className="h-64 w-full rounded-2xl object-cover md:h-72"
      />
    );
  }

  return (
    <div className="flex h-64 w-full items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 via-background to-primary/5 md:h-72">
      <div className="flex flex-col items-center gap-3">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 text-lg font-semibold text-primary">
          {getInitials(name)}
        </div>
        <UserRound className="h-5 w-5 text-primary/70" />
      </div>
    </div>
  );
};

export function MentorDetailPage() {
  const { slug } = useParams();
  const mentor = mentors.find((item) => item.slug === slug);

  if (!mentor) {
    return (
      <main className="container py-20">
        <h1 className="text-3xl font-bold">Mentor not found</h1>
        <Link to="/mentors" className="mt-2 inline-flex text-primary hover:underline">
          Back to Mentors
        </Link>
      </main>
    );
  }

  return (
    <main className="container space-y-8 py-12 md:py-16">
      <section className="grid gap-6 md:grid-cols-[280px_1fr] md:items-end">
        <MentorProfileVisual name={mentor.name} mentorImage={mentor.mentorImage} />

        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{mentor.name}</h1>
          <p className="mt-2 text-lg text-muted-foreground">{mentor.headline}</p>
          <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">{mentor.shortBio}</p>
        </div>
      </section>

      <section className="grid grid-cols-3 gap-2 sm:gap-4">
        <Card>
          <CardHeader className="p-3 pb-2 sm:p-6 sm:pb-3">
            <CardTitle className="text-xs sm:text-lg">Expertise</CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0 text-xs sm:p-6 sm:pt-0 sm:text-base">{mentor.expertise.length}</CardContent>
        </Card>

        <Card>
          <CardHeader className="p-3 pb-2 sm:p-6 sm:pb-3">
            <CardTitle className="text-xs sm:text-lg">Cohorts</CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0 text-xs sm:p-6 sm:pt-0 sm:text-base">{mentor.cohorts.length}</CardContent>
        </Card>

        <Card>
          <CardHeader className="p-3 pb-2 sm:p-6 sm:pb-3">
            <CardTitle className="text-xs sm:text-lg">Role</CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0 text-xs sm:p-6 sm:pt-0 sm:text-base">Mentor</CardContent>
        </Card>
      </section>

      <section className="space-y-6 sm:space-y-8">
        <article className="rounded-2xl border border-border/70 bg-background/80 p-4 sm:p-6 md:p-7">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Mentorship Approach</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
            {mentor.name} focuses on practical execution, clear communication, and repeatable delivery habits. Mentorship sessions are structured to help mentees move from concept understanding to real output with confidence.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
            Emphasis is placed on guided review loops so each mentee can improve quality, explain decisions, and collaborate effectively in team settings.
          </p>
        </article>

        <article className="rounded-2xl border border-border/70 bg-background/80 p-4 sm:p-6 md:p-7">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Areas of Expertise</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {mentor.expertise.map((item) => (
              <Badge key={item} variant="outline">{item}</Badge>
            ))}
          </div>
        </article>
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Cohorts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {mentor.cohorts.map((cohort) => (
              <p key={cohort} className="text-sm">{cohort}</p>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Stories and Projects</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground leading-6">
            Related stories and project contributions can be surfaced here as we connect mentor-specific relationships in the API.
          </CardContent>
        </Card>
      </section>

      <section className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
        <Link to="/mentors" className="inline-flex items-center text-primary hover:underline">
          Back to mentors
        </Link>
        <Link to="/stories" className="inline-flex items-center text-primary/80 hover:text-primary hover:underline">
          Related stories
        </Link>
        <Link to="/cohorts" className="inline-flex items-center text-muted-foreground hover:text-foreground hover:underline">
          View cohorts
        </Link>
      </section>
    </main>
  );
}
