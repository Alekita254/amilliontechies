import { useEffect, useMemo, useState } from "react";
import { Camera } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { apiFormDataPatchRequest, apiFormDataPostRequest } from "@/backend/functions";
import { errorText } from "../lib/errors";
import { Field } from "./Field";
import type { Author } from "./AuthorList";

export function AuthorForm({
  author,
  onSuccess,
  onCancel,
}: {
  author?: Author | null;
  onSuccess?: () => void;
  onCancel?: () => void;
}) {
  const [form, setForm] = useState({ name: "", email: "", bio: "" });
  const [photo, setPhoto] = useState<File | null>(null);
  const [existingPic, setExistingPic] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm({ name: author?.name || "", email: author?.email || "", bio: author?.bio || "" });
    setExistingPic(author?.profile_picture || null);
    setPhoto(null);
  }, [author]);

  const preview = useMemo(() => (photo ? URL.createObjectURL(photo) : null), [photo]);
  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = new FormData();
      payload.append("name", form.name);
      payload.append("email", form.email);
      payload.append("bio", form.bio);
      if (photo) payload.append("profile_picture", photo);

      if (author) await apiFormDataPatchRequest(`authors/${author.id}/`, payload);
      else await apiFormDataPostRequest("authors/", payload);

      toast.success(`Author ${author ? "updated" : "created"}`);
      onSuccess?.();
    } catch (err) {
      toast.error(errorText(err, "Couldn't save the author"));
    } finally {
      setSaving(false);
    }
  };

  const shown = preview || existingPic;

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="flex items-center gap-4">
        <label className="group relative flex h-20 w-20 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed bg-muted/50 transition-colors hover:bg-muted">
          {shown ? (
            <img src={shown} alt="" className="h-full w-full object-cover" />
          ) : (
            <Camera className="h-6 w-6 text-muted-foreground" />
          )}
          <input
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(e) => setPhoto(e.target.files?.[0] ?? null)}
          />
        </label>
        <div>
          <p className="text-sm font-medium">Photo</p>
          <p className="text-xs text-muted-foreground">Click the circle to {shown ? "change" : "add"} a photo (optional)</p>
        </div>
      </div>

      <Field label="Name" htmlFor="name">
        <Input id="name" name="name" value={form.name} onChange={onChange} required />
      </Field>
      <Field label="Email" htmlFor="email" hint="Private — only visible to admins">
        <Input id="email" name="email" type="email" value={form.email} onChange={onChange} required />
      </Field>
      <Field label="Bio" htmlFor="bio">
        <Textarea id="bio" name="bio" rows={4} value={form.bio} onChange={onChange} />
      </Field>

      <div className="flex justify-end gap-2 border-t pt-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} disabled={saving}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={saving}>
          {saving ? "Saving…" : author ? "Save changes" : "Create author"}
        </Button>
      </div>
    </form>
  );
}
