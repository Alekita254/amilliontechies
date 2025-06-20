import { useNavigate } from "react-router-dom";
import { Card } from "./ui/card";

interface SidebarProps {
  content: {
    popularPosts: { id: number; title: string; link: string; slug: string }[];
    tags: string[];
  };
}

const Sidebar = ({ content }: SidebarProps) => {
  const navigate = useNavigate();
  const handleLink = (post: { id: number; title: string; link: string; slug: string }) => {
    // You can also navigate or do something else here
    navigate(`/blog/${post.slug}`)
  };

  return (
    <aside className="w-full bg-white shadow-md rounded-lg p-4 border-b bg-white dark:border-b-slate-700 dark:bg-background">
      {/* Popular Posts */}
      <h3 className="text-xl font-semibold mb-4">Popular Posts</h3>
      <ul className="space-y-3">
        {content.popularPosts.map((post) => (
          <li
            key={post.id}
            onClick={() => handleLink(post)}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            {post.title}
          </li>
        ))}
      </ul>

      {/* Tags */}
      <h3 className="text-xl font-semibold mt-6 mb-4">Tags</h3>
      <div className="flex flex-wrap gap-2">
        {content.tags.map((tag, index) => (
          <Card
            key={index}
                  className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-md text-sm"
          >
            {tag}
          </Card>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
