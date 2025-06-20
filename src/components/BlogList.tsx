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
        <div className="bg-white dark:border-b-slate-700 dark:bg-background flex space-x-4 mb-6">
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <button
                key={index}
                  className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-md text-sm"
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