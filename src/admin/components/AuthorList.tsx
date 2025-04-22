import React from "react";
import { useNavigate } from "react-router-dom";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";

export function AuthorList({ authors, onEdit, onDelete }) {
  const navigate = useNavigate();

  // Define the columns with proper format for tanstack table
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "profile_picture",
      header: "Photo",
      cell: ({ getValue }) => {
        const value = getValue();
        return value ? (
          <img
            src={value as string}
            alt="Author"
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <span className="text-gray-400">No photo</span>
        );
      },
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ getValue }) => <span>{getValue() as string}</span>

    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ getValue }) => <span>{getValue() as string}</span>
      ,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const author = row.original;
        return (
          <div className="space-x-2">
            <button
              onClick={() => onEdit(author)}
              className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(author.id)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  return <DataTable columns={columns} data={authors} />;
}
