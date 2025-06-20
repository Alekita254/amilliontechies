import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const BlogLayout = ({ children }: LayoutProps) => {
  return (
    <div className="bg-white dark:border-b-slate-700 dark:bg-background min-h-screen bg-gray-100 ">
      <main className=" mx-auto p-6">{children}</main>
    </div>
  );
};

export default BlogLayout;
