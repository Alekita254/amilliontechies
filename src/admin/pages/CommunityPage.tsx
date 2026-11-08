import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CommunityTable } from "../components/CommunityTable";
import { PageHeader } from "../components/PageHeader";

export default function CommunityPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Community"
        description="Create and manage community events."
        action={
          <Button onClick={() => navigate("/admin/community/new")}>
            <Plus className="mr-2 h-4 w-4" /> New event
          </Button>
        }
      />
      <CommunityTable />
    </div>
  );
}
