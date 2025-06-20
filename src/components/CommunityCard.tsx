import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

interface CommunityCardProps {
  post: {
    id: number;
    title: string;
    description: string;
    image: string;
    slug: string;
  };
}

const CommunityCard = ({ post }: CommunityCardProps) => {
  const navigate = useNavigate();

  const handleLearnMore = () => {
    navigate(`/community/${post.slug}`);
  };

  return (
    <Card>
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-48 object-cover"
        loading="lazy"
      />

      <div className="p-4">
        <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
          <CardTitle>{post.title}</CardTitle>
        </CardHeader>
        {/* <h3 className="text-lg font-bold">{post.title}</h3> */}
        {/* <p className="text-gray-600 mt-2">{post.description}</p> */}
        {/* <Button className="mt-4" onClick={handleLearnMore}> */}
        {/* Learn More */}
        {/* </Button> */}
        <CardDescription className="text-md mt-2">
          {post.description}
        </CardDescription>
      </div>
    </Card>
  );
};

export default CommunityCard;
