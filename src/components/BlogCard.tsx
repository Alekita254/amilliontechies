import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface BlogCardProps {
  blog: {
    id: number;
    title: string;
    description: string;
    image: string;
    slug: string;
  };
}

const BlogCard = ({ blog }: BlogCardProps) => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate(`/blog/${blog.slug}`);
  };

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden">
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-48 object-cover"
        loading="lazy"
      />

      <div className="p-4">
        <h3 className="text-lg font-bold">{blog.title}</h3>
        <p className="text-gray-600 mt-2">{blog.description}</p>
        <Button className="mt-4" onClick={handleReadMore}>Read More</Button>
      </div>
    </div>
  );
};

export default BlogCard;
