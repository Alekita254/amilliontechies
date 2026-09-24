import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { MailCheck, Loader2 } from "lucide-react";
import { apiPostRequest } from "../backend/functions";

export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await apiPostRequest("newsletter/", { email });
      console.log("Success:", response);
      setSubscribed(true);
    } catch (error) {
      console.error("Subscription failed:", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <section id="newsletter">
      <hr className="w-11/12 mx-auto" />

      <div className="container px-4 py-24 text-center sm:py-32">
        <h3 className="text-3xl font-bold sm:text-4xl md:text-5xl">
          Join Our{" "}
          <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
            Newsletter
          </span>
        </h3>
        <p className="mx-auto mt-4 mb-8 max-w-3xl text-base text-muted-foreground sm:text-lg lg:text-xl">
          Stay updated with the latest insights, events, and opportunities in the tech world.
        </p>

        {!subscribed ? (
          <form
            className="mx-auto flex w-full max-w-xl flex-col gap-3 sm:flex-row sm:items-center"
            onSubmit={handleSubmit}
          >
            <label htmlFor="email" className="sr-only">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="yourname@example.com"
              className="bg-muted/50 dark:bg-muted/80 sm:flex-1"
              required
            />
            <Button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 sm:w-auto">
              {loading ? <Loader2 className="animate-spin w-4 h-4" /> : "Subscribe"}
            </Button>
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center mt-6">
            <MailCheck className="w-10 h-10 text-green-500" />
            <p className="mt-2 text-base font-semibold text-green-500 sm:text-lg">You're subscribed! 🎉</p>
          </div>
        )}
      </div>

      <hr className="w-11/12 mx-auto" />
    </section>
  );
};
