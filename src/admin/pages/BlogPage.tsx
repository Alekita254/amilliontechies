import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlogTable } from "../components/BlogTable";
import { PageHeader } from "../components/PageHeader";

export default function BlogPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Blogs"
        description="Write, edit and manage your blog posts."
        action={
          <Button onClick={() => navigate("/admin/blog/new")}>
            <Plus className="mr-2 h-4 w-4" /> New blog
          </Button>
        }
      />
      <BlogTable />
    </div>
  );
}
