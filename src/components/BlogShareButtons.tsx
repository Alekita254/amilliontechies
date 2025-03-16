  
import { FaFacebook, FaTwitter, FaLinkedin, FaCopy } from "react-icons/fa";

const BlogShareButtons = ({ slug }) => {
  const blogUrl = `${window.location.origin}/blog/${slug}`;

  console.log("This is the blog URL: ", blogUrl);

  const handleShare = (platform) => {
    let shareUrl = "";
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(blogUrl)}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(blogUrl)}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(blogUrl)}`;
        break;
      default:
        break;
    }
    if (shareUrl) {
      window.open(shareUrl, "_blank", "noopener,noreferrer");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(blogUrl);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="flex gap-3 mt-4">
      <button onClick={() => handleShare("facebook")} className="p-2 bg-blue-600 text-white rounded-full">
        <FaFacebook size={20} />
      </button>
      <button onClick={() => handleShare("twitter")} className="p-2 bg-blue-400 text-white rounded-full">
        <FaTwitter size={20} />
      </button>
      <button onClick={() => handleShare("linkedin")} className="p-2 bg-blue-700 text-white rounded-full">
        <FaLinkedin size={20} />
      </button>
      <button onClick={copyToClipboard} className="p-2 bg-gray-600 text-white rounded-full">
        <FaCopy size={20} />
      </button>
    </div>
  );
};

export default BlogShareButtons;
