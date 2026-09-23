import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { apiPatchRequest, apiPostRequest } from "@/backend/functions";
import { toast } from "sonner";

type CohortStatus = "UPCOMING" | "ACTIVE" | "COMPLETED";

type CohortFormData = {
  title: string;
  short_description: string;
  description: string;
  program_type: string;
  status: CohortStatus;
  start_date: string;
  end_date: string;
  learner_count: number;
  mentor_count: number;
  featured: boolean;
  published: boolean;
};

type CohortInput = Partial<CohortFormData> & {
  id?: number;
  slug?: string;
};

const initialState: CohortFormData = {
  title: "",
  short_description: "",
  description: "",
  program_type: "",
  status: "UPCOMING",
  start_date: "",
  end_date: "",
  learner_count: 0,
  mentor_count: 0,
  featured: false,
  published: false,
};

export function CohortForm({
  cohort,
  onSuccess,
}: {
  cohort?: CohortInput | null;
  onSuccess?: () => void;
}) {
  const [formData, setFormData] = useState<CohortFormData>(initialState);
  const [submitting, setSubmitting] = useState(false);

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
      learner_count: Number(cohort.learner_count || 0),
      mentor_count: Number(cohort.mentor_count || 0),
      featured: Boolean(cohort.featured),
      published: Boolean(cohort.published),
    });
  }, [cohort]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
      return;
    }

    if (name === "learner_count" || name === "mentor_count") {
      setFormData((prev) => ({ ...prev, [name]: Number(value) }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const payload = {
        ...formData,
        learner_count: Number(formData.learner_count),
        mentor_count: Number(formData.mentor_count),
      };

      if (cohort?.slug) {
        await apiPatchRequest(`cohorts/${cohort.slug}/`, payload);
        toast.success("Cohort updated successfully");
      } else {
        await apiPostRequest("cohorts/", payload);
        toast.success("Cohort created successfully");
      }

      onSuccess?.();
      if (!cohort) {
        setFormData(initialState);
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to save cohort");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="program_type">Program Type</Label>
          <Input id="program_type" name="program_type" value={formData.program_type} onChange={handleChange} placeholder="Backend, Frontend, DevOps..." />
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3"
          >
            <option value="UPCOMING">UPCOMING</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="COMPLETED">COMPLETED</option>
          </select>
        </div>
        <div>
          <Label htmlFor="short_description">Short Description</Label>
          <Input id="short_description" name="short_description" value={formData.short_description} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="start_date">Start Date</Label>
          <Input id="start_date" name="start_date" type="date" value={formData.start_date} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="end_date">End Date</Label>
          <Input id="end_date" name="end_date" type="date" value={formData.end_date} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="learner_count">Learner Count</Label>
          <Input id="learner_count" name="learner_count" type="number" min={0} value={formData.learner_count} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="mentor_count">Mentor Count</Label>
          <Input id="mentor_count" name="mentor_count" type="number" min={0} value={formData.mentor_count} onChange={handleChange} />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={4} />
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} />
          <span className="text-sm">Featured</span>
        </label>
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" name="published" checked={formData.published} onChange={handleChange} />
          <span className="text-sm">Published</span>
        </label>
      </div>

      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? "Saving..." : cohort ? "Update Cohort" : "Create Cohort"}
      </Button>
    </form>
  );
}
