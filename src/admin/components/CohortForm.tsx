import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { apiPatchRequest, apiPostRequest } from "@/backend/functions";
import { toast } from "sonner";
import { Field, NativeSelect } from "./Field";

type CohortStatus = "UPCOMING" | "ACTIVE" | "COMPLETED";

type CohortFormData = {
  title: string;
  short_description: string;
  description: string;
  program_type: string;
  status: CohortStatus;
  start_date: string;
  end_date: string;
  capacity: string; // text so it can be empty (= no limit)
  featured: boolean;
  published: boolean;
  registration_open: boolean;
};

type CohortInput = Partial<Omit<CohortFormData, "capacity">> & {
  id?: number;
  slug?: string;
  capacity?: number | null;
  seats_taken?: number;
};

const initialState: CohortFormData = {
  title: "",
  short_description: "",
  description: "",
  program_type: "",
  status: "UPCOMING",
  start_date: "",
  end_date: "",
  capacity: "",
  featured: false,
  published: false,
  registration_open: false,
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h3 className="text-sm font-semibold">{title}</h3>
      {children}
    </section>
  );
}

function Toggle({
  name,
  checked,
  onChange,
  label,
  text,
}: {
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  text: string;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="mt-1 h-4 w-4 accent-[hsl(var(--primary))]"
      />
      <span>
        <span className="block text-sm font-medium">{label}</span>
        <span className="block text-xs text-muted-foreground">{text}</span>
      </span>
    </label>
  );
}

export function CohortForm({
  cohort,
  onSuccess,
  onCancel,
}: {
  cohort?: CohortInput | null;
  onSuccess?: () => void;
  onCancel?: () => void;
}) {
  const [formData, setFormData] = useState<CohortFormData>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!cohort) {
      setFormData(initialState);
      return;
    }

    setFormData({
      title: cohort.title || "",
      short_description: cohort.short_description || "",
      description: cohort.description || "",
      program_type: cohort.program_type || "",
      status: cohort.status || "UPCOMING",
      start_date: cohort.start_date || "",
      end_date: cohort.end_date || "",
      capacity: cohort.capacity == null ? "" : String(cohort.capacity),
      featured: Boolean(cohort.featured),
      published: Boolean(cohort.published),
      registration_open: Boolean(cohort.registration_open),
    });
  }, [cohort]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setError(null);

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.start_date && formData.end_date && formData.end_date < formData.start_date) {
      setError("The end date can't be before the start date.");
      return;
    }

    setSubmitting(true);

    try {
      // The API rejects "" for date fields, so send null when they're empty.
      const payload = {
        ...formData,
        start_date: formData.start_date || null,
        end_date: formData.end_date || null,
        capacity: formData.capacity === "" ? null : Number(formData.capacity),
      };

      if (cohort?.slug) {
        await apiPatchRequest(`cohorts/${cohort.slug}/`, payload);
        toast.success("Cohort updated");
      } else {
        await apiPostRequest("cohorts/", payload);
        toast.success("Cohort created");
      }

      onSuccess?.();
      if (!cohort) setFormData(initialState);
    } catch (err: any) {
      const msg = err?.message || "Failed to save cohort";
      setError(msg);
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Section title="Basics">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Title" htmlFor="title">
            <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
          </Field>
          <Field label="Program type" htmlFor="program_type" hint="For example Backend, Frontend or DevOps">
            <Input id="program_type" name="program_type" value={formData.program_type} onChange={handleChange} />
          </Field>
          <Field label="Short description" htmlFor="short_description" className="md:col-span-2" hint="One line shown on cards">
            <Input id="short_description" name="short_description" value={formData.short_description} onChange={handleChange} />
          </Field>
        </div>
      </Section>

      <Section title="Schedule">
        <div className="grid gap-4 md:grid-cols-3">
          <Field label="Status" htmlFor="status">
            <NativeSelect id="status" name="status" value={formData.status} onChange={handleChange}>
              <option value="UPCOMING">Upcoming</option>
              <option value="ACTIVE">Active</option>
              <option value="COMPLETED">Completed</option>
            </NativeSelect>
          </Field>
          <Field label="Start date" htmlFor="start_date">
            <Input id="start_date" name="start_date" type="date" value={formData.start_date} onChange={handleChange} />
          </Field>
          <Field label="End date" htmlFor="end_date">
            <Input id="end_date" name="end_date" type="date" value={formData.end_date} onChange={handleChange} />
          </Field>
        </div>
      </Section>

      <Section title="Registration">
        <div className="grid gap-3 md:grid-cols-2">
          <Toggle
            name="registration_open"
            checked={formData.registration_open}
            onChange={handleChange}
            label="Registration open"
            text="People can apply on the website. The cohort must also be published."
          />
          <Field
            label="Mentee seats"
            htmlFor="capacity"
            hint={`Leave empty for no limit.${cohort?.seats_taken != null ? ` ${cohort.seats_taken} taken so far.` : ""}`}
          >
            <Input id="capacity" name="capacity" type="number" min={0} value={formData.capacity} onChange={handleChange} />
          </Field>
        </div>
        <p className="text-xs text-muted-foreground">
          Learner and mentor counts are worked out automatically from approved members.
        </p>
      </Section>

      <Section title="Details">
        <Field label="Description" htmlFor="description">
          <Textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={5} />
        </Field>
      </Section>

      <Section title="Visibility">
        <div className="grid gap-3 md:grid-cols-2">
          <Toggle
            name="published"
            checked={formData.published}
            onChange={handleChange}
            label="Published"
            text="Visible on the public website. Leave off to keep it as a draft."
          />
          <Toggle
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
            label="Featured"
            text="Highlight this cohort on the site."
          />
        </div>
      </Section>

      {error && (
        <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>
      )}

      <div className="sticky -bottom-6 -mx-6 -mb-6 flex justify-end gap-2 border-t bg-background px-6 py-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} disabled={submitting}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={submitting}>
          {submitting ? "Saving…" : cohort ? "Save changes" : "Create cohort"}
        </Button>
      </div>
    </form>
  );
}
