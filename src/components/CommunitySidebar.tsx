import { FaFacebook, FaLinkedin, FaTwitter, FaTiktok, FaDiscord, FaWhatsapp } from "react-icons/fa";

interface CommunitySidebarProps {
  content: {
    socialLinks: { id: number; name: string; link: string; icon: string }[];
    tags: string[];
  };
}

const CommunitySidebar = ({ content }: CommunitySidebarProps) => {
  // Function to render the appropriate icon based on the platform name
  const renderIcon = (icon: string) => {
    switch (icon) {
      case "facebook":
        return <FaFacebook className="w-8 h-8 text-blue-600 dark:text-blue-400" />;
      case "linkedin":
        return <FaLinkedin className="w-8 h-8 text-blue-500 dark:text-blue-300" />;
      case "twitter":
        return <FaTwitter className="w-8 h-8 text-sky-400 dark:text-sky-300" />;
      case "tiktok":
        return <FaTiktok className="w-8 h-8 text-black dark:text-white" />;
      case "discord":
        return <FaDiscord className="w-8 h-8 text-indigo-500 dark:text-indigo-300" />;
      case "whatsapp":
        return <FaWhatsapp className="w-8 h-8 text-green-500 dark:text-green-400" />;
      default:
        return null;
    }
  };

  return (
    <aside className="w-full bg-white dark:bg-zinc-900 shadow-md rounded-lg p-4 border border-gray-200 dark:border-zinc-700">
      {/* Social Media Links */}
      <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Join Our Community</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {content.socialLinks.map((link) => (
          <a
            key={link.id}
            href={link.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-zinc-800 rounded-lg shadow-sm hover:shadow-md transition-shadow hover:bg-green-50 dark:hover:bg-green-900 border border-gray-200 dark:border-zinc-700"
          >
            <div className="mb-3">{renderIcon(link.icon)}</div>
            <span className="text-lg font-medium text-gray-700 dark:text-gray-200">{link.name}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">Join us</span>
          </a>
        ))}
      </div>

      {/* Tags */}
      <h3 className="text-xl font-semibold mt-6 mb-4 text-gray-900 dark:text-white">Tags</h3>
      <div className="flex flex-wrap gap-2">
        {content.tags.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-md text-sm hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>
    </aside>
  );
};

export default CommunitySidebar;