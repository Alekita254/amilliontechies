import { useState } from "react";
import { Link } from "react-router-dom";
import { MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiPostRequest } from "@/backend/functions";

export function SignInPage() {
  const [email, setEmail] = useState("");
  const [sentMessage, setSentMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    try {
      const res = await apiPostRequest("members/signin/request/", { email: email.trim() });
      setSentMessage(res.message);
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="container flex min-h-[60vh] items-center justify-center py-12">
      <Card className="w-full max-w-md">
        {sentMessage ? (
          <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
            <MailCheck className="h-12 w-12 text-primary" />
            <CardTitle>Check your inbox</CardTitle>
            <CardDescription>{sentMessage} The link works once and expires in 15 minutes.</CardDescription>
            <Button variant="outline" onClick={() => setSentMessage(null)}>
              Use a different email
            </Button>
          </CardContent>
        ) : (
          <>
            <CardHeader>
              <CardTitle>Sign in</CardTitle>
              <CardDescription>
                Enter the email you used to apply and we'll send you a link. No password needed.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={submit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError(null);
                    }}
                  />
                </div>
                {error && (
                  <p role="alert" className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
                    {error}
                  </p>
                )}
                <Button type="submit" className="w-full" disabled={sending}>
                  {sending ? "Sending…" : "Send me a sign-in link"}
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  Haven't applied yet? Pick a <Link to="/cohorts" className="text-primary hover:underline">cohort</Link> and register.
                </p>
              </form>
            </CardContent>
          </>
        )}
      </Card>
    </main>
  );
}
