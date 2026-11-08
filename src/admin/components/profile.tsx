import { useCallback, useEffect, useState } from "react";
import { Calendar, FileText, Globe, Eye, Mail, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { apiGetRequest } from "@/backend/functions";
import { Pill } from "./Pill";
import { StatsCard } from "./StatsCard";

type Profile = {
  full_name: string;
  email: string;
  date_joined: string;
  bio: string;
  profile_picture: string | null;
  total_blogs: number;
  total_communities: number;
  total_views: number;
};

const initials = (name: string) =>
  name.split(/\s+/).map((p) => p[0]).slice(0, 2).join("").toUpperCase() || "U";

export function UserProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const stored = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  })();

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    if (!stored?.email) {
      setError("You're not signed in. Please log in again.");
      setLoading(false);
      return;
    }
    // Trailing slash matters: a redirect would drop the Authorization header.
    const res = await apiGetRequest(`user/profile/${encodeURIComponent(stored.email)}/`);
    const data = res.data?.data;
    if (data) setProfile(data);
    else setError(res.message || "Failed to load your profile");
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) return <div className="mx-auto h-96 max-w-3xl animate-pulse rounded-xl bg-muted" />;

  if (error || !profile) {
    return (
      <Card className="mx-auto mt-10 flex max-w-md flex-col items-center gap-3 p-8 text-center">
        <p className="font-semibold">Couldn't load your profile</p>
        <p className="text-sm text-muted-foreground">{error}</p>
        <Button variant="outline" onClick={load}>
          <RefreshCw className="mr-2 h-4 w-4" /> Try again
        </Button>
      </Card>
    );
  }

  const name = profile.full_name || stored?.username || "User";
  const joined = new Date(profile.date_joined).toLocaleDateString(undefined, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Card className="overflow-hidden">
        <div className="h-28 bg-gradient-to-r from-primary/30 via-primary/10 to-transparent" />
        <div className="px-6 pb-6">
          <div className="-mt-12 flex items-end justify-between gap-4">
            {profile.profile_picture ? (
              <img
                src={profile.profile_picture}
                alt=""
                className="h-24 w-24 rounded-full border-4 border-card object-cover"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-card bg-primary/10 text-2xl font-bold text-primary">
                {initials(name)}
              </div>
            )}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <h2 className="text-2xl font-bold tracking-tight">{name}</h2>
            <Pill tone={stored?.is_staff ? "green" : "gray"}>{stored?.is_staff ? "Admin" : "Member"}</Pill>
          </div>

          <p className="mt-3 text-sm text-muted-foreground">{profile.bio || "No bio yet."}</p>

          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Mail className="h-4 w-4" /> {profile.email}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4" /> Joined {joined}
            </span>
          </div>
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatsCard title="Blogs" value={profile.total_blogs} icon={<FileText className="h-5 w-5" />} />
        <StatsCard title="Events" value={profile.total_communities} icon={<Globe className="h-5 w-5" />} />
        <StatsCard title="Total views" value={profile.total_views} icon={<Eye className="h-5 w-5" />} />
      </div>
    </div>
  );
}
