import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import BlogSidebar from "@/components/BlogSidebar";
import BlogShareButtons from "@/components/BlogShareButtons";
import BlogComments from "@/components/BlogComments";
import RelatedPosts from "@/components/RelatedPosts";


import { useParams } from "react-router-dom";

export const BlogDetail = () => {
  const { slug } = useParams(); // Get the slug from the URL
  const blog = {
    id: 2,
    title: "Mastering Tailwind CSS",
    description: "A deep dive into Tailwind CSS.",
    content: `
      <h2 class="text-2xl font-semibold mt-6">Introduction to Tailwind CSS</h2>
      <p>Tailwind CSS is a utility-first CSS framework that allows developers to build modern UIs quickly. Unlike traditional CSS frameworks like Bootstrap, Tailwind focuses on utility classes that let you create designs directly in your HTML.</p>
  
      <h2 class="text-2xl font-semibold mt-6">📌 Why Use Tailwind CSS?</h2>
      <ul class="list-disc pl-5">
        <li>✅ Rapid development with utility classes.</li>
        <li>✅ Fully customizable with configuration files.</li>
        <li>✅ No need to write custom CSS for most use cases.</li>
        <li>✅ Works well with any JavaScript framework (React, Vue, etc.).</li>
      </ul>
  
      <h2 class="text-2xl font-semibold mt-6">🚀 Getting Started with Tailwind CSS</h2>
      <p>To use Tailwind CSS in your project, install it via npm:</p>
      <pre class="bg-gray-100 p-4 rounded-md"><code>npm install -D tailwindcss postcss autoprefixer</code></pre>
      <p>Then, initialize Tailwind:</p>
      <pre class="bg-gray-100 p-4 rounded-md"><code>npx tailwindcss init</code></pre>
  
      <h2 class="text-2xl font-semibold mt-6">📏 Utility-First Approach</h2>
      <p>With Tailwind, you don’t write custom CSS. Instead, you use predefined utility classes. Here’s an example of a responsive button:</p>
      <pre class="bg-gray-100 p-4 rounded-md"><code>
        &lt;button class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"&gt;
          Click Me
        &lt;/button&gt;
      </code></pre>
  
      <h2 class="text-2xl font-semibold mt-6">🎨 Customizing Tailwind</h2>
      <p>You can modify Tailwind’s default styles by editing the <code>tailwind.config.js</code> file. Example:</p>
      <pre class="bg-gray-100 p-4 rounded-md"><code>
        module.exports = {
          theme: {
            extend: {
              colors: {
                primary: "#1DA1F2",
                secondary: "#657786",
              },
            },
          },
        };
      </code></pre>
  
      <h2 class="text-2xl font-semibold mt-6">🔍 Commonly Used Classes</h2>
      <table class="table-auto w-full border border-collapse mt-4">
        <thead>
          <tr class="bg-gray-200">
            <th class="border px-4 py-2">Category</th>
            <th class="border px-4 py-2">Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border px-4 py-2">Margin & Padding</td>
            <td class="border px-4 py-2"><code>m-4, p-2, px-6</code></td>
          </tr>
          <tr>
            <td class="border px-4 py-2">Flexbox</td>
            <td class="border px-4 py-2"><code>flex, flex-col, items-center</code></td>
          </tr>
          <tr>
            <td class="border px-4 py-2">Typography</td>
            <td class="border px-4 py-2"><code>text-lg, font-bold, italic</code></td>
          </tr>
        </tbody>
      </table>
  
      <h2 class="text-2xl font-semibold mt-6">📌 Advanced Concepts</h2>
      <p>Tailwind also supports advanced features like:</p>
      <ul class="list-disc pl-5">
        <li>✏️ Dark mode: <code>dark:bg-gray-900</code></li>
        <li>🔀 Responsive design: <code>sm:text-sm lg:text-lg</code></li>
        <li>🎭 State variants: <code>hover:bg-blue-600 focus:ring</code></li>
        <li>⚡ Animations: <code>transition-all duration-300 ease-in-out</code></li>
      </ul>
  
      <h2 class="text-2xl font-semibold mt-6">🎯 Conclusion</h2>
      <p>Tailwind CSS is a powerful tool for modern web development. By leveraging its utility classes, developers can create fast, responsive, and beautiful UIs with minimal custom CSS.</p>
    `,
    image: "/images/image2.jpeg",
    author: "Jane Smith",
    date: "March 10, 2025",
    category: "Web Development",
    tags: ["CSS", "Tailwind"],
  };
  

  if (!blog) {
    return <h2>Blog not found</h2>;
  }

  console.log("The found slug is: ", slug);


  return (
    <div className="container mx-auto py-10 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Blog Content */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl md:text-4xl font-bold">{blog.title}</h1>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            By {blog.author} • {blog.date}
          </p>

          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-48 md:h-64 object-cover rounded-lg"
            loading="lazy"
          />

          <div className="flex flex-wrap gap-2 text-sm mt-2">
            {blog.tags.map((tag) => (
              <span key={tag} className="bg-gray-200 px-3 py-1 rounded-md text-sm">
                {tag}
              </span>
            ))}
          </div>

          <div
            className="mt-6 leading-relaxed text-gray-800 text-sm md:text-base"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content) }}
          />

          {/* Share Buttons */}
          <BlogShareButtons title={blog.title} />

          {/* Comments Section */}
          <BlogComments postId={blog.id} />
        </div>

        {/* Sidebar: Table of Contents + Related Posts */}
        <div className="hidden lg:block">
          <BlogSidebar content={blog.content} />
          <RelatedPosts category={blog.category} />
        </div>
      </div>
    </div>
  );
};
