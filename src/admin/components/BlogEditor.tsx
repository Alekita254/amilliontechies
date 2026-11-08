import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import ReactQuill from "react-quill-new";
import { ArrowLeft, ExternalLink, ImagePlus, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { apiFormDataPatchRequest, apiFormDataPostRequest, apiGetRequest } from "@/backend/functions";
import { cn } from "@/lib/utils";
import { errorText } from "../lib/errors";
import { Field, NativeSelect } from "./Field";
import { PageHeader } from "./PageHeader";
import { Pill } from "./Pill";
import "react-quill-new/dist/quill.snow.css";
import "../admin.css";

type Author = { id: number; name: string };

const EMPTY = { title: "", description: "", category: "", tags: "", author_id: "", content: "" };

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote", "code-block"],
    ["link", "image"],
    ["clean"],
  ],
};

const hasText = (html: string) => /<img/.test(html) || html.replace(/<[^>]*>/g, "").trim().length > 0;

/** Create (no slug) or edit (slug) a blog post. */
export function BlogEditor({ slug }: { slug?: string }) {
  const isEdit = !!slug;
  const navigate = useNavigate();

  const [form, setForm] = useState(EMPTY);
  const [cover, setCover] = useState<File | null>(null);
  const [existingCover, setExistingCover] = useState<string | null>(null);
  const [views, setViews] = useState<number | null>(null);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    (async () => {
      const authorsRes = await apiGetRequest("authors/");
      if (authorsRes.data?.data) setAuthors(authorsRes.data.data);
      else toast.error("Couldn't load authors");

      if (slug) {
        const res = await apiGetRequest(`blogs/${slug}/`);
        const b = res.data?.data;
        if (b) {
          setForm({
            title: b.title ?? "",
            description: b.description ?? "",
            category: b.category ?? "",
            tags: b.tags ?? "",
            author_id: b.author?.id ? String(b.author.id) : "",
            content: b.content ?? "",
          });
          setExistingCover(b.cover_image || null);
          setViews(b.views ?? 0);
        } else {
          toast.error(res.message || "Couldn't load this blog");
        }
        setLoading(false);
      }
    })();
  }, [slug]);

  const preview = useMemo(() => (cover ? URL.createObjectURL(cover) : null), [cover]);
  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);

  const set = (name: string, value: string) => {
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((e) => ({ ...e, [name]: "" }));
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    set(e.target.name, e.target.value);

  const onDrop = useCallback((files: File[]) => setCover(files[0] || null), []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = "Add a title";
    if (!form.description.trim()) e.description = "Add a short description";
    if (!form.category.trim()) e.category = "Add a category";
    if (!form.tags.trim()) e.tags = "Add at least one tag";
    if (!form.author_id) e.author_id = "Choose an author";
    if (!hasText(form.content)) e.content = "Write some content";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix the highlighted fields");
      return;
    }
    setSaving(true);
    try {
      const fields = { ...form, author_id: Number(form.author_id) };
      if (isEdit) {
        // Plain multipart fields: the API's update reads them directly.
        const fd = new FormData();
        Object.entries(fields).forEach(([k, v]) => fd.append(k, String(v)));
        if (cover) fd.append("cover_image", cover);
        await apiFormDataPatchRequest(`blogs/${slug}/`, fd);
        toast.success("Blog updated");
      } else {
        // Create expects every field as one JSON blob, plus the file.
        const fd = new FormData();
        fd.append("data", JSON.stringify(fields));
        if (cover) fd.append("cover_image", cover);
        await apiFormDataPostRequest("blogs/", fd);
        toast.success("Blog published");
      }
      navigate("/admin/blog");
    } catch (err) {
      toast.error(errorText(err, "Couldn't save the blog"));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="mx-auto h-[32rem] max-w-6xl animate-pulse rounded-xl bg-muted" />;

  const shownCover = preview || existingCover;

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <Link to="/admin/blog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to blogs
      </Link>

      <PageHeader
        title={isEdit ? "Edit blog" : "New blog"}
        description={isEdit ? "Update the post and save your changes." : "Write a post and publish it to the site."}
        action={
          isEdit && (
            <a href={`/blog/${slug}`} target="_blank" rel="noreferrer">
              <Button variant="outline">
                <ExternalLink className="mr-2 h-4 w-4" /> View on site
              </Button>
            </a>
          )
        }
      />

      <form onSubmit={submit} className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardContent className="space-y-5 p-6">
              <Field label="Title" htmlFor="title" error={errors.title}>
                <Input id="title" name="title" value={form.title} onChange={onChange} placeholder="A clear, specific title" />
              </Field>
              <Field label="Description" htmlFor="description" error={errors.description} hint="A one or two sentence summary shown in blog lists">
                <Textarea id="description" name="description" rows={3} value={form.description} onChange={onChange} />
              </Field>
              <Field label="Content" error={errors.content}>
                <ReactQuill
                  theme="snow"
                  className="blog-editor"
                  value={form.content}
                  onChange={(v) => set("content", v)}
                  modules={quillModules}
                  placeholder="Start writing…"
                />
              </Field>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Cover image</CardTitle>
            </CardHeader>
            <CardContent>
              {shownCover ? (
                <div className="relative overflow-hidden rounded-lg border">
                  <img src={shownCover} alt="Cover" className="aspect-video w-full object-cover" />
                  <div className="absolute right-2 top-2 flex gap-1.5">
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <Button type="button" size="sm" variant="secondary">Replace</Button>
                    </div>
                    {cover && (
                      <Button type="button" size="icon" variant="secondary" className="h-9 w-9" onClick={() => setCover(null)} title="Undo">
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
                <div
                  {...getRootProps()}
                  className={cn(
                    "flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed px-4 py-10 text-center transition-colors",
                    isDragActive ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                  )}
                >
                  <input {...getInputProps()} />
                  <ImagePlus className="h-6 w-6 text-muted-foreground" />
                  <p className="text-sm font-medium">Drop an image or click to browse</p>
                  <p className="text-xs text-muted-foreground">Wide images (16:9) look best</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Field label="Author" htmlFor="author_id" error={errors.author_id}>
                <NativeSelect id="author_id" name="author_id" value={form.author_id} onChange={onChange}>
                  <option value="">Select an author…</option>
                  {authors.map((a) => (
                    <option key={a.id} value={a.id}>{a.name}</option>
                  ))}
                </NativeSelect>
              </Field>
              <Field label="Category" htmlFor="category" error={errors.category}>
                <Input id="category" name="category" value={form.category} onChange={onChange} placeholder="e.g. Tutorials" />
              </Field>
              <Field label="Tags" htmlFor="tags" error={errors.tags} hint="Separate with commas">
                <Input id="tags" name="tags" value={form.tags} onChange={onChange} placeholder="react, python, career" />
              </Field>
              {isEdit && views !== null && <Pill tone="blue">{views} views</Pill>}
            </CardContent>
          </Card>
        </div>

        <div className="sticky bottom-0 -mx-4 flex justify-end gap-2 border-t bg-background/90 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 lg:col-span-3 lg:-mx-8 lg:px-8">
          <Button type="button" variant="outline" onClick={() => navigate("/admin/blog")} disabled={saving}>
            Cancel
          </Button>
          <Button type="submit" disabled={saving}>
            {saving ? "Saving…" : isEdit ? "Save changes" : "Publish"}
          </Button>
        </div>
      </form>
    </div>
  );
}
