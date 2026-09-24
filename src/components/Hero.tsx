import { Button } from "./ui/button";
import { buttonVariants } from "./ui/button";
import { HeroCards } from "./HeroCards";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { ContactPopover } from "./contactPopover";
// import { useState } from "react";

export const Hero = () => {
  return (
    <section className="container grid items-center gap-12 px-4 py-16 sm:py-20 md:py-24 lg:grid-cols-2 lg:gap-10 lg:py-28">
      <div className="space-y-5 text-center sm:space-y-6 lg:text-start">
        <main className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
          <h1 className="inline">Welcome to A Million Techies</h1>{" "}
          <h2 className="inline">- Learn. Build. Grow</h2>
        </main>

        <p className="mx-auto text-base leading-7 text-muted-foreground sm:text-lg md:w-10/12 lg:mx-0 lg:text-xl">
          We are a global, community-driven initiative designed to equip YOU
          with the most in-demand IT and technical skills.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center lg:justify-start">
          {/* <Button className="w-full md:w-1/3" onClick={() => setIsModalOpen(true)}>
             Get Started
          </Button> */}
          <ContactPopover />

          <a
            rel="noreferrer noopener"
            href="https://github.com/Alekita254/amilliontechies.git"
            target="_blank"
            className={`inline-flex w-full justify-center sm:w-auto ${buttonVariants({
              variant: "outline",
            })}`}
          >
            Github Repository
            <GitHubLogoIcon className="ml-2 w-5 h-5" />
          </a>

          <a href="https://learn.amilliontechies.com">
            <Button className="w-full sm:w-auto">Courses</Button>
          </a>
        </div>
      </div>

      {/* Hero cards sections */}
      <div className="z-10">
        <HeroCards />
      </div>

      {/* Shadow effect */}
      <div className="shadow"></div>

      {/* <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>   */}
    </section>
  );
};
