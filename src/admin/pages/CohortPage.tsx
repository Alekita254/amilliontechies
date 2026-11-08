import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CohortForm } from "@/admin/components/CohortForm";
import { CohortTable } from "@/admin/components/CohortTable";
import { PageHeader } from "@/admin/components/PageHeader";

export default function CohortPage() {
  const [openDialog, setOpenDialog] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Cohorts"
        description="Create and manage your learning cohorts."
        action={
          <Button onClick={() => setOpenDialog(true)}>
            <Plus className="mr-2 h-4 w-4" /> New cohort
          </Button>
        }
      />

      <CohortTable refreshKey={refreshKey} onCreate={() => setOpenDialog(true)} />

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>New cohort</DialogTitle>
            <DialogDescription>Fill in the details. You can keep it as a draft until it's ready.</DialogDescription>
          </DialogHeader>
          <CohortForm
            onCancel={() => setOpenDialog(false)}
            onSuccess={() => {
              setOpenDialog(false);
              setRefreshKey((prev) => prev + 1);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
