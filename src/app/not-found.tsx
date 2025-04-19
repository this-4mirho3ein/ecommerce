"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.08,
      },
    },
  };

  const glitchVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const titleVariants = {
    initial: { opacity: 0, y: -30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const buttonVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    hover: {
      scale: 1.03,
      boxShadow:
        "0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.98 },
  };

  // Set page title and initialize mounted state
  useEffect(() => {
    document.title = "Page Not Found | Store";
    setMounted(true);
  }, []);

  // Characters for the glitch effect
  const glitchChars = ["$", "%", "#", "@", "&", "(", ")", "=", "*", "/"];

  // Random delay for glitch animation
  const randomDelay = () => Math.random() * 0.5;

  // Handle go back functionality
  const handleGoBack = () => {
    router.back();
  };

  // Handle keyboard event for go back button
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      router.back();
    }
  };

  return (
    <motion.div
      className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden py-20 px-4 bg-white"
      initial="initial"
      animate={mounted ? "animate" : "initial"}
      variants={pageVariants}
    >
      {/* Decorative subtle pattern */}
      <div className="absolute inset-0 bg-grid-black/[0.01] bg-[length:50px_50px] opacity-40" />

      {/* Subtle gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -inset-[10px] opacity-20 blur-[120px]">
          <div className="absolute top-1/2 -translate-y-1/2 left-0 w-3/4 h-1/2 bg-gradient-to-r from-blue-200/60 to-transparent rounded-full" />
          <div className="absolute top-1/4 -translate-y-1/2 right-0 w-1/2 h-1/2 bg-gradient-to-l from-indigo-200/50 to-transparent rounded-full" />
        </div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* 404 with glitch effect */}
        <motion.div
          className="relative w-full mb-12 select-none"
          variants={glitchVariants}
        >
          <div className="relative inline-block">
            <h1 className="text-[10rem] md:text-[14rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 tracking-tighter leading-none">
              404
            </h1>

            {/* Glitch effects */}
            {Array.from({ length: 10 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 inline-block text-[10rem] md:text-[14rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 tracking-tighter leading-none opacity-0"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 0.5, 0],
                  x: [0, i % 2 === 0 ? 5 : -5, 0],
                  y: [0, i % 3 === 0 ? 5 : -5, 0],
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 2,
                  delay: randomDelay() + i * 0.1,
                  repeatDelay: 8 + randomDelay() * 4,
                }}
              >
                404
              </motion.div>
            ))}

            {/* ASCII/Symbol glitch overlay */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden opacity-10">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={`glitch-${i}`}
                  className="absolute text-[6rem] md:text-[8rem] font-mono tracking-tighter leading-none text-indigo-400"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 0.8, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 0.3,
                    delay: randomDelay() + i * 0.2,
                    repeatDelay: 5 + randomDelay() * 5,
                  }}
                >
                  {glitchChars[Math.floor(Math.random() * glitchChars.length)]}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Main content */}
        <motion.h2
          className="text-2xl md:text-3xl font-bold mb-3 text-gray-800"
          variants={titleVariants}
        >
          Page Not Found
        </motion.h2>

        <motion.p
          className="text-gray-600 text-lg mb-10 max-w-md mx-auto"
          variants={itemVariants}
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved
          to another URL.
        </motion.p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Link
              href="/"
              className="group flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              tabIndex={0}
              aria-label="Return to homepage"
            >
              <Home
                size={18}
                className="transition-transform group-hover:-translate-y-1"
              />
              <span>Home</span>
            </Link>
          </motion.div>

          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <button
              onClick={handleGoBack}
              onKeyDown={handleKeyDown}
              className="group flex items-center gap-2 px-6 py-3 rounded-lg bg-white hover:bg-gray-50 text-gray-700 font-medium border border-gray-200 transition-all focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2"
              tabIndex={0}
              aria-label="Go back to previous page"
            >
              <ArrowLeft
                size={18}
                className="transition-transform group-hover:-translate-x-1"
              />
              <span>Go Back</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Footer with subtle code aesthetic */}
      <div className="absolute bottom-4 w-full text-center text-gray-400 text-sm font-mono">
        <code className="px-2 py-1 rounded bg-gray-50 text-xs border border-gray-100">
          err_code: 404 | path_not_found
        </code>
      </div>
    </motion.div>
  );
}
