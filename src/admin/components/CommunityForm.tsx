import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ReactQuill from "react-quill";
import { apiFormDataPostRequest, apiPostRequest, apiGetRequest } from "@/backend/functions";
import "react-quill/dist/quill.snow.css";
import { toast } from "sonner"; 


type Author = {
  id: number;
  name: string;
  email: string;
  bio: string;
};

export function CommunityForm() {
  const [authors, setAuthors] = useState<Author[]>([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    tags: "",
    author_id: "", // Replace with actual user info from context
    content: "",
    cover_image: null as File | null,
  });

  // Fetching all the authors at once
  useEffect(() => {
    (async () => {
      const res = await apiGetRequest("authors/");

      if (res.data?.data) setAuthors(res.data.data);
      else toast.error("Failed to load authors");

    })();
  }, []);

  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  

  const handleContentChange = (value: string) => {
    setFormData((prev) => ({ ...prev, content: value }));
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFormData((prev) => ({
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

    // 2. Build the payload object
    const payload = {
      title: formData.title,
      description: formData.description,
      content: formData.content,
      author_id: Number(formData.author_id),
      category: formData.category,
      tags: formData.tags,
    };

    // 3. Pack into FormData exactly as your backend expects:
    const formToSend = new FormData();
    formToSend.append("data", JSON.stringify(payload)); // <-- ALL fields in one JSON blob
    if (formData.cover_image) {
      formToSend.append("cover_image", formData.cover_image); // <-- file separate
    }

    try {
      const result = await apiFormDataPostRequest("community/", formToSend);
      console.log("Community Event posted successfully:", result);
    //   alert("Blog posted!");
      toast.success("Community Event published successfully!");
      // reset form if desired…
      setFormData({
        title: "",
        description: "",
        category: "",
        tags: "",
        author_id: "",
        content: "",
        cover_image: null,
      });
    } catch (err: any) {
      console.error("Community Event submit error:", err.message);
      toast.error(`Failed to publish a community event: ${err.message}`);
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
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "align",
    "blockquote",
    "code-block",
    "list",
    "bullet",
    "link",
    "image",
  ];

  return (
    <Card className="bg-gray-100 border border-gray-300 rounded-xl shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800">
          📝 Create a New Community Event
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Inputs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-700">Title</Label>
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label className="text-gray-700">Category</Label>
              <Input
                name="category"
                value={formData.category}
                onChange={handleChange}
              />
            </div>
            <div className="md:col-span-2">
              <Label className="text-gray-700">Description</Label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label className="text-gray-700">Tags</Label>
              <Input
                name="tags"
                value={formData.tags}
                onChange={handleChange}
              />
            </div>
           
             <div>
              <Label className="text-gray-700">Author</Label>
              <select
                name="author_id"
                value={formData.author_id}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-green-500 focus:ring-green-500"
              >
                <option value="">— Select Author —</option>
                {authors.map(a => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>
            </div>
          {/* </div> */}

          </div>

          {/* Drag and Drop Image Upload */}
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${
              isDragActive
                ? "border-green-500 bg-green-50"
                : "border-gray-400 bg-white"
            }`}
          >
            <input {...getInputProps()} />
            {formData.cover_image ? (
              <div className="text-green-600 font-medium">
                 {formData.cover_image.name}
              </div>
            ) : (
              <p className="text-gray-500">
                📁 Drag & drop your blog cover image here or click to select
              </p>
            )}
          </div>

          {/* Rich Text Editor */}
          <div>
            <Label className="text-gray-700">Content</Label>
            <ReactQuill
              value={formData.content}
              onChange={handleContentChange}
              theme="snow"
              modules={quillModules}
              formats={quillFormats}
              className="bg-white rounded-md"
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md"
          >
            Publish Community Event
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
