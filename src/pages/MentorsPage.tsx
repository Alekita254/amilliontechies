import { useState } from "react";
import { Link } from "react-router-dom";
import { UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mentors } from "@/assets/publicContent";

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");

const MentorAvatar = ({ name, mentorImage }: { name: string; mentorImage?: string }) => {
  const [hasError, setHasError] = useState(false);
  const showImage = Boolean(mentorImage) && !hasError;

  if (showImage) {
    return (
      <img
        src={mentorImage}
        alt={`${name} profile`}
        loading="lazy"
        onError={() => setHasError(true)}
        className="h-28 w-full object-cover sm:h-40"
      />
    );
  }

  return (
    <div className="flex h-28 w-full items-center justify-center bg-gradient-to-br from-primary/10 via-background to-primary/5 sm:h-40">
      <div className="flex flex-col items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary sm:h-14 sm:w-14 sm:text-sm">
          {getInitials(name)}
        </div>
        <UserRound className="h-4 w-4 text-primary/70" />
      </div>
    </div>
  );
};

export function MentorsPage() {
  return (
    <main className="container py-12 md:py-16">
      <section className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Meet Our Mentors</h1>
        <p className="mt-3 text-base text-muted-foreground sm:text-lg">
          People giving their time, knowledge, and experience to help others grow.
        </p>
      </section>

      <section className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
        {mentors.map((mentor) => (
          <Card key={mentor.slug} className="overflow-hidden border-border/70 transition-shadow hover:shadow-md">
            <MentorAvatar name={mentor.name} mentorImage={mentor.mentorImage} />

            <CardHeader className="p-3 pb-2 sm:p-6 sm:pb-2">
              <CardTitle className="text-sm leading-tight sm:text-base md:text-lg">{mentor.name}</CardTitle>
              <CardDescription className="line-clamp-1 text-xs sm:text-sm">{mentor.headline}</CardDescription>
            </CardHeader>
            <CardContent className="p-3 pt-0 sm:p-6 sm:pt-0">
              <p className="mb-3 line-clamp-2 text-xs leading-5 text-muted-foreground sm:mb-4 sm:text-sm sm:leading-6">{mentor.shortBio}</p>
              <div className="mb-3 flex flex-wrap gap-1.5 sm:mb-4 sm:gap-2">
                {mentor.expertise.map((item) => (
                  <Badge key={item} variant="outline" className="text-[10px] sm:text-xs">{item}</Badge>
                ))}
              </div>
              <Link
                to={`/mentors/${mentor.slug}`}
                className="inline-flex items-center text-xs font-medium text-primary hover:underline sm:text-sm"
              >
                View mentor profile
              </Link>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
