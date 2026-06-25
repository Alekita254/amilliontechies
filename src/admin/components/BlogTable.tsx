import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { apiGetRequest } from "@/backend/functions";
import { API_URL } from "@/backend/names";
import { toast } from "sonner";

type Blog = {
  id: number;
  title: string;
  category: string;
  tags: string;
  slug: string;
  author: { id: number; name: string };
  date: string;
};

export function BlogTable() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await apiGetRequest("blogs/");
        setBlogs(res.data.data);
      } catch {
        toast.error("Failed to load blogs");
      }
    })();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this blog?")) return;
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`${API_URL}/blogs/${id}/`, {
        method: "DELETE",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!response.ok) throw new Error();
      toast.success("Blog deleted");
      setBlogs(prev => prev.filter(b => b.id !== id));
    } catch {
      toast.error("Failed to delete");
    }
  };

  const columns: ColumnDef<Blog>[] = [
    {
      accessorKey: "title",
      header: "Title",
      // always show
    },
    {
      id: "author",
      header: "Author",
      cell: ({ row }) => row.original.author.name,
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ getValue }) => (
        <span className="hidden md:inline">{getValue<string>()}</span>
      ),
    },
    {
      accessorKey: "tags",
      header: "Tags",
      cell: ({ getValue }) => (
        <span className="hidden lg:inline">{getValue<string>()}</span>
      ),
    },
    {
      accessorKey: "date",
      header: "Published",
      cell: ({ getValue }) => (
        <span className="hidden sm:inline">
          {new Date(getValue<string>()).toLocaleDateString()}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/admin/blog/${row.original.slug}/edit`)}
          >
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => handleDelete(row.original.id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const filtered = blogs.filter(b => {
    const q = filter.toLowerCase();
    return (
      b.title.toLowerCase().includes(q) ||
      b.category.toLowerCase().includes(q) ||
      b.tags.toLowerCase().includes(q)
    );
  });

  return (
    <Card className="mt-6">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <CardTitle>Blogs</CardTitle>
          <Input
            placeholder="Search..."
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="max-w-sm"
          />
        </div>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={filtered} />
      </CardContent>
    </Card>
  );
}
