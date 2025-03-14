import BlogHeroSection from "@/components/BlogHeroSection";
import BlogList from "@/components/BlogList";
import Sidebar from "@/components/Sidebar";
import BlogLayout from "@/components/BlogLayout";

const blogData = {
    categories: ["Technology", "AI", "Web Development", "Cybersecurity"],
    blogs: [
      {
        id: 1,
        title: "The Rise of AI in Web Development",
        description: "How AI is shaping the future of web development.",
        image: "/images/image1.jpeg",
        category: "AI",
      },
      {
        id: 2,
        title: "Mastering Tailwind CSS",
        description: "A deep dive into Tailwind CSS for modern UI design.",
        image: "/images/image2.jpeg",
        category: "Web Development",
      },
      {
        id: 3,
        title: "Understanding Cybersecurity in 2025",
        description: "Key trends in cybersecurity and how to stay protected.",
        image: "/images/image3.jpeg",
        category: "Cybersecurity",
      },
    ],
    sidebarContent: {
      popularPosts: [
        { id: 1, title: "React Performance Optimization", link: "#" },
        { id: 2, title: "Understanding Next.js 14 Features", link: "#" },
      ],
      tags: ["React", "Next.js", "Vite", "JavaScript", "CSS"],
    },
  };

export const BlogPage = () => {
  return (
    <BlogLayout>
      <BlogHeroSection />
      <div className="mt-10 grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
        <BlogList blogs={blogData?.blogs || []} categories={blogData?.categories || []} />
        </div>
        <Sidebar content={blogData.sidebarContent} />
      </div>
    </BlogLayout>
  );
}
