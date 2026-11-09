import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { TopNav } from "../components/TopNav";
import { getStoredUser, hasSession } from "@/lib/session";

export function DashboardLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Mentors and mentees can now sign in too, so keep them out of the admin area. A stored user with
  // no is_staff field (a session from before it existed) is let through; the API enforces staff access.
  const user = getStoredUser();
  if (!hasSession() || !user) return <Navigate to="/admin/login" replace />;
  if (user.is_staff === false) return <Navigate to="/my-cohort" replace />;

  return (
    <div className="flex min-h-screen bg-muted/40 text-foreground">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopNav onMenu={() => setMenuOpen(true)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-6xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
