import { LogoIcon } from "./Icons";

export const Footer = () => {
  return (
    <footer id="footer">
      <hr className="w-11/12 mx-auto" />

      <section className="container py-20 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
        {/* Branding */}
        <div className="col-span-full xl:col-span-2">
          <a rel="noreferrer noopener" href="/" className="font-bold text-xl flex">
            {/* <LogoIcon /> */}
            <img
    src="/amilliontechies.png"
    alt="A Million Techies Logo"
    className="h-8 w-8"
  />
            A Million Techies
          </a>
          <p className="text-sm opacity-70 mt-2">
            Empowering developers, designers, and tech enthusiasts worldwide.
          </p>
        </div>

        {/* Follow Us */}
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Follow Us</h3>
          <a rel="noreferrer noopener" href="#" className="opacity-60 hover:opacity-100">Twitter</a>
          <a rel="noreferrer noopener" href="#" className="opacity-60 hover:opacity-100">LinkedIn</a>
          <a rel="noreferrer noopener" href="#" className="opacity-60 hover:opacity-100">GitHub</a>
          <a rel="noreferrer noopener" href="#" className="opacity-60 hover:opacity-100">Discord</a>
        </div>

        {/* Learning Resources */}
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Resources</h3>
          <a rel="noreferrer noopener" href="/blog" className="opacity-60 hover:opacity-100">Blogs</a>
          <a rel="noreferrer noopener" href="#" className="opacity-60 hover:opacity-100">Courses</a>
          <a rel="noreferrer noopener" href="#" className="opacity-60 hover:opacity-100">Workshops</a>
        </div>

        {/* Open Source */}
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Open Source</h3>
          <a rel="noreferrer noopener" href="#" className="opacity-60 hover:opacity-100">Contribute</a>
          <a rel="noreferrer noopener" href="#" className="opacity-60 hover:opacity-100">Projects</a>
          <a rel="noreferrer noopener" href="#" className="opacity-60 hover:opacity-100">Docs</a>
        </div>

        {/* Events */}
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Events</h3>
          <a rel="noreferrer noopener" href="#" className="opacity-60 hover:opacity-100">Meetups</a>
          <a rel="noreferrer noopener" href="#" className="opacity-60 hover:opacity-100">Hackathons</a>
          <a rel="noreferrer noopener" href="#" className="opacity-60 hover:opacity-100">Webinars</a>
        </div>
      </section>

      {/* Copyright & CTA */}
      <section className="container pb-14 text-center">
        <h3 className="text-sm opacity-80">
          &copy; 2024 A Million Techies. Built for the community, by the community.
        </h3>
        <h3 className="mt-2">
          Want to get involved?{" "}
          <a rel="noreferrer noopener" href="#" className="text-primary transition-all border-primary hover:border-b-2">
            Join Us
          </a>
        </h3>
      </section>
    </footer>
  );
};
