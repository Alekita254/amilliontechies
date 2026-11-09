import { useCallback, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MemberProfileDialog, MyMembership, Person } from "@/components/MemberProfileDialog";
import { apiGetRequest } from "@/backend/functions";
import { hasSession, signOut } from "@/lib/session";
import { cn } from "@/lib/utils";

type Me = { email: string; name: string; memberships: MyMembership[] };

const STATUS_STYLE: Record<MyMembership["status"], { label: string; className: string }> = {
  PENDING: { label: "Pending", className: "border-transparent bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300" },
  APPROVED: { label: "Approved", className: "border-transparent bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300" },
  REJECTED: { label: "Not selected", className: "border-transparent bg-muted text-muted-foreground" },
};

function PersonCard({ person }: { person: Person }) {
  return (
    <div className="rounded-lg border p-3">
      <p className="font-medium">{person.full_name}</p>
      {person.headline && <p className="text-xs text-muted-foreground">{person.headline}</p>}
      {person.about && <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{person.about}</p>}
      <a href={`mailto:${person.email}`} className="mt-2 inline-flex items-center gap-1.5 text-sm text-primary hover:underline">
        <Mail className="h-3.5 w-3.5" /> {person.email}
      </a>
    </div>
  );
}

export function MyCohortPage() {
  const navigate = useNavigate();
  const [me, setMe] = useState<Me | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<MyMembership | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const res = await apiGetRequest("members/me/");
    if (res.data?.data) setMe(res.data.data);
    else if (!hasSession()) navigate("/signin", { replace: true }); // the session ended while loading
    else setError(res.message || "We couldn't load your cohort space.");
    setLoading(false);
  }, [navigate]);

  useEffect(() => {
    if (hasSession()) load();
  }, [load]);

  if (!hasSession()) return <Navigate to="/signin" replace />;

  const leave = () => {
    signOut();
    navigate("/");
  };

  const saved = (updated: MyMembership) => {
    setMe((m) => m && { ...m, memberships: m.memberships.map((x) => (x.id === updated.id ? updated : x)) });
    setEditing(null);
  };

  return (
    <main className="container max-w-3xl space-y-6 py-12 md:py-16">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">My cohort</h1>
          {me && <p className="mt-1 text-muted-foreground">Hi {me.name}. Signed in as {me.email}.</p>}
        </div>
        <Button variant="outline" onClick={leave}>Sign out</Button>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : error ? (
        <div className="space-y-3">
          <p className="text-muted-foreground">{error}</p>
          <Button variant="outline" onClick={load}>Try again</Button>
        </div>
      ) : !me || me.memberships.length === 0 ? (
        <p className="text-muted-foreground">We couldn't find an application for this email.</p>
      ) : (
        me.memberships.map((m) => {
          const status = STATUS_STYLE[m.status];
          return (
            <Card key={m.id}>
              <CardHeader className="flex-row flex-wrap items-start justify-between gap-3 space-y-0">
                <div>
                  <CardTitle className="text-xl">
                    <Link to={`/cohorts/${m.cohort.slug}`} className="hover:underline">{m.cohort.title}</Link>
                  </CardTitle>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {m.role === "MENTOR" ? "Mentor" : "Mentee"}
                    {m.cohort.duration ? ` · ${m.cohort.duration}` : ""}
                  </p>
                </div>
                <Badge className={cn(status.className)}>{status.label}</Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                {m.status === "PENDING" && (
                  <p className="text-sm text-muted-foreground">Your application is under review. We'll email you when it's decided.</p>
                )}
                {m.status === "REJECTED" && (
                  <p className="text-sm text-muted-foreground">Your application wasn't successful this time.</p>
                )}
                {m.status === "APPROVED" && m.role === "MENTEE" && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold">Your mentor</h3>
                    {m.mentor ? <PersonCard person={m.mentor} /> : (
                      <p className="text-sm text-muted-foreground">A mentor hasn't been assigned yet.</p>
                    )}
                  </div>
                )}
                {m.status === "APPROVED" && m.role === "MENTOR" && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold">Your mentees</h3>
                    {m.mentees.length ? (
                      <div className="grid gap-3 sm:grid-cols-2">
                        {m.mentees.map((p) => <PersonCard key={p.email} person={p} />)}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No mentees assigned yet.</p>
                    )}
                  </div>
                )}
                <Button variant="outline" size="sm" onClick={() => setEditing(m)}>Edit my profile</Button>
              </CardContent>
            </Card>
          );
        })
      )}

      {editing && <MemberProfileDialog key={editing.id} membership={editing} onClose={() => setEditing(null)} onSaved={saved}
          onSessionLost={() => navigate("/signin", { replace: true })} />}
    </main>
  );
}
