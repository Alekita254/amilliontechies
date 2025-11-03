import { Button } from "./ui/button";
import { buttonVariants } from "./ui/button";
import { HeroCards } from "./HeroCards";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { ContactPopover } from "./contactPopover";
// import { useState } from "react";

export const Hero = () => {
  return (
    <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
      <div className="text-center lg:text-start space-y-6">
        <main className="text-5xl md:text-6xl font-bold">
          <h1 className="inline">Welcome to A Million Techies</h1>{" "}
          <h2 className="inline">- Learn. Build. Grow</h2>
        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          We are a global, community-driven initiative designed to equip YOU
          with the most in-demand IT and technical skills.
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4">
          {/* <Button className="w-full md:w-1/3" onClick={() => setIsModalOpen(true)}>
             Get Started
          </Button> */}
          <ContactPopover />

          <a
            rel="noreferrer noopener"
            href="https://github.com/Alekita254/amilliontechies.git"
            target="_blank"
            className={`w-full md:w-1/3 ${buttonVariants({
              variant: "outline",
            })}`}
          >
            Github Repository
            <GitHubLogoIcon className="ml-2 w-5 h-5" />
          </a>
        </div>
        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <a href="https://learn.amilliontechies.com">
            <Button className="w-full">Courses</Button>
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
