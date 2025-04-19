import { useState } from "react";
import { BlogSummary } from "../components/BlogSummary";
import { BlogForm } from "../components/BlogForm";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { BlogTable } from "../components/BlogTable";

export default function BlogPage() {
  const [showForm, setShowForm] = useState(false);

  const blogs = [
    { title: "AI in Agriculture", author: "Alex Murimi", views: 112, published: "2025-03-12" },
    { title: "Sustainable Tech", author: "Jane Doe", views: 78, published: "2025-02-28" },
    { title: "Chaff Cutter Safety", author: "Murimi Dev", views: 156, published: "2025-01-20" },
  ];

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Blog Management</h1>

      <Button onClick={() => setShowForm(prev => !prev)}>
        {showForm ? "Hide Blog Form" : "Add New Blog"}
      </Button>

      {showForm && <BlogForm />}

      <Separator />

      {/* <BlogSummary data={blogs} /> */}
      <BlogTable />
    </div>
  );
}
