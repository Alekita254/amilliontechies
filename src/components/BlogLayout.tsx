import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const BlogLayout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto p-6">{children}</main>
    </div>
  );
};

export default BlogLayout;
