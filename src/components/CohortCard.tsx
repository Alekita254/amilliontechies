import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import fallbackCohortVisual from "@/assets/learning.svg";

export type CohortStatus = "UPCOMING" | "ACTIVE" | "COMPLETED";

export interface CohortCardData {
  title: string;
  slug: string;
  status: CohortStatus;
  image?: string;
  image_url?: string;
  cover_image?: string;
  banner_image?: string;
  short_description?: string;
  description?: string;
  duration?: string;
  learner_count?: number;
  mentor_count?: number;
  program_type?: string;
}

const statusClasses: Record<CohortStatus, string> = {
  UPCOMING: "bg-blue-100 text-blue-700 border-blue-200",
  ACTIVE: "bg-emerald-100 text-emerald-700 border-emerald-200",
  COMPLETED: "bg-slate-100 text-slate-700 border-slate-200",
};

interface CohortCardProps {
  cohort: CohortCardData;
}

const resolveCohortImage = (cohort: CohortCardData) => {
  const candidates = [
    cohort.image,
    cohort.image_url,
    cohort.cover_image,
    cohort.banner_image,
  ];

  const firstValid = candidates.find((item) => typeof item === "string" && item.trim().length > 0);
  return firstValid || fallbackCohortVisual;
};

export function CohortCard({ cohort }: CohortCardProps) {
  const [imageSrc, setImageSrc] = useState(resolveCohortImage(cohort));

  useEffect(() => {
    setImageSrc(resolveCohortImage(cohort));
  }, [cohort]);

  const isFallbackVisual = imageSrc === fallbackCohortVisual;

  return (
    <Card>
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <Badge className={statusClasses[cohort.status]}>{cohort.status}</Badge>
          <span className="text-xs text-muted-foreground">{cohort.program_type || "Program"}</span>
        </div>

        <CardTitle>{cohort.title}</CardTitle>
        <CardDescription>{cohort.short_description || cohort.description || ""}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="mb-4 grid grid-cols-3 gap-2 text-sm">
          <div>
            <p className="text-muted-foreground">Duration</p>
            <p className="font-medium">{cohort.duration || "TBD"}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Learners</p>
            <p className="font-medium">{cohort.learner_count ?? "-"}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Mentors</p>
            <p className="font-medium">{cohort.mentor_count ?? "-"}</p>
          </div>
        </div>

        <img
          src={imageSrc}
          alt={`${cohort.title} cohort visual`}
          loading="lazy"
          className={isFallbackVisual
            ? "mb-4 h-40 w-full rounded-xl bg-muted/40 p-5 object-contain"
            : "mb-4 h-40 w-full rounded-xl object-cover"
          }
          onError={() => setImageSrc(fallbackCohortVisual)}
        />

        <Button asChild className="w-full">
          <Link to={`/cohorts/${cohort.slug}`}>Explore Cohort</Link>
        </Button>
      </CardContent>

    </Card>
  );
}
