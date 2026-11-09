import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { apiPatchRequest } from "@/backend/functions";

export interface MemberProfile {
  full_name: string;
  phone: string;
  location: string;
  headline: string;
  about: string;
  expertise: string;
  linkedin: string;
  show_publicly: boolean;
}

export interface MyMembership {
  id: number;
  role: "MENTEE" | "MENTOR";
  status: "PENDING" | "APPROVED" | "REJECTED";
  created_at: string;
  decided_at: string | null;
  cohort: { title: string; slug: string; status: string; start_date: string | null; end_date: string | null; duration: string };
  profile: MemberProfile;
  mentor: Person | null;
  mentees: Person[];
}

export interface Person {
  full_name: string;
  headline: string;
  about: string;
  email: string;
}

// Only these eight fields can be changed; role, status, mentor and email are decided by the admins.
const FIELDS: (keyof MemberProfile)[] = [
  "full_name", "phone", "location", "headline", "about", "expertise", "linkedin", "show_publicly",
];

function Field({ label, id, children }: { label: string; id: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      {children}
    </div>
  );
}

export function MemberProfileDialog({
  membership,
  onClose,
  onSaved,
}: {
  membership: MyMembership;
  onClose: () => void;
  onSaved: (updated: MyMembership) => void;
}) {
  const [form, setForm] = useState<MemberProfile>(membership.profile);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setError(null);
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const body = Object.fromEntries(FIELDS.map((k) => [k, form[k]]));
      const res = await apiPatchRequest(`members/me/${membership.id}/`, body);
      toast.success("Profile updated");
      onSaved(res.data);
    } catch (err: any) {
      setError(err?.message || "We couldn't save your profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open onOpenChange={(open) => !open && !saving && onClose()}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit my profile</DialogTitle>
          <DialogDescription>
            For {membership.cohort.title}. Your role and status are managed by the team.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Full name" id="full_name">
              <Input id="full_name" name="full_name" value={form.full_name} onChange={onChange} maxLength={150} required />
            </Field>
            <Field label="Phone (private)" id="phone">
              <Input id="phone" name="phone" value={form.phone} onChange={onChange} maxLength={30} />
            </Field>
            <Field label="Location" id="location">
              <Input id="location" name="location" value={form.location} onChange={onChange} maxLength={100} />
            </Field>
            <Field label="Role or title" id="headline">
              <Input id="headline" name="headline" value={form.headline} onChange={onChange} maxLength={150} />
            </Field>
            <Field label="LinkedIn" id="linkedin">
              <Input id="linkedin" name="linkedin" type="url" value={form.linkedin} onChange={onChange} />
            </Field>
          </div>
          <Field label="About you" id="about">
            <Textarea id="about" name="about" rows={4} value={form.about} onChange={onChange} maxLength={2000} required />
          </Field>
          <Field label={membership.role === "MENTOR" ? "Your expertise" : "Your goals"} id="expertise">
            <Textarea id="expertise" name="expertise" rows={3} value={form.expertise} onChange={onChange} maxLength={1000} />
          </Field>
          <label className="flex cursor-pointer items-start gap-3 rounded-lg border p-3 text-sm">
            <input
              type="checkbox"
              name="show_publicly"
              checked={form.show_publicly}
              onChange={onChange}
              className="mt-0.5 h-4 w-4 accent-[hsl(var(--primary))]"
            />
            <span>
              <span className="block font-medium">Show me on the public cohort page</span>
              <span className="block text-xs text-muted-foreground">Only your name, role and bio. Never your email or phone.</span>
            </span>
          </label>
          {error && <p role="alert" className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose} disabled={saving}>Cancel</Button>
            <Button type="submit" disabled={saving}>{saving ? "Saving…" : "Save changes"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
