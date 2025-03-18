import BlogHeroSection from "@/components/BlogHeroSection";
import BlogList from "@/components/BlogList";
import Sidebar from "@/components/Sidebar";
import CommunitySidebar from "@/components/CommunitySidebar";
import BlogLayout from "@/components/BlogLayout";

import { useEffect, useState } from "react";
import { apiGetRequest } from "@/backend/functions";
import CommunityHeroSection from "@/components/CommunityHeroSection";

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
      {
        id: 1,
        name: "Facebook",
        link: "https://facebook.com/community",
        icon: "facebook",
      },
      {
        id: 2,
        name: "LinkedIn",
        link: "https://linkedin.com/community",
        icon: "linkedin",
      },
      {
        id: 3,
        name: "Twitter",
        link: "https://twitter.com/community",
        icon: "twitter",
      },
      {
        id: 4,
        name: "TikTok",
        link: "https://tiktok.com/community",
        icon: "tiktok",
      },
      {
        id: 5,
        name: "Discord",
        link: "https://discord.com/community",
        icon: "discord",
      },
      {
        id: 6,
        name: "WhatsApp",
        link: "https://whatsapp.com/community",
        icon: "whatsapp",
      },
      
    ],
    tags: ["Events", "Networking", "Workshops", "Social Media", "Community"],
  };

  return (
    <BlogLayout>
      <CommunityHeroSection/>
      <div className="mt-10 grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
        <BlogList blogs={communityData?.community || []} categories={communityData?.categories || []} />
        </div>
        <CommunitySidebar content={communityContent}/>
      </div>    
    </BlogLayout>
  );
}
