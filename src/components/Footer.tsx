interface FooterLink {
  label: string;
  href: string;
}

const footerPrimaryLinks: FooterLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Cohorts", href: "/cohorts" },
  { label: "Stories", href: "/stories" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Join Us", href: "/join-us" },
];

const footerProgramLinks: FooterLink[] = [
  { label: "Cohorts", href: "/cohorts" },
  { label: "Mentorship / Learning", href: "https://learn.amilliontechies.com" },
];

const footerCommunityLinks: FooterLink[] = [
  { label: "Our Community", href: "/community" },
  { label: "Mentors", href: "/mentors" },
  { label: "Events", href: "/events" },
];

const footerSocialLinks: FooterLink[] = [
  { label: "Twitter", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "GitHub", href: "#" },
  { label: "Discord", href: "#" },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer">
      <hr className="w-11/12 mx-auto" />

      <section className="container grid gap-10 px-4 py-16 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
        {/* Branding */}
        <div className="col-span-full max-w-md xl:col-span-2">
          <a rel="noreferrer noopener" href="/" className="flex items-center gap-3 text-lg font-bold sm:text-xl">
            <img
              src="/amilliontechies.png"
              alt="A Million Techies Logo"
              className="h-8 w-8 shrink-0"
            />
            A Million Techies
          </a>
          <p className="mt-3 text-sm leading-6 opacity-70">
            Empowering developers, designers, and tech enthusiasts worldwide.
          </p>
        </div>

        {/* Main Navigation */}
        <div className="flex flex-col gap-3 text-sm sm:text-base">
          <h3 className="text-lg font-bold">Navigation</h3>
          {footerPrimaryLinks.map(({ label, href }) => (
            <a key={label} rel="noreferrer noopener" href={href} className="opacity-60 hover:opacity-100">
              {label}
            </a>
          ))}
        </div>

        {/* Programs */}
        <div className="flex flex-col gap-3 text-sm sm:text-base">
          <h3 className="text-lg font-bold">Programs</h3>
          {footerProgramLinks.map(({ label, href }) => (
            <a key={label} rel="noreferrer noopener" href={href} className="opacity-60 hover:opacity-100">
              {label}
            </a>
          ))}
        </div>

        {/* Community */}
        <div className="flex flex-col gap-3 text-sm sm:text-base">
          <h3 className="text-lg font-bold">Community</h3>
          {footerCommunityLinks.map(({ label, href }) => (
            <a key={label} rel="noreferrer noopener" href={href} className="opacity-60 hover:opacity-100">
              {label}
            </a>
          ))}
        </div>

        {/* Social */}
        <div className="flex flex-col gap-3 text-sm sm:text-base">
          <h3 className="text-lg font-bold">Follow Us</h3>
          {footerSocialLinks.map(({ label, href }) => (
            <a key={label} rel="noreferrer noopener" href={href} className="opacity-60 hover:opacity-100">
              {label}
            </a>
          ))}
        </div>
      </section>

      {/* Copyright & CTA */}
      <section className="container px-4 pb-10 text-center">
        <h3 className="text-sm leading-6 opacity-80 sm:text-base">
          &copy; {currentYear} A Million Techies. Built for the community, by the community.
        </h3>
        <h3 className="mt-2 text-sm leading-6 sm:text-base">
          Discover the community on amilliontechies.com and continue learning on learn.amilliontechies.com.
        </h3>
        <h3 className="mt-2 text-sm leading-6 sm:text-base">
          Want to get involved?{" "}
          <a rel="noreferrer noopener" href="/join-us" className="text-primary transition-all border-primary hover:border-b-2">
            Join Us
          </a>
        </h3>
      </section>
    </footer>
  );
};
