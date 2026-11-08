import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

declare module "@tanstack/react-table" {
  // Lets a column opt out of small screens, e.g. meta: { className: "hidden md:table-cell" }
  interface ColumnMeta<TData, TValue> {
    className?: string;
  }
}

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  /** Shown instead of the table when there are no rows. */
  empty?: ReactNode;
  onRowClick?: (row: TData) => void;
}

export function DataTable<TData>({ columns, data, empty, onRowClick }: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (data.length === 0 && empty) return <>{empty}</>;

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-transparent">
              {headerGroup.headers.map((header) => {
                const canSort = header.column.getCanSort();
                const dir = header.column.getIsSorted();
                const Icon = dir === "asc" ? ChevronUp : dir === "desc" ? ChevronDown : ChevronsUpDown;
                return (
                  <TableHead
                    key={header.id}
                    className={cn(
                      "h-11 px-3 text-xs font-medium uppercase sm:px-4 tracking-wide text-muted-foreground",
                      header.column.columnDef.meta?.className,
                      canSort && "cursor-pointer select-none hover:text-foreground"
                    )}
                    onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                  >
                    <span className="inline-flex items-center gap-1">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {canSort && <Icon className={cn("h-3.5 w-3.5", !dir && "opacity-40")} />}
                    </span>
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              className={cn(onRowClick && "cursor-pointer")}
              onClick={onRowClick ? () => onRowClick(row.original) : undefined}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className={cn("px-3 py-3.5 sm:px-4", cell.column.columnDef.meta?.className)}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
