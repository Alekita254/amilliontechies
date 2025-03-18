import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

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
    <div className="bg-white shadow-lg rounded-xl overflow-hidden">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-48 object-cover"
        loading="lazy"
      />

      <div className="p-4">
        <h3 className="text-lg font-bold">{post.title}</h3>
        <p className="text-gray-600 mt-2">{post.description}</p>
        {/* <Button className="mt-4" onClick={handleLearnMore}> */}
          {/* Learn More */}
        {/* </Button> */}
      </div>
    </div>
  );
};

export default CommunityCard;