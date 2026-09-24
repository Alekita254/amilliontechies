import { About } from "../components/About";
import { BadgeCheck, Globe, Users } from "lucide-react";

export const AboutPage = () => {
  return (
    <main className="pb-16 sm:pb-24">
      <section className="container px-4 pb-6 pt-12 sm:pt-16">
        <div className="rounded-3xl border border-border/70 bg-gradient-to-r from-primary/10 via-background to-primary/5 p-6 sm:p-10">
          <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-end">
            <div>
              <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                We are building the most practical and inclusive tech learning community.
              </h1>
              <p className="mt-4 inline-flex rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-base font-medium italic tracking-wide text-primary sm:text-lg">
                "I am because we are."
              </p>
              <p className="mt-4 max-w-3xl text-base text-muted-foreground sm:text-lg">
                From beginners to professionals, A Million Techies helps people learn, build, and grow together through community-powered opportunities.
              </p>
            </div>

            <div className="rounded-2xl border border-border/70 bg-background/90 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Our Principle</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Individual growth is strongest when it is connected to community growth. We design every program with that shared-progress mindset.
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4">
            <div className="rounded-2xl border border-border/70 bg-background/90 p-3 sm:p-4">
              <Globe className="h-5 w-5 text-primary" />
              <h2 className="mt-3 text-sm font-semibold sm:text-base">Global Access</h2>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">Open learning opportunities for every region and background.</p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-background/90 p-3 sm:p-4">
              <Users className="h-5 w-5 text-primary" />
              <h2 className="mt-3 text-sm font-semibold sm:text-base">Community First</h2>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">Collaborative growth through mentorship, events, and teamwork.</p>
            </div>
            <div className="col-span-2 mx-auto w-full max-w-md rounded-2xl border border-border/70 bg-background/90 p-3 sm:p-4">
              <BadgeCheck className="h-5 w-5 text-primary" />
              <h2 className="mt-3 text-sm font-semibold sm:text-base">Career Impact</h2>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">Practical skills mapped to real-world opportunities.</p>
            </div>
          </div>
        </div>
      </section>

      <About />
    </main>
  );
};
