import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ScrollToTop } from "../components/ScrollToTop";
import { Home } from "../pages/Home";
import { Contact } from "../pages/Contact";
import { AboutPage } from "../pages/AboutPage";
import { ServicesPage } from "../pages/ServicesPage";
import { BlogPage } from "../pages/BlogPage";
import { BlogDetail } from "../pages/blog/BlogDetail";
import { CommunityPage } from "../pages/Community";
import { JoinUsPage } from "../pages/JoinUsPage";
import  LoginPage  from "@/pages/login/LoginPage";
import { CohortsPage } from "@/pages/CohortsPage";
import { CohortDetailPage } from "@/pages/CohortDetailPage";
import { StoriesPage } from "@/pages/StoriesPage";
import { StoryDetailPage } from "@/pages/StoryDetailPage";
import { MentorsPage } from "@/pages/MentorsPage";
import { MentorDetailPage } from "@/pages/MentorDetailPage";
import { ProjectsPage } from "@/pages/ProjectsPage";
import { ProjectDetailPage } from "@/pages/ProjectDetailPage";
import { EventsPage } from "@/pages/EventsPage";
import { EventDetailPage } from "@/pages/EventDetailPage";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <ScrollToTop />
    </>
  );
};

export function PublicRoutes() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/about" element={<Layout><AboutPage /></Layout>} />
        <Route path="/cohorts" element={<Layout><CohortsPage /></Layout>} />
        <Route path="/cohorts/:slug" element={<Layout><CohortDetailPage /></Layout>} />
        <Route path="/stories" element={<Layout><StoriesPage /></Layout>} />
        <Route path="/stories/:slug" element={<Layout><StoryDetailPage /></Layout>} />
        <Route path="/mentors" element={<Layout><MentorsPage /></Layout>} />
        <Route path="/mentors/:slug" element={<Layout><MentorDetailPage /></Layout>} />
        <Route path="/projects" element={<Layout><ProjectsPage /></Layout>} />
        <Route path="/projects/:slug" element={<Layout><ProjectDetailPage /></Layout>} />
        <Route path="/events" element={<Layout><EventsPage /></Layout>} />
        <Route path="/events/:slug" element={<Layout><EventDetailPage /></Layout>} />
        <Route path="/services" element={<Layout><ServicesPage /></Layout>} />
        <Route path="/contact" element={<><Navbar /><Contact /><ScrollToTop /></>} />
        <Route path="/blog" element={<><Navbar /><BlogPage /><Footer /><ScrollToTop /></>} />
        <Route path="/joinus" element={<><Navbar /><JoinUsPage /><Footer /><ScrollToTop /></>} />
        <Route path="/join-us" element={<><Navbar /><JoinUsPage /><Footer /><ScrollToTop /></>} />
        <Route path="/blog/:slug" element={<Layout><BlogDetail /></Layout>} />
        <Route path="/community" element={<><Navbar /><CommunityPage /><Footer /><ScrollToTop /></>} />
        <Route path="/admin/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}