import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ScrollToTop } from "../components/ScrollToTop";
import { Home } from "../pages/Home";
import { Contact } from "../pages/Contact";
import { AboutPage } from "../pages/AboutPage";
import { ServicesPage } from "../pages/ServicesPage";
import { NotFound } from "../pages/NotFound";
import { BlogPage } from "../pages/BlogPage";
import { BlogDetail } from "../pages/blog/BlogDetail";
import { CommunityPage } from "../pages/Community";
import { JoinUsPage } from "../pages/JoinUsPage";
import  LoginPage  from "@/pages/login/LoginPage";

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
        <Route path="/services" element={<Layout><ServicesPage /></Layout>} />
        <Route path="/contact" element={<><Navbar /><Contact /><ScrollToTop /></>} />
        <Route path="/blog" element={<><Navbar /><BlogPage /><Footer /><ScrollToTop /></>} />
        <Route path="/joinus" element={<><Navbar /><JoinUsPage /><Footer /><ScrollToTop /></>} />
        <Route path="/blog/:slug" element={<Layout><BlogDetail /></Layout>} />
        <Route path="/community" element={<><Navbar /><CommunityPage /><Footer /><ScrollToTop /></>} />
        <Route path="/admin/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}