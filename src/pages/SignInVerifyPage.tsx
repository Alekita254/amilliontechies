import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { apiPostRequest } from "@/backend/functions";
import { saveSession } from "@/lib/session";

export function SignInVerifyPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const started = useRef(false); // React StrictMode runs effects twice; a link works only once
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const token = params.get("token");
    window.history.replaceState(null, "", window.location.pathname); // keep the token out of the address bar and history

    if (!token) {
      setError("This sign-in link is incomplete. Please request a new one.");
      return;
    }

    (async () => {
      try {
        const res = await apiPostRequest("members/signin/verify/", { token });
        saveSession(res.data);
        navigate("/my-cohort", { replace: true });
      } catch (err: any) {
        setError(err?.message || "We couldn't sign you in. Please request a new link.");
      }
    })();
  }, [params, navigate]);

  return (
    <main className="container flex min-h-[60vh] items-center justify-center py-12">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
          {error ? (
            <>
              <CardTitle>We couldn't sign you in</CardTitle>
              <CardDescription>{error}</CardDescription>
              <Button asChild>
                <Link to="/signin">Send me a new link</Link>
              </Button>
            </>
          ) : (
            <>
              <CardTitle>Signing you in…</CardTitle>
              <CardDescription>One moment.</CardDescription>
            </>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
