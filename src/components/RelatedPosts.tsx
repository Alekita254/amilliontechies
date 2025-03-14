import { Link } from "react-router-dom";

const RelatedPosts = ({ category }: { category: string }) => {
  // Sample blog posts data (replace with API data)
  const allPosts = [
    { id: 1, slug: "rise-of-ai", title: "The Rise of AI", category: "AI" },
    { id: 2, slug: "mastering-tailwind", title: "Mastering Tailwind CSS", category: "Web Development" },
    { id: 3, slug: "cybersecurity-2025", title: "Cybersecurity in 2025", category: "Cybersecurity" },
    { id: 4, slug: "ai-in-healthcare", title: "AI in Healthcare", category: "AI" },
  ];

  const relatedPosts = allPosts.filter((post) => post.category === category).slice(0, 3);

  return (
    <div className="mt-10">
      <h3 className="text-xl font-semibold">Related Posts</h3>
      <ul className="mt-4">
        {relatedPosts.map((post) => (
          <li key={post.id} className="mb-2">
            <Link to={`/blog/${post.slug}`} className="text-blue-600 hover:underline">
                 {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RelatedPosts;
