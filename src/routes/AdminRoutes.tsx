import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { DashboardLayout } from "../admin/layouts/DashboardLayout";
import  DashboardPage from "../admin/DashboardPage";
import  BlogPage  from "../admin/pages/BlogPage";
import AuthorPage from "@/admin/pages/AurthorPage";
import { BlogDetailEdit } from "../admin/components/BlogDetailEdit";
import { AuthorList } from "@/admin/components/AuthorList";
import { AuthorForm } from "@/admin/components/AuthorForm";
import CommunityPage from "@/admin/pages/CommunityPage";
import { CommunityDetailEdit } from "@/admin/components/CommunityDetailEdit";

export function AdminRoutes() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <Routes>
        {/* Public Admin Routes */}        
          <Route path="/admin" element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="blog/:slug" element={<BlogDetailEdit />} />
            <Route path="blog/:slug/edit" element={<BlogDetailEdit />} />
            <Route path="/admin/author" element={<AuthorPage />} />
            <Route path="/admin/author/create" element={<AuthorForm />} />
            <Route path="/admin/author/edit/:id" element={<AuthorForm />} />
            <Route path="/admin/community" element={<CommunityPage />} />
            <Route path="/admin/community/:slug/edit" element={<CommunityDetailEdit />} />
            <Route path="/admin/community/:slug" element={<CommunityDetailEdit />} />

          </Route>
        {/* </Route> */}
      </Routes>
    </>
  );
}
