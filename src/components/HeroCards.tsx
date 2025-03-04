import { motion } from "framer-motion";


export const HeroCards = () => {

  const floatingAnimation = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };


  return (
    <div className="hidden lg:flex flex-row flex-wrap gap-8 relative w-[700px] h-[500px]">
          <motion.div
            variants={floatingAnimation}
            initial="initial"
            animate="animate"
            className="w-full flex justify-center"
          >
        <div className="relative aspect-square bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl p-8 shadow-xl">
          <div className="absolute inset-0 rounded-3xl border-2 border-indigo-50/50" />
          <img
            src="/amilliontechies.svg"
            alt="Illustration for A Million Techies"
            className="w-full h-full object-contain"
          />
        </div>
      </motion.div>
    </div>
  );
};
