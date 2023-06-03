/* eslint-disable react/no-unescaped-entities */
"use client";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.5, duration: 0.5 } },
  };

  const titleVariants = {
    hidden: { y: "-100vh" },
    visible: { y: 0, transition: { type: "spring", stiffness: 50 } },
  };

  const linkVariants = {
    hidden: { scale: 0 },
    visible: { scale: 1, transition: { type: "spring", delay: 1.5 } },
  };

  return (
    <>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-1">
        <LoadingSpinner />
      </div>
      <motion.div
        className="flex flex-col items-center justify-center h-screen w-[99%] rounded-md bg-[#2e2e52] z-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-6xl font-bold text-white mb-4"
          variants={titleVariants}
        >
          404 - Nous avons pas trouver la page
        </motion.h1>
        <motion.p className="text-2xl text-white mb-6" variants={titleVariants}>
          Désolé, la page que vous recherchez n'existe pas.
        </motion.p>
        <Link href="/">
          <motion.div
            className="text-2xl text-white underline"
            variants={linkVariants}
          >
            Retournez à la page d'accueil
          </motion.div>
        </Link>
      </motion.div>
    </>
  );
}
