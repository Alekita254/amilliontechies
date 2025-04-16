import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner"; // Import Sonner for notifications
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";

// Import pages
import { Home } from "./pages/Home";
import { Contact } from "./pages/Contact";
import { AboutPage } from "./pages/AboutPage";
import { ServicesPage } from "./pages/ServicesPage";
import { NotFound } from "./pages/NotFound";
import { BlogPage } from "./pages/BlogPage";
import { BlogDetail } from "./pages/blog/BlogDetail";
import { CommunityPage } from "./pages/Community";
import {JoinUsPage} from "./pages/JoinUsPage";
import LoginPage from "./pages/login/LoginPage";

// Layout Component for pages with navbar & footer
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

function App() {
  return (
    <Router>
      {/* Sonner Toaster (Global Notification Provider) */}
      <Toaster position="top-right" richColors />
      
      <Routes>
        {/* Home Page with Layout */}
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />

        {/* About Page with Layout */}
        <Route
          path="/about"
          element={
            <Layout>
              <AboutPage />
            </Layout>
          }
        />

        {/* Services Page with Layout */}
        <Route
          path="/services"
          element={
            <Layout>
              <ServicesPage />
            </Layout>
          }
        />

        {/* Contact Page with Custom Layout (e.g., No Footer) */}
        <Route
          path="/contact"
          element={
            <>
              <Navbar />
              <Contact />
              <ScrollToTop />
            </>
          }
        />

        <Route
          path="/blog"
          element={
            <>
              <Navbar />
              <BlogPage />
              < Footer />
              <ScrollToTop />
            </>
          }
        />

        <Route 
          path="/joinus" 
          element={
            <>
              <Navbar />
              <JoinUsPage />
              < Footer />
              <ScrollToTop />
            </>
          }
        />

        <Route 
          path="/blog/:slug" 
          element={
            <Layout>
              <BlogDetail />
            </Layout>
          } 
        />


        <Route
          path="/community"
          element={
            <>
              <Navbar />
              <CommunityPage />
              < Footer />
              <ScrollToTop />
            </>
          }
        />

<Route 
          path="/login" 
          element={
            // <Layout>
              <LoginPage />
            // </Layout>
          } 
        />


        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
