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
        return <FaFacebook className="w-8 h-8 text-blue-600" />;
      case "linkedin":
        return <FaLinkedin className="w-8 h-8 text-blue-500" />;
      case "twitter":
        return <FaTwitter className="w-8 h-8 text-sky-400" />;
      case "tiktok":
        return <FaTiktok className="w-8 h-8 text-black" />;
      case "discord":
        return <FaDiscord className="w-8 h-8 text-indigo-500" />;
      case "whatsapp":
        return <FaWhatsapp className="w-8 h-8 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <aside className="w-full bg-white shadow-md rounded-lg p-4">
      {/* Social Media Links */}
      <h3 className="text-xl font-semibold mb-4">Join Our Community</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {content.socialLinks.map((link) => (
          <a
            key={link.id}
            href={link.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow hover:bg-green-50 border border-gray-200"
          >
            <div className="mb-3">{renderIcon(link.icon)}</div>
            <span className="text-lg font-medium text-gray-700">{link.name}</span>
            <span className="text-sm text-gray-500">Join us</span>
          </a>
        ))}
      </div>

      {/* Tags */}
      <h3 className="text-xl font-semibold mt-6 mb-4">Tags</h3>
      <div className="flex flex-wrap gap-2">
        {content.tags.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-green-100 text-green-700 rounded-md text-sm hover:bg-green-200 transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>
    </aside>
  );
};

export default CommunitySidebar;