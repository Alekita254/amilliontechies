import { motion, Variants } from "framer-motion";


export const HeroCards = () => {

  const floatingAnimation: Variants = {
    initial: { y: 0 },
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
        <div className="relative aspect-square 
            bg-white/70 dark:bg-black/30 
            backdrop-blur-md 
            rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
          <div className="absolute inset-0 rounded-3xl pointer-events-none" />
          <img
            src="/amilli.svg"
            alt="Illustration for A Million Techies"
            className="w-full h-full object-contain"
          />
        </div>
      </motion.div>
    </div>
  );
};



