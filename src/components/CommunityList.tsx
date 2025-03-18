import CommunityCard from "./CommunityCard";

interface CommunityListProps {
  posts: {
    id: number;
    title: string;
    description: string;
    image: string;
    category: string;
    slug: string;
  }[];
  categories: string[];
}

const CommunityList = ({ posts = [], categories = [] }: CommunityListProps) => {
  return (
    <div>
      {/* Categories Filter */}
      <div className="flex space-x-4 mb-6">
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <button
              key={index}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              {category}
            </button>
          ))
        ) : (
          <p>No categories available.</p>
        )}
      </div>

      {/* Community Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.length > 0 ? (
          posts.map((post) => <CommunityCard key={post.id} post={post} />)
        ) : (
          <p>No community posts available.</p>
        )}
      </div>
    </div>
  );
};

export default CommunityList;