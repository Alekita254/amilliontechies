// src/routes/AdminRoutes.tsx
import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { DashboardLayout } from "../admin/layouts/DashboardLayout";
import  DashboardPage from "../admin/DashboardPage";
import  BlogPage  from "../admin/pages/BlogPage";
// import { UsersPage } from "../pages/admin/UsersPage";
// import { PostsPage } from "../pages/admin/PostsPage";
// import { SettingsPage } from "../pages/admin/SettingsPage";
// import { AdminLogin } from "../pages/admin/AdminLogin";

export function AdminRoutes() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <Routes>
        {/* Public Admin Routes */}
        {/* <Route path="/admin/login" element={<AdminLogin />} /> */}
        
        {/* Protected Admin Routes */}
        {/* <Route />}> */}
          <Route path="/admin" element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
            {/* <Route path="users" element={<UsersPage />} />
            <Route path="posts" element={<PostsPage />} />
            <Route path="settings" element={<SettingsPage />} /> */}
            <Route path="blog" element={<BlogPage />} />
          </Route>
        {/* </Route> */}
      </Routes>
    </>
  );
}
