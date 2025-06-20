import BlogHeroSection from "@/components/BlogHeroSection";
import BlogList from "@/components/BlogList";
import Sidebar from "@/components/Sidebar";
import CommunitySidebar from "@/components/CommunitySidebar";
import BlogLayout from "@/components/BlogLayout";

import { useEffect, useState } from "react";
import { apiGetRequest } from "@/backend/functions";
import CommunityHeroSection from "@/components/CommunityHeroSection";
import CommunityList from "@/components/CommunityList";

export const CommunityPage = () => {
  const [communityData, setCommunityData] = useState<{ community: any[]; categories: any[]; sidebarContent: string } | null>(null);
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    const fetchCommunityData = async () => {
        const { message, data } = await apiGetRequest("community-data/");
        setCommunityData(data ?? { community: [], categories: [], sidebarContent: "" }); // Use nullish coalescing
        setLoading(false); 
    };

    fetchCommunityData();
}, []);



  if (loading) {
    return <BlogLayout>Loading...</BlogLayout>;
  }


  const communityContent = {
    socialLinks: [
      { id: 1, name: "Facebook", link: "https://facebook.com/amilliontechies", icon: "facebook" },
      { id: 2, name: "LinkedIn", link: "https://www.linkedin.com/company/a-million-techies/", icon: "linkedin" },
      { id: 3, name: "Twitter", link: "https://twitter.com/amilliontechies", icon: "twitter" },
      { id: 4, name: "TikTok", link: "https://tiktok.com/@amilliontechies", icon: "tiktok" },
      { id: 5, name: "Discord", link: "https://discord.gg/amilliontechies", icon: "discord" },
      { id: 6, name: "WhatsApp", link: "https://wa.me/message/amilliontechies", icon: "whatsapp" },
    ],
    tags: ["tech", "community", "developers", "africa", "open source"],
  };
  

  return (
    <BlogLayout>
      <CommunityHeroSection/>
      <div className="mt-10 grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
        <CommunityList posts={communityData?.community || []} categories={communityData?.categories || []} />
        </div>
        <CommunitySidebar content={communityContent}/>
      </div>    
    </BlogLayout>
  );
}
