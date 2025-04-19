import { useState } from "react";
import { BlogSummary } from "../components/BlogSummary";
import { BlogForm } from "../components/BlogForm";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { BlogTable } from "../components/BlogTable";
import { CommunityTable } from "../components/CommunityTable";
import { CommunityForm } from "../components/CommunityForm";

export default function CommunityPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Community / Events Management</h1>

      <Button onClick={() => setShowForm(prev => !prev)}>
        {showForm ? "Hide Community Form" : "Add New Community"}
      </Button>

      {showForm && <CommunityForm />}

      <Separator />

      <CommunityTable />
    </div>
  );
}
