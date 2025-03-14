import Scrollspy from "react-scrollspy";

const BlogSidebar = ({ content }: { content: string }) => {
  const headings = content.match(/<h2[^>]*>(.*?)<\/h2>/g)?.map((h, index) => ({
    id: `heading-${index}`,
    title: h.replace(/<[^>]+>/g, ""),
  })) || [];

  return (
    <div className="fixed right-4 top-20 w-48">
      <h3 className="font-semibold text-lg">On This Page</h3>
      <Scrollspy items={headings.map((h) => h.id)} currentClassName="text-blue-600 font-bold">
        {headings.map((h) => (
          <a key={h.id} href={`#${h.id}`} className="block py-1 text-gray-700 hover:text-blue-500">
            {h.title}
          </a>
        ))}
      </Scrollspy>
    </div>
  );
};

export default BlogSidebar;
