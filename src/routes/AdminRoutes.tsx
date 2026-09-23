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
import { ProfilePage } from "@/admin/pages/ProfilePage";
import { UserProfile } from "@/admin/components/profile";
import CohortPage from "@/admin/pages/CohortPage";
import { CohortDetailEdit } from "@/admin/components/CohortDetailEdit";


export function AdminRoutes() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/admin" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:slug" element={<BlogDetailEdit />} />
          <Route path="blog/:slug/edit" element={<BlogDetailEdit />} />
          <Route path="author" element={<AuthorPage />} />
          <Route path="author/create" element={<AuthorForm author={null} onSuccess={() => {}} />} />
          <Route path="author/edit/:id" element={<AuthorForm author={null} onSuccess={() => {}} />} />
          <Route path="community" element={<CommunityPage />} />
          <Route path="community/:slug/edit" element={<CommunityDetailEdit />} />
          <Route path="community/:slug" element={<CommunityDetailEdit />} />
          <Route path="cohorts" element={<CohortPage />} />
          <Route path="cohorts/:slug/edit" element={<CohortDetailEdit />} />
          <Route path="profile" element={<UserProfile />} />
        </Route>
      </Routes>
    </>
  );
}
