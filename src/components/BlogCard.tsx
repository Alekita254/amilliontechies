import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

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
    <Card>
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-48 object-cover"
        loading="lazy"
      />

      {/* <Card> */}
        <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
            <CardTitle>{blog.title}</CardTitle>  
        </CardHeader>
        <CardDescription className="text-md mt-2">{blog.description}</CardDescription>
        <CardFooter >
          <Button className="mt-4" onClick={handleReadMore}>Read More</Button>
        </CardFooter>
      </Card>
  );
};

export default BlogCard;
