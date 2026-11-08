import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export type LatestBlog = {
  title: string;
  slug: string;
  author?: string;
  views: number;
  published: string;
};

export function BlogSummary({ data }: { data: LatestBlog[] }) {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base font-semibold">Latest posts</CardTitle>
        <Link to="/admin/blog" className="text-sm font-medium text-primary hover:underline">
          View all
        </Link>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted-foreground">
            No posts yet. Write your first one from the Blogs page.
          </p>
        ) : (
          <ul className="divide-y">
            {data.map((b) => (
              <li key={b.slug}>
                <Link
                  to={`/admin/blog/${b.slug}/edit`}
                  className="-mx-2 flex items-center justify-between gap-4 rounded-lg px-2 py-3 transition-colors hover:bg-muted"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{b.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {b.author || "Unknown author"} · {b.published}
                    </p>
                  </div>
                  <span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                    <Eye className="h-3.5 w-3.5" /> {b.views}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
