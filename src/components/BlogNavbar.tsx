import { Button } from "@/components/ui/button";

const BlogNavbar = () => {
  return (
    <nav className="w-full bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <h2 className="text-xl font-bold">Tech Blog</h2>
      <div className="space-x-4">
        <Button variant="ghost">Home</Button>
        <Button variant="ghost">Categories</Button>
        <Button variant="ghost">About</Button>
        <Button>Subscribe</Button>
      </div>
    </nav>
  );
};

export default BlogNavbar;
