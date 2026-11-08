import { Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { EmptyState } from "./EmptyState";

// Replaced by the full Members tab in the next task.
export function CohortMembers(_props: {
  slug: string;
  cohort: { capacity?: number | null; seats_taken?: number };
  onChange?: () => void;
}) {
  return (
    <Card>
      <EmptyState icon={<Users className="h-5 w-5" />} title="Members" text="Coming next." />
    </Card>
  );
}
