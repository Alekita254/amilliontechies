import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Pencil, Plus, RefreshCw, Trash2, UserCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { EmptyState } from "./EmptyState";

export type Author = {
  id: number;
  name: string;
  email?: string;
  bio?: string;
  profile_picture?: string | null;
};

const initials = (name: string) =>
  name.split(/\s+/).map((p) => p[0]).slice(0, 2).join("").toUpperCase();

export function AuthorList({
  authors,
  loading,
  error,
  onRetry,
  onCreate,
  onEdit,
  onDelete,
}: {
  authors: Author[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
  onCreate: () => void;
  onEdit: (a: Author) => void;
  onDelete: (a: Author) => void;
}) {
  const columns: ColumnDef<Author>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Author",
        cell: ({ row }) => {
          const a = row.original;
          return (
            <div className="flex min-w-0 max-w-[12rem] items-center gap-3 sm:max-w-none">
              {a.profile_picture ? (
                <img src={a.profile_picture} alt="" className="h-10 w-10 shrink-0 rounded-full object-cover" />
              ) : (
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                  {initials(a.name)}
                </div>
              )}
              <div className="min-w-0">
                <p className="truncate font-medium">{a.name}</p>
                <p className="truncate text-xs text-muted-foreground">{a.email}</p>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "bio",
        header: "Bio",
        enableSorting: false,
        meta: { className: "hidden md:table-cell" },
        cell: ({ getValue }) => (
          <p className="line-clamp-2 max-w-md text-sm text-muted-foreground">
            {getValue<string>() || "—"}
          </p>
        ),
      },
      {
        id: "actions",
        header: "",
        enableSorting: false,
        cell: ({ row }) => (
          <div className="flex justify-end gap-1">
            <Button variant="ghost" size="icon" className="h-9 w-9" title="Edit" onClick={() => onEdit(row.original)}>
              <Pencil className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              title="Delete"
              className="h-9 w-9 text-muted-foreground hover:text-destructive"
              onClick={() => onDelete(row.original)}
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        ),
      },
    ],
    [onEdit, onDelete]
  );

  return (
    <Card>
      {loading ? (
        <div className="space-y-3 p-4">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-16 animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      ) : error ? (
        <EmptyState
          icon={<RefreshCw className="h-5 w-5" />}
          title="Couldn't load authors"
          text={error}
          action={<Button variant="outline" onClick={onRetry}>Try again</Button>}
        />
      ) : (
        <DataTable
          columns={columns}
          data={authors}
          onRowClick={onEdit}
          empty={
            <EmptyState
              icon={<UserCircle className="h-5 w-5" />}
              title="No authors yet"
              text="Add an author before you write your first blog or event."
              action={
                <Button onClick={onCreate}>
                  <Plus className="mr-2 h-4 w-4" /> New author
                </Button>
              }
            />
          }
        />
      )}
    </Card>
  );
}
