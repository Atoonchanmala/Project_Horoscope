'use client';

import { motion } from "motion/react";
import Image from "next/image"; // (recommended for responsive optimization)
import logoImage from "../../asset/logoImage.png";

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <motion.div
      className={`inline-block mb-6 ${className}`}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="mx-auto w-full max-w-[650px]"  // ⬅️ responsive container
      >
        <Image
          src={logoImage}
          alt="Galactic Star Astrology AI Logo"
          className="w-full h-auto"                 // ⬅️ fully responsive
          priority
        />
      </motion.div>
    </motion.div>
  );
};

export default Logo;
