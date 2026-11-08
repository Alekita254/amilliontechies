import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ColumnDef } from "@tanstack/react-table";
import { Eye, FileText, Pencil, Plus, RefreshCw, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { apiDeleteRequest, apiGetRequest } from "@/backend/functions";
import { ConfirmDialog } from "./ConfirmDialog";
import { EmptyState } from "./EmptyState";
import { Pill } from "./Pill";

type Blog = {
  id: number;
  title: string;
  category: string;
  tags: string;
  slug: string;
  cover_image?: string | null;
  views: number;
  author?: { id: number; name: string };
  date: string;
};

export function BlogTable() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [toDelete, setToDelete] = useState<Blog | null>(null);
  const navigate = useNavigate();

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const res = await apiGetRequest("blogs/");
    const rows = res.data?.data;
    if (Array.isArray(rows)) setBlogs(rows);
    else setError(res.message || "Failed to load blogs");
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const remove = async () => {
    if (!toDelete) return;
    // The API looks blogs up by slug, not id.
    const res = await apiDeleteRequest(`blogs/${toDelete.slug}/`);
    if (res.success) {
      toast.success("Blog deleted");
      setBlogs((prev) => prev.filter((b) => b.slug !== toDelete.slug));
    } else {
      toast.error(res.message || "Failed to delete the blog");
    }
  };

  const edit = (b: Blog) => navigate(`/admin/blog/${b.slug}/edit`);

  const columns: ColumnDef<Blog>[] = useMemo(
    () => [
      {
        accessorKey: "title",
        header: "Post",
        cell: ({ row }) => (
          <div className="flex min-w-0 items-center gap-3">
            {row.original.cover_image ? (
              <img src={row.original.cover_image} alt="" className="h-11 w-11 shrink-0 rounded-lg object-cover" />
            ) : (
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <FileText className="h-5 w-5" />
              </div>
            )}
            <div className="min-w-0">
              <p className="truncate font-medium">{row.original.title}</p>
              <p className="truncate text-xs text-muted-foreground">
                {row.original.author?.name || "Unknown author"}
              </p>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: ({ getValue }) => <Pill>{getValue<string>()}</Pill>,
      },
      {
        accessorKey: "date",
        header: "Published",
        cell: ({ getValue }) => (
          <span className="whitespace-nowrap text-sm text-muted-foreground">
            {new Date(getValue<string>()).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" })}
          </span>
        ),
      },
      {
        accessorKey: "views",
        header: "Views",
        cell: ({ getValue }) => (
          <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
            <Eye className="h-3.5 w-3.5" /> {getValue<number>()}
          </span>
        ),
      },
      {
        id: "actions",
        header: "",
        enableSorting: false,
        cell: ({ row }) => (
          <div className="flex justify-end gap-1" onClick={(e) => e.stopPropagation()}>
            <Button variant="ghost" size="icon" title="Edit" onClick={() => edit(row.original)}>
              <Pencil className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              title="Delete"
              className="text-muted-foreground hover:text-destructive"
              onClick={() => setToDelete(row.original)}
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [navigate]
  );

  const q = search.trim().toLowerCase();
  const filtered = blogs.filter(
    (b) =>
      !q ||
      b.title.toLowerCase().includes(q) ||
      b.category.toLowerCase().includes(q) ||
      b.tags.toLowerCase().includes(q) ||
      b.author?.name.toLowerCase().includes(q)
  );

  return (
    <Card>
      <div className="flex items-center justify-between gap-3 border-b p-4">
        <p className="whitespace-nowrap text-sm text-muted-foreground">
          {loading ? "Loading…" : `${filtered.length} ${filtered.length === 1 ? "post" : "posts"}`}
        </p>
        <div className="relative w-full sm:w-64">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search posts…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
      </div>

      {loading ? (
        <div className="space-y-3 p-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-16 animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      ) : error ? (
        <EmptyState
          icon={<RefreshCw className="h-5 w-5" />}
          title="Couldn't load blogs"
          text={error}
          action={<Button variant="outline" onClick={load}>Try again</Button>}
        />
      ) : (
        <DataTable
          columns={columns}
          data={filtered}
          onRowClick={edit}
          empty={
            blogs.length === 0 ? (
              <EmptyState
                icon={<FileText className="h-5 w-5" />}
                title="No blog posts yet"
                text="Write your first post to see it here."
                action={
                  <Button onClick={() => navigate("/admin/blog/new")}>
                    <Plus className="mr-2 h-4 w-4" /> New blog
                  </Button>
                }
              />
            ) : (
              <EmptyState icon={<Search className="h-5 w-5" />} title="No matching posts" text="Try a different search." />
            )
          }
        />
      )}

      <ConfirmDialog
        open={!!toDelete}
        title="Delete this post?"
        description={toDelete ? `“${toDelete.title}” will be permanently removed, along with its comments.` : undefined}
        onConfirm={remove}
        onClose={() => setToDelete(null)}
      />
    </Card>
  );
}
