import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export function BlogForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    category: "",
    tags: "",
    author: "",
    cover_image: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, cover_image: e.target.files?.[0] || null }));
  };

  const handleContentChange = (value: string) => {
    setFormData(prev => ({ ...prev, content: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) data.append(key, value as any);
    });

    console.log("Form submitted:", Object.fromEntries(data.entries()));
    // Later: POST to backend
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">New Blog</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input name="title" value={formData.title} onChange={handleChange} />
          </div>

          <div>
            <Label>Description</Label>
            <Textarea name="description" value={formData.description} onChange={handleChange} />
          </div>

          <div>
            <Label>Content</Label>
            <ReactQuill value={formData.content} onChange={handleContentChange} theme="snow" />
          </div>

          <div>
            <Label>Category</Label>
            <Input name="category" value={formData.category} onChange={handleChange} />
          </div>

          <div>
            <Label>Tags</Label>
            <Input name="tags" value={formData.tags} onChange={handleChange} />
          </div>

          <div>
            <Label>Author</Label>
            <Input name="author" value={formData.author} onChange={handleChange} />
            {/* Later: Use <Select> and fetch authors */}
          </div>

          <div>
            <Label>Cover Image</Label>
            <Input type="file" onChange={handleFileChange} />
          </div>

          <Button type="submit">Submit Blog</Button>
        </form>
      </CardContent>
    </Card>
  );
}
