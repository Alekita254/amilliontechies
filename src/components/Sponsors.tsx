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
    <section id="sponsors" className="container pt-24 sm:py-32">
      <h2 className="text-center text-md lg:text-xl font-bold mb-8 text-primary">
        Investors and Founders
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center">
        {sponsors.map(({ icon, name, link }, index) => (
          <motion.a
            key={name}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-3 bg-white dark:bg-gray-800 rounded-xl shadow-md transition-all duration-300 hover:shadow-2xl hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.08, y: -3 }}
          >
            <div className="mb-2 text-primary">{icon}</div>
            <h3 className="text-md font-bold text-gray-800 dark:text-white">{name}</h3>
          </motion.a>
        ))}
      </div>
    </section>
  );
};
