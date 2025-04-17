import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { StatsGrid } from "./components/StatsCard";
import { GraphCard } from "./components/GraphCard";
import { BlogSummary } from "./components/BlogSummary";

export default function DashboardPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("user");
    if (!isLoggedIn) navigate("/admin/login");
  }, [navigate]);

  const blogData = {
    labels: ["Jan", "Feb", "Mar", "Apr"],
    datasets: [
      {
        label: "Blog Posts",
        data: [10, 20, 15, 30],
        backgroundColor: "#34D399",
      },
    ],
  };

  const eventData = {
    labels: ["Webinars", "Meetups", "Workshops"],
    datasets: [
      {
        label: "Events",
        data: [12, 7, 5],
        backgroundColor: ["#60A5FA", "#FBBF24", "#34D399"],
      },
    ],
  };

  const blogs = [
    { title: "AI in Agri", author: "Jane Doe", views: 1200, published: "2024-03-10" },
    { title: "Safety Tools", author: "John Smith", views: 980, published: "2024-03-12" },
    { title: "Market Access", author: "Alice W.", views: 875, published: "2024-04-01" },
    { title: "Smart Cutters", author: "David K.", views: 790, published: "2024-03-28" },
    { title: "Farming Tech", author: "Eve N.", views: 720, published: "2024-04-04" },
  ];


  return (
      <div className="p-6 space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard</h2>
          <p className="text-sm text-gray-500">Overview of site activity and performance</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GraphCard title="Monthly Blog Posts" type="bar" data={blogData} />
          <GraphCard title="Event Distribution" type="pie" data={eventData} />
        </div>
        {/* <ProjectsTable /> */}
        {/* You can add BlogsTable and EventsTable below */}
        <BlogSummary data={blogs} />
      </div>
  );
}