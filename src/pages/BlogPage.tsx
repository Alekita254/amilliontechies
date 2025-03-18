import BlogHeroSection from "@/components/BlogHeroSection";
import BlogList from "@/components/BlogList";
import Sidebar from "@/components/Sidebar";
import BlogLayout from "@/components/BlogLayout";

import { useEffect, useState } from "react";
import { apiGetRequest } from "@/backend/functions";

export const BlogPage = () => {
  const [blogData, setBlogData] = useState<{ blogs: any[]; categories: any[]; sidebarContent: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogData = async () => {
      const { message, data } = await apiGetRequest("blog-data/");
      console.log("The API response is: ", message, data);
  
      // Ensure data is always valid
      setBlogData(data ?? { blogs: [], categories: [], sidebarContent: "" });
      
      setLoading(false); 
    };
  
    fetchBlogData();
  }, []);
  


  if (loading) {
    return <BlogLayout>Loading...</BlogLayout>;
  }

  return (
    <BlogLayout>
      <BlogHeroSection />
      <div className="mt-10 grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
        <BlogList blogs={blogData?.blogs || []} categories={blogData?.categories || []} />
        </div>
        {/* <Sidebar content={blogData.sidebarContent} /> */}
        <Sidebar 
          content={typeof blogData.sidebarContent === "string" ? 
            { popularPosts: [], tags: [] } : 
            blogData.sidebarContent} 
        />
      </div>
    </BlogLayout>
  );
}
