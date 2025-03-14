import { Button } from "@/components/ui/button";

interface BlogCardProps {
  blog: {
    id: number;
    title: string;
    description: string;
    image: string;
  };
}

const BlogCard = ({ blog }: BlogCardProps) => {
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
        <Button className="mt-4">Read More</Button>
      </div>
    </div>
  );
};

export default BlogCard;
