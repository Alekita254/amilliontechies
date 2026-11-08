import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { apiPatchRequest, apiPostRequest } from "@/backend/functions";
import { errorText } from "../lib/errors";
import { type Member, type MemberRole, type MemberStatus, ROLE_LABEL, STATUS_LABEL } from "../lib/cohortMembers";
import { Field, NativeSelect } from "./Field";

type Form = {
  role: MemberRole;
  status: MemberStatus;
  full_name: string;
  email: string;
  phone: string;
  location: string;
  headline: string;
  about: string;
  expertise: string;
  linkedin: string;
  show_publicly: boolean;
  admin_note: string;
};

const blank: Form = {
  role: "MENTEE", status: "APPROVED", full_name: "", email: "", phone: "", location: "",
  headline: "", about: "", expertise: "", linkedin: "", show_publicly: false, admin_note: "",
};

const fmt = (d?: string | null) =>
  d ? new Date(d).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" }) : "";

/** View/edit one member (member given) or add a new approved one (member null). */
export function MemberDialog({
  member,
  slug,
  onClose,
  onSaved,
}: {
  member: Member | null;
  slug: string;
  onClose: () => void;
  onSaved: () => void;
}) {
  const isEdit = !!member;
  const [form, setForm] = useState<Form>(member ? { ...blank, ...member } : blank);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setError(null);
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const { admin_note, status, ...rest } = form;
      if (isEdit) {
        await apiPatchRequest(`cohorts/${slug}/members/${member!.id}/`, { ...rest, status, admin_note });
        toast.success("Member updated");
      } else {
        await apiPostRequest(`cohorts/${slug}/members/`, { ...rest, status: "APPROVED", admin_note });
        toast.success("Member added");
      }
      onSaved();
    } catch (err) {
      const msg = errorText(err, "Couldn't save the member");
      setError(msg);
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open onOpenChange={(open) => !open && !saving && onClose()}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? member!.full_name : "Add member"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? `Applied ${fmt(member!.created_at)}${member!.decided_at ? ` · Decided ${fmt(member!.decided_at)}` : ""}`
              : "Add someone directly. They're approved straight away and no email is sent."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submit} className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Role" htmlFor="role">
              <NativeSelect id="role" name="role" value={form.role} onChange={onChange}>
                {(Object.keys(ROLE_LABEL) as MemberRole[]).map((r) => (
                  <option key={r} value={r}>{ROLE_LABEL[r]}</option>
                ))}
              </NativeSelect>
            </Field>
            {isEdit && (
              <Field label="Status" htmlFor="status">
                <NativeSelect id="status" name="status" value={form.status} onChange={onChange}>
                  {(Object.keys(STATUS_LABEL) as MemberStatus[]).map((s) => (
                    <option key={s} value={s}>{STATUS_LABEL[s]}</option>
                  ))}
                </NativeSelect>
              </Field>
            )}
            <Field label="Full name" htmlFor="full_name">
              <Input id="full_name" name="full_name" value={form.full_name} onChange={onChange} required maxLength={150} />
            </Field>
            <Field label="Email" htmlFor="email">
              <Input id="email" name="email" type="email" value={form.email} onChange={onChange} required />
            </Field>
            <Field label="Phone" htmlFor="phone">
              <Input id="phone" name="phone" value={form.phone} onChange={onChange} maxLength={30} />
            </Field>
            <Field label="Location" htmlFor="location">
              <Input id="location" name="location" value={form.location} onChange={onChange} maxLength={100} />
            </Field>
            <Field label="Headline" htmlFor="headline" hint="Shown publicly, e.g. Backend developer">
              <Input id="headline" name="headline" value={form.headline} onChange={onChange} maxLength={150} />
            </Field>
            <Field label="LinkedIn" htmlFor="linkedin">
              <Input id="linkedin" name="linkedin" type="url" value={form.linkedin} onChange={onChange} />
            </Field>
          </div>

          <Field label={form.role === "MENTOR" ? "About" : "Why they want to join"} htmlFor="about">
            <Textarea id="about" name="about" rows={3} value={form.about} onChange={onChange} required maxLength={2000} />
          </Field>
          <Field label={form.role === "MENTOR" ? "Expertise" : "Goals and experience"} htmlFor="expertise">
            <Textarea id="expertise" name="expertise" rows={2} value={form.expertise} onChange={onChange} maxLength={1000} />
          </Field>
          <Field label="Admin note" htmlFor="admin_note" hint="Only admins can see this">
            <Textarea id="admin_note" name="admin_note" rows={2} value={form.admin_note} onChange={onChange} maxLength={2000} />
          </Field>

          <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-sm">
            <input
              type="checkbox"
              name="show_publicly"
              checked={form.show_publicly}
              onChange={onChange}
              className="h-4 w-4 accent-[hsl(var(--primary))]"
            />
            <span>
              <span className="block font-medium">Show on the public cohort page</span>
              <span className="block text-xs text-muted-foreground">
                Only their name, headline and bio. Never email or phone.
              </span>
            </span>
          </label>

          {error && <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>}

          <div className="sticky -bottom-6 -mx-6 -mb-6 flex justify-end gap-2 border-t bg-background px-6 py-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={saving}>Cancel</Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving…" : isEdit ? "Save changes" : "Add member"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
