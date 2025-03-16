
import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import BlogSidebar from "@/components/BlogSidebar";
import BlogShareButtons from "@/components/BlogShareButtons";
import BlogComments from "@/components/BlogComments";
import RelatedPosts from "@/components/RelatedPosts";
import { apiGetRequest } from "@/backend/functions";
import { useParams } from "react-router-dom";

export const BlogDetail = () => {
  const { slug } = useParams(); 
  const [blogDetail, setBlogDetail] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => { 
    const fetchBlogDetail = async () => { 
      try {
        const { message, data } = await apiGetRequest(`blogs/${slug}`);
  
        // Convert the tags string into an array
        const processedData = {
          ...data.data,
          tags: data.data.tags ? data.data.tags.split(",").map(tag => tag.trim()) : [],
        };
  
        setBlogDetail(processedData);
      } catch (error) {
        console.error("Error fetching blog details:", error);
        setBlogDetail(null);
      } finally {
        setLoading(false);
      }
    };
  
    fetchBlogDetail();
  }, [slug]);


  if (loading) {
    return <h2>Loading...</h2>;
  }

  console.log("This is the blog details: ", blogDetail);

  if (!blogDetail) {
    return <h2>Blog not found</h2>;
  }

  return (
    <div className="container mx-auto py-10 px-4 bg-gray-150">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Blog Content */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl md:text-4xl font-bold">{blogDetail?.title}</h1>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            By {blogDetail?.author?.name} • {new Date(blogDetail?.date).toDateString()}
          </p>

          <img
            src={blogDetail?.cover_image}
            alt={blogDetail?.title}
            className="w-full h-48 md:h-64 object-cover rounded-lg"
            loading="lazy"
          />

          <div className="flex flex-wrap gap-2 text-sm mt-2">
            {blogDetail?.tags.map((tag, index) => (
              <span key={index} className="bg-gray-200 px-3 py-1 rounded-md text-sm">
                {tag}
              </span>
            ))}
          </div>

          <div
            className="mt-6 leading-relaxed text-gray-800 text-sm md:text-base"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blogDetail?.content) }}
          />

          {/* Share Buttons */}
          <BlogShareButtons slug={blogDetail?.slug} />

          {/* Comments Section */}
          <BlogComments postId={blogDetail?.id} />
        </div>

        {/* Sidebar & Related Posts (Rendered only if content exists) */}
        <div className="hidden lg:block">
          {blogDetail?.content && <BlogSidebar content={blogDetail?.content} />}
          <RelatedPosts category={blogDetail?.category} />
        </div>
      </div>
    </div>
  );
};
