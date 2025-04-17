import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Blog = {
  title: string;
  author: string;
  views: number;
  published: string;
};

type BlogSummaryProps = {
  data: Blog[];
};

const columns: ColumnDef<Blog>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "author",
    header: "Author",
  },
  {
    accessorKey: "views",
    header: "Views",
  },
  {
    accessorKey: "published",
    header: "Published",
  },
];

export function BlogSummary({ data }: BlogSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Blog Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={data} />
      </CardContent>
    </Card>
  );
}
