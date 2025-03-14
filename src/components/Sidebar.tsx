// const Sidebar = () => {
//     return (
//       <aside className="w-full md:w-1/3 bg-white shadow-md rounded-lg p-4">
//         <h3 className="text-xl font-semibold mb-4">Popular Posts</h3>
//         <ul className="space-y-3">
//           <li className="text-blue-500 hover:underline cursor-pointer">
//             How AI is Changing Web Development
//           </li>
//           <li className="text-blue-500 hover:underline cursor-pointer">
//             Mastering Tailwind CSS in 2025
//           </li>
//         </ul>
//       </aside>
//     );
//   };
  
//   export default Sidebar;
  
interface SidebarProps {
    content: {
      popularPosts: { id: number; title: string; link: string }[];
      tags: string[];
    };
  }
  
  const Sidebar = ({ content }: SidebarProps) => {
    return (
      <aside className="w-full md:w-1/3 bg-white shadow-md rounded-lg p-4">
        {/* Popular Posts */}
        <h3 className="text-xl font-semibold mb-4">Popular Posts</h3>
        <ul className="space-y-3">
          {content.popularPosts.map((post) => (
            <li key={post.id} className="text-blue-500 hover:underline cursor-pointer">
              {post.title}
            </li>
          ))}
        </ul>
  
        {/* Tags */}
        <h3 className="text-xl font-semibold mt-6 mb-4">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {content.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </aside>
    );
  };
  
  export default Sidebar;
  