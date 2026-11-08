import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Briefcase, CalendarDays, Eye, FileText, Globe, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { apiGetRequest } from "@/backend/functions";
import { GraphCard } from "./components/GraphCard";
import { BlogSummary, type LatestBlog } from "./components/BlogSummary";
import { PageHeader } from "./components/PageHeader";
import { StatsCard } from "./components/StatsCard";

type Stats = {
  monthly_blog_posts: Record<string, number>;
  latest_blogs: any[];
  community_distribution: { category: string; count: number }[];
  totals: { total_blogs: number; total_communities: number };
};

const quickLinks = [
  { name: "Blogs", text: "Write and edit posts", icon: FileText, href: "/admin/blog" },
  { name: "Community", text: "Manage events", icon: Globe, href: "/admin/community" },
  { name: "Cohorts", text: "Manage cohorts", icon: Briefcase, href: "/admin/cohorts" },
];

function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-xl bg-muted ${className}`} />;
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const res = await apiGetRequest("dashboard/stats/");
    if (res.data?.data) setStats(res.data.data);
    else setError(res.message || "Could not load the dashboard.");
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/admin/login");
      return;
    }
    load();
  }, [user, navigate, load]);

  const firstName = user?.name?.split(" ")[0] || "there";

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-14 w-72" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => <Skeleton key={i} className="h-24" />)}
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-80" />
          <Skeleton className="h-80" />
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <Card className="mx-auto mt-10 flex max-w-md flex-col items-center gap-3 p-8 text-center">
        <p className="font-semibold">Couldn't load the dashboard</p>
        <p className="text-sm text-muted-foreground">{error}</p>
        <Button onClick={load} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" /> Try again
        </Button>
      </Card>
    );
  }

  const months = Object.keys(stats.monthly_blog_posts);
  const monthCounts = Object.values(stats.monthly_blog_posts);
  const postsThisYear = monthCounts.reduce((a, b) => a + b, 0);
  const recentViews = stats.latest_blogs.reduce((sum, b) => sum + (b.views || 0), 0);

  const latest: LatestBlog[] = stats.latest_blogs.map((b) => ({
    title: b.title,
    slug: b.slug,
    author: b.author?.name,
    views: b.views,
    published: b.date.slice(0, 10),
  }));

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Welcome back, ${firstName}`}
        description="Here's what's happening on the site."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Blog posts" value={stats.totals.total_blogs} icon={<FileText className="h-5 w-5" />} />
        <StatsCard title="Community events" value={stats.totals.total_communities} icon={<CalendarDays className="h-5 w-5" />} />
        <StatsCard title="Posts this year" value={postsThisYear} icon={<Briefcase className="h-5 w-5" />} />
        <StatsCard title="Recent views" value={recentViews} hint="On the last 5 posts" icon={<Eye className="h-5 w-5" />} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <GraphCard type="bar" title="Posts per month" label="Posts" labels={months} values={monthCounts} />
        <GraphCard
          type="pie"
          title="Events by category"
          labels={stats.community_distribution.map((c) => c.category)}
          values={stats.community_distribution.map((c) => c.count)}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <BlogSummary data={latest} />
        </div>
        <div className="space-y-3">
          <h3 className="text-base font-semibold">Quick links</h3>
          {quickLinks.map(({ name, text, icon: Icon, href }) => (
            <Link key={href} to={href}>
              <Card className="mb-3 flex items-center gap-3 p-4 transition-colors hover:bg-muted">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium">{name}</p>
                  <p className="text-xs text-muted-foreground">{text}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
