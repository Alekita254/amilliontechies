import type { ReactNode } from "react";
import { Radar } from "lucide-react";
import { motion } from "framer-motion";

interface SponsorProps {
  icon: ReactNode;
  name: string;
  link: string;
}

const sponsors: SponsorProps[] = [
  { icon: <Radar size={34} />, name: "Geto Global Technologies", link: "https://getotech.co.ke" },
  { icon: <Radar size={34} />, name: "Geto Global Technologies", link: "https://getotech.co.ke" },
  { icon: <Radar size={34} />, name: "Geto Global Technologies", link: "https://getotech.co.ke" },
  { icon: <Radar size={34} />, name: "Geto Global Technologies", link: "https://getotech.co.ke" },
  { icon: <Radar size={34} />, name: "Geto Global Technologies", link: "https://getotech.co.ke" },
];

export const Sponsors = () => {
  return (
    <section id="sponsors" className="container px-4 pt-24 sm:py-32">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <p className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Partners
        </p>
        <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
          Investors and Founders
        </h2>
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">
          The organizations backing our mission to make world-class tech learning accessible.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {sponsors.map(({ icon, name, link }, index) => (
          <motion.a
            key={`${name}-${index}`}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative isolate flex min-h-28 w-full items-center gap-3 overflow-hidden rounded-2xl border border-border/70 bg-white/90 p-4 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-gray-900/80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              {icon}
            </div>
            <div className="relative min-w-0">
              <h3 className="truncate text-sm font-semibold text-foreground sm:text-base">{name}</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">Strategic Partner</p>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};
