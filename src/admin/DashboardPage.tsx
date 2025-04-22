import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiGetRequest } from "@/backend/functions";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { StatsGrid } from "./components/StatsCard";
import { GraphCard } from "./components/GraphCard";
import { BlogSummary } from "./components/BlogSummary";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [blogData, setBlogData] = useState(null);
  const [eventData, setEventData] = useState(null);
  const [blogs, setBlogs] = useState([]);

  // useEffect(() => { 
  //   const isLoggedIn = localStorage.getItem("user");
  //   if (!isLoggedIn) return navigate("/admin/login");

  //   const fetchDashboardStats = async () => {
  //     const res = await apiGetRequest("dashboard/stats/");
  //     if (res.data?.data) {
  //       const stats = res.data.data;

  //       // Monthly blog chart data
  //       const monthlyLabels = Object.keys(stats.monthly_blog_posts);
  //       const monthlyCounts = Object.values(stats.monthly_blog_posts);

  //       setBlogData({
  //         labels: monthlyLabels,
  //         datasets: [
  //           {
  //             label: "Blog Posts",
  //             data: monthlyCounts,
  //             backgroundColor: "#34D399",
  //           },
  //         ],
  //       });

  //       // Community pie chart data
  //       const communityLabels = stats.community_distribution.map(item => item.category);
  //       const communityCounts = stats.community_distribution.map(item => item.count);

  //       setEventData({
  //         labels: communityLabels,
  //         datasets: [
  //           {
  //             label: "Events",
  //             data: communityCounts,
  //             backgroundColor: ["#60A5FA", "#FBBF24", "#34D399"],
  //           },
  //         ],
  //       });

  //       // Latest 5 blogs
  //       setBlogs(
  //         stats.latest_blogs.map(blog => ({
  //           title: blog.title,
  //           author: blog.author?.name,
  //           views: blog.views,
  //           published: blog.date.slice(0, 10),
  //         }))
  //       );

  //       setLoading(false);
  //     }
  //   };

  //   fetchDashboardStats();
  // }, [navigate]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("user");
    if (!isLoggedIn) {
      navigate("/admin/login");
      return;
    }
  
    const fetchDashboardStats = async () => {
      try {
        const res = await apiGetRequest("dashboard/stats/");
        if (res.data?.data) {
          const stats = res.data.data;
  
          // Monthly blog chart data
          const monthlyLabels = Object.keys(stats.monthly_blog_posts);
          const monthlyCounts = Object.values(stats.monthly_blog_posts);
  
          setBlogData({
            labels: monthlyLabels,
            datasets: [
              {
                label: "Blog Posts",
                data: monthlyCounts,
                backgroundColor: "#34D399",
              },
            ],
          });
  
          // Community pie chart data
          const communityLabels = stats.community_distribution.map(item => item.category);
          const communityCounts = stats.community_distribution.map(item => item.count);
  
          setEventData({
            labels: communityLabels,
            datasets: [
              {
                label: "Events",
                data: communityCounts,
                backgroundColor: ["#60A5FA", "#FBBF24", "#34D399"],
              },
            ],
          });
  
          // Latest 5 blogs
          setBlogs(
            stats.latest_blogs.map(blog => ({
              title: blog.title,
              author: blog.author?.name,
              views: blog.views,
              published: blog.date.slice(0, 10),
            }))
          );
  
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };
  
    fetchDashboardStats();
  }, [navigate]);
  

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-lg text-gray-600">Loading dashboard...</h2>
      </div>
    );
  }

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
      <BlogSummary data={blogs} />
    </div>
  );
}
