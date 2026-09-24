import { Statistics } from "./Statistics";
import about from "../assets/about-us.png";
import { Button } from "./ui/button";

const aboutPillars = [
  "Practical Learning",
  "Community Mentorship",
  "Career Readiness",
  "Inclusive Access",
];

export const About = () => {
  return (
    <section id="about" className="container px-4 py-24 sm:py-32">
      <div className="rounded-3xl border border-border/70 bg-gradient-to-b from-muted/50 to-background px-5 py-10 shadow-sm sm:px-8 sm:py-12">
        <div className="flex flex-col-reverse items-center gap-10 md:flex-row md:gap-12">
          <div className="flex w-full justify-center md:w-5/12">
            <div className="relative w-full max-w-xs sm:max-w-sm">
              <div className="pointer-events-none absolute -inset-2 rounded-3xl bg-primary/10 blur-2xl" />
              <div className="relative rounded-2xl border border-border/70 bg-white/70 p-3 shadow-md backdrop-blur dark:bg-black/20">
                <img
                  src={about}
                  alt="A Million Techies community"
                  className="mx-auto w-full rounded-xl object-contain"
                />
              </div>
            </div>
          </div>

          <div className="w-full md:w-7/12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Building a Global
              <span className="bg-gradient-to-b from-primary/60 to-primary bg-clip-text text-transparent">
                {" "}Tech Learning Movement
              </span>
            </h2>
            <p className="mt-4 inline-flex rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium italic tracking-wide text-primary sm:text-base">
              "I am because we are."
            </p>
            <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">
              A Million Techies is a community-driven initiative dedicated to empowering everyone with essential IT and technical skills, completely free of charge.
            </p>
            <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
              Our mission is to bridge the digital divide through practical learning in Linux, Networking, Cloud Computing, Python, Cybersecurity, Data Science, AI/ML, and more, while creating a supportive environment where learners and mentors grow together.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-2 sm:gap-3">
              {aboutPillars.map((pillar) => (
                <span
                  key={pillar}
                  className="rounded-xl border border-border/70 bg-background/90 px-3 py-2 text-center text-xs font-medium sm:text-sm"
                >
                  {pillar}
                </span>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-border/70 bg-background/80 p-4 sm:p-6">
              <Statistics />
            </div>

            <div className="mt-8">
              <a href="/join-us">
                <Button className="w-full sm:w-auto">Join The Movement Now</Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
