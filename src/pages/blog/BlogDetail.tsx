import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import BlogSidebar from "@/components/BlogSidebar";
import BlogShareButtons from "@/components/BlogShareButtons";
import BlogComments from "@/components/BlogComments";
import RelatedPosts from "@/components/RelatedPosts";
import { apiGetRequest } from "@/backend/functions";
import { useParams } from "react-router-dom";
import "react-quill-new/dist/quill.snow.css";

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
          tags: data.data.tags
            ? data.data.tags.split(",").map((tag) => tag.trim())
            : [],
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
    <div className="w-full py-16 px-4 lg:px-12 border-b bg-white dark:border-b-slate-700 dark:bg-background">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 gap-8">
          {/* Main Blog Content - Full Width */}
          <div className="w-full">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              {blogDetail?.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm md:text-base">
              By {blogDetail?.author?.name} •{" "}
              {new Date(blogDetail?.date).toDateString()}
            </p>

            <img
              src={blogDetail?.cover_image}
              alt={blogDetail?.title}
              className="w-full h-60 md:h-[400px] object-cover rounded-lg"
              loading="lazy"
            />

            <div className="flex flex-wrap gap-2 text-sm mt-4 mb-8">
              {blogDetail?.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-md text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="ql-snow mt-8">
              <div
                className="ql-editor text-gray-900 dark:text-gray-100 prose prose-lg dark:prose-invert prose-headings:mt-4 prose-p:mb-3 prose-img:rounded-lg prose-a:text-green-600 prose-a:underline max-w-full"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(blogDetail?.content),
                }}
              />
            </div>

            <div className="mt-12">
              <BlogShareButtons slug={blogDetail?.slug} />
            </div>

            <div className="mt-12">
              <BlogComments postId={blogDetail?.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
