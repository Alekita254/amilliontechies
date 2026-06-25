import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { apiGetRequest, apiPatchRequest } from "@/backend/functions";
import { useDropzone } from "react-dropzone";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";


export function CommunityDetailEdit() {
  const { slug } = useParams();
  const [blog, setBlog] = useState<any>(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<any>({
    title: "",
    description: "",
    category: "",
    tags: "",
    content: "",
    author_id: "",
    cover_image: null,
  });

  const [authors, setAuthors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [blogId, setBlogId] = useState<number | null>(null);
  const [existingCover, setExistingCover] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiGetRequest(`community/${slug}/`);
        if (res.data) {
          const blog = res.data;
          setBlogId(blog.data.id);
          setFormData({
            title: blog.data.title,
            description: blog.data.description,
            category: blog.data.category,
            tags: blog.data.tags,
            content: blog.data.content,
            author_id: blog.data.author?.id || "",
            cover_image: null,
            created_at: blog.data.created_at,
            views: blog.data.views,
          });
          setExistingCover(blog.data.cover_image || null);
        } else toast.error(res.message || "Failed to load community");
      } catch (err) {
        toast.error("Error fetching community data");
      }

      const authorsRes = await apiGetRequest("authors/");
      if (authorsRes.data?.data) setAuthors(authorsRes.data.data);
      else toast.error("Failed to load authors");

      setLoading(false);
    })();
  }, [slug]);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (value: string) => {
    setFormData((prev: any) => ({ ...prev, content: value }));
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFormData((prev: any) => ({
      ...prev,
      cover_image: acceptedFiles[0] || null,
    }));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!blogId) {
      toast.error("Invalid Community ID");
      return;
    }

    const payload = {
      title: formData.title,
      description: formData.description,
      content: formData.content,
      category: formData.category,
      tags: formData.tags,
      author_id: Number(formData.author_id),
    };

    const dataToSend = new FormData();
    dataToSend.append("data", JSON.stringify(payload));
    if (formData.cover_image) {
      dataToSend.append("cover_image", formData.cover_image);
    }

    try {
      await apiPatchRequest(`community/${slug}/`, dataToSend);
      toast.success("Commmunity updated successfully");
      navigate("/admin/community");
    } catch (err: any) {
      console.error("Update failed:", err.message);
      toast.error("Failed to update blog");
    }
  };

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      [{ font: [] }],
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header", "font", "size", "bold", "italic", "underline",
    "strike", "color", "background", "align", "blockquote",
    "code-block", "list", "bullet", "link", "image"
  ];

  if (loading) return <p className="p-4">Loading blog...</p>;


  return (
    <Card className="mt-6 max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Edit Blog: {formData.title}</CardTitle>
        <p className="text-sm text-muted-foreground">Update your blog content below.</p>

        <p className="text-gray-500 mb-6">
        👁️ {formData.views} views
      </p>
      </CardHeader>
      <CardContent>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Title</Label>
              <Input name="title" value={formData.title} onChange={handleChange} />

            </div>
            <div>
              <Label>Category</Label>
              <Input name="category" value={formData.category} onChange={handleChange} />
            </div>
            <div className="md:col-span-2">
              <Label>Description</Label>
              <Textarea name="description" value={formData.description} onChange={handleChange} />
            </div>
            <div>
              <Label>Tags</Label>
              <Input name="tags" value={formData.tags} onChange={handleChange} />
            </div>
            <div>
              <Label>Author</Label>
              <select
                name="author_id"
                value={formData.author_id}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 py-2 px-3"
                required
              >
                <option value="">— Select Author —</option>
                {authors.map((a) => (
                  <option key={a.id} value={a.id}>{a.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Image Preview */}
          <div {...getRootProps()} className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${isDragActive ? "border-green-500 bg-green-50" : "border-gray-400 bg-white"}`}>
            <input {...getInputProps()} />
            {formData.cover_image ? (
              <div className="text-green-600 font-medium">
                {formData.cover_image.name}
              </div>
            ) : existingCover ? (
              <img src={existingCover} alt="Current Cover" className="mx-auto h-40 object-contain rounded-md" />
            ) : (
              <p className="text-gray-500">📁 Drag & drop new image or click to select</p>
            )}
          </div>

          {/* Content Editor */}
          <div>
            <Label>Content</Label>
            <ReactQuill
              value={formData.content}
              onChange={handleContentChange}
              modules={quillModules}
              formats={quillFormats}
              className="bg-white rounded-md"
            />
          </div>

          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md">
            Update Blog
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
