import BlogCard from "./BlogCard";

interface BlogListProps {
  blogs: {
    id: number;
    title: string;
    description: string;
    image: string;
    category: string;
    slug: string;
  }[];
  categories: string[];
}

const BlogList = ({ blogs = [], categories = [] }: BlogListProps) => {
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
  
        {/* Blog Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.length > 0 ? (
            blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
          ) : (
            <p>No blogs available.</p>
          )}
        </div>
      </div>
    );
  };

export default BlogList;