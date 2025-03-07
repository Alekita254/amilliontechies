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

      <div className="container py-24 sm:py-32 text-center">
        <h3 className="text-4xl md:text-5xl font-bold">
          Join Our{" "}
          <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
            Newsletter
          </span>
        </h3>
        <p className="text-xl text-muted-foreground mt-4 mb-8">
          Stay updated with the latest insights, events, and opportunities in the tech world.
        </p>

        {!subscribed ? (
          <form
            className="flex flex-col md:flex-row md:w-6/12 lg:w-4/12 mx-auto gap-4 md:gap-2"
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
              className="bg-muted/50 dark:bg-muted/80"
              required
            />
            <Button type="submit" disabled={loading} className="flex items-center gap-2">
              {loading ? <Loader2 className="animate-spin w-4 h-4" /> : "Subscribe"}
            </Button>
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center mt-6">
            <MailCheck className="w-10 h-10 text-green-500" />
            <p className="text-lg font-semibold mt-2 text-green-500">You're subscribed! 🎉</p>
          </div>
        )}
      </div>

      <hr className="w-11/12 mx-auto" />
    </section>
  );
};
