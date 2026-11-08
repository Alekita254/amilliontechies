import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { apiPostRequest } from "@/backend/functions";
import { cn } from "@/lib/utils";

type Role = "MENTEE" | "MENTOR";

export type RegistrableCohort = {
  slug: string;
  title: string;
  registration_state?: "open" | "closed" | "full";
  seats_left?: number | null;
};

const EMPTY = {
  full_name: "",
  email: "",
  phone: "",
  location: "",
  headline: "",
  about: "",
  expertise: "",
  linkedin: "",
  show_publicly: false,
  website: "", // honeypot: real people never see or fill this
};

function Field({
  label, htmlFor, error, hint, children,
}: { label: string; htmlFor: string; error?: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {error ? <p className="text-xs text-destructive">{error}</p> : hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

export function CohortRegistration({ cohort }: { cohort: RegistrableCohort }) {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState<Role>("MENTEE");
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const state = cohort.registration_state ?? "closed";

  if (state !== "open") {
    return (
      <Button disabled variant="outline">
        {state === "full" ? "This cohort is full" : "Registration is closed"}
      </Button>
    );
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setServerError(null);
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value }));
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.full_name.trim()) next.full_name = "Please enter your name";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) next.email = "Please enter a valid email";
    if (!form.about.trim()) next.about = role === "MENTOR" ? "Tell us a little about yourself" : "Tell us why you want to join";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setServerError(null);
    try {
      await apiPostRequest(`cohorts/${cohort.slug}/register/`, { ...form, role });
      setDone(true);
    } catch (err: any) {
      setServerError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const close = (next: boolean) => {
    setOpen(next);
    if (!next && done) {
      setDone(false);
      setForm(EMPTY);
      setRole("MENTEE");
    }
  };

  const isMentor = role === "MENTOR";

  return (
    <>
      <div className="flex flex-col items-start gap-1">
        <Button onClick={() => setOpen(true)}>Register</Button>
        {cohort.seats_left != null && (
          <span className="text-xs text-muted-foreground">
            {cohort.seats_left} {cohort.seats_left === 1 ? "seat" : "seats"} left
          </span>
        )}
      </div>

      <Dialog open={open} onOpenChange={close}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          {done ? (
            <div className="flex flex-col items-center gap-3 px-2 py-8 text-center">
              <CheckCircle2 className="h-12 w-12 text-primary" />
              <DialogTitle>Thanks, {form.full_name.split(" ")[0]}!</DialogTitle>
              <DialogDescription>
                We've received your application for {cohort.title}. We'll email you at {form.email} once it has been reviewed.
              </DialogDescription>
              <Button onClick={() => close(false)}>Close</Button>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Register for {cohort.title}</DialogTitle>
                <DialogDescription>Tell us a bit about you. Your email and phone are never shown publicly.</DialogDescription>
              </DialogHeader>

              <form onSubmit={submit} noValidate className="space-y-5">
                <div className="grid grid-cols-2 gap-1 rounded-lg bg-muted p-1" role="group" aria-label="I want to join as">
                  {(["MENTEE", "MENTOR"] as Role[]).map((r) => (
                    <button
                      key={r}
                      type="button"
                      aria-pressed={role === r}
                      onClick={() => setRole(r)}
                      className={cn(
                        "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        role === r ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {r === "MENTEE" ? "Join as a mentee" : "Join as a mentor"}
                    </button>
                  ))}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Full name *" htmlFor="full_name" error={errors.full_name}>
                    <Input id="full_name" name="full_name" value={form.full_name} onChange={onChange} maxLength={150} />
                  </Field>
                  <Field label="Email *" htmlFor="email" error={errors.email}>
                    <Input id="email" name="email" type="email" value={form.email} onChange={onChange} />
                  </Field>
                  <Field label="Phone" htmlFor="phone">
                    <Input id="phone" name="phone" value={form.phone} onChange={onChange} maxLength={30} />
                  </Field>
                  <Field label="Location" htmlFor="location">
                    <Input id="location" name="location" value={form.location} onChange={onChange} maxLength={100} />
                  </Field>
                  <Field label="Your role or title" htmlFor="headline" hint="For example: Junior developer">
                    <Input id="headline" name="headline" value={form.headline} onChange={onChange} maxLength={150} />
                  </Field>
                  <Field label="LinkedIn" htmlFor="linkedin">
                    <Input id="linkedin" name="linkedin" type="url" placeholder="https://" value={form.linkedin} onChange={onChange} />
                  </Field>
                </div>

                <Field label={isMentor ? "About you *" : "Why do you want to join? *"} htmlFor="about" error={errors.about}>
                  <Textarea id="about" name="about" rows={4} value={form.about} onChange={onChange} maxLength={2000} />
                </Field>
                <Field label={isMentor ? "Your expertise" : "Your goals"} htmlFor="expertise">
                  <Textarea id="expertise" name="expertise" rows={3} value={form.expertise} onChange={onChange} maxLength={1000} />
                </Field>

                {/* Honeypot: hidden from people, tempting to bots. */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                  <label htmlFor="website">Website</label>
                  <input id="website" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={onChange} />
                </div>

                <label className="flex cursor-pointer items-start gap-3 rounded-lg border p-3 text-sm">
                  <input
                    type="checkbox"
                    name="show_publicly"
                    checked={form.show_publicly}
                    onChange={onChange}
                    className="mt-0.5 h-4 w-4 accent-[hsl(var(--primary))]"
                  />
                  <span>
                    <span className="block font-medium">Show me on the public page</span>
                    <span className="block text-xs text-muted-foreground">
                      If you're accepted, your name, role and bio can appear on this cohort's page. Optional.
                    </span>
                  </span>
                </label>

                {serverError && (
                  <p role="alert" className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{serverError}</p>
                )}

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => close(false)} disabled={submitting}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={submitting}>
                    {submitting ? "Sending…" : "Submit application"}
                  </Button>
                </div>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
