import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { CohortForm } from "@/admin/components/CohortForm";
import { CohortTable } from "@/admin/components/CohortTable";

export default function CohortPage() {
  const [openDialog, setOpenDialog] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Cohort Management</h1>
        <Button onClick={() => setOpenDialog(true)}>+ Add Cohort</Button>
      </div>

      <Separator />

      <CohortTable refreshKey={refreshKey} />

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Create Cohort</DialogTitle>
          </DialogHeader>
          <CohortForm
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
