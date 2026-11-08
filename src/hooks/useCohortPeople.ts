import { useCallback, useEffect, useState } from "react";
import { apiGetRequest } from "@/backend/functions";

// What the public API returns for a member who chose to be shown. No contact details.
export interface CohortPerson {
  id: number;
  role: "MENTEE" | "MENTOR";
  full_name: string;
  headline: string;
  about: string;
}

export function useCohortPeople(slug?: string) {
  const [people, setPeople] = useState<CohortPerson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!slug) return;
    setLoading(true);
    setError(null);
    const res = await apiGetRequest(`cohorts/${slug}/people/`);
    const rows = res.data?.data;
    if (Array.isArray(rows)) setPeople(rows);
    else setError(res.message || "We couldn't load the people right now.");
    setLoading(false);
  }, [slug]);

  useEffect(() => {
    load();
  }, [load]);

  return { people, loading, error, reload: load };
}
