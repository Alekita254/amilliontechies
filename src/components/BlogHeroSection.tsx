import { Button } from "@/components/ui/button";

const BlogHeroSection = () => {
  return (
    <section className="w-full bg-gray-900 text-white py-16 px-6 rounded-xl">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold">Explore the Latest Tech Trends</h1>
        <p className="mt-4 text-lg text-gray-300">
          Stay updated with the latest insights, tutorials, and trends in the
          tech world.
        </p>
        <Button className="mt-6">Read More</Button>
      </div>
    </section>
  );
};

export default BlogHeroSection;
