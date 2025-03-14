const BlogShareButtons = ({ title }: { title: string }) => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const encodedTitle = encodeURIComponent(title);
  
    return (
      <div className="flex space-x-3 mt-6">
        <a href={`https://twitter.com/share?url=${url}&text=${encodedTitle}`} target="_blank" className="text-blue-500">
          Share on Twitter
        </a>
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} target="_blank" className="text-blue-700">
          Share on Facebook
        </a>
      </div>
    );
  };
  
  export default BlogShareButtons;
  