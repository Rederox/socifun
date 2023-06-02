"use client";

import React from "react";
import { MoonLoader } from "react-spinners";
import { motion } from "framer-motion";
import "../styles/Loading.css";

const textVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
};

const LoadingPage: React.FC = () => {
  return (
    <div className="w-[99%] rounded-md h-screen flex flex-col items-center justify-center bg-[#2e2e52] z-20 text-white">
      <motion.div initial="hidden" animate="visible" variants={textVariants}>
        <h1 className="text-4xl font-bold mb-4">Socifun</h1>
      </motion.div>
      {/* <MoonLoader color="#3b82f6" loading={true} size={50} /> */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={textVariants}
        aria-label="Orange and tan hamster running in a metal wheel"
        role="img"
        className="wheel-and-hamster"
      >
        <div className="wheel"></div>
        <div className="hamster">
          <div className="hamster__body">
            <div className="hamster__head">
              <div className="hamster__ear"></div>
              <div className="hamster__eye"></div>
              <div className="hamster__nose"></div>
            </div>
            <div className="hamster__limb hamster__limb--fr"></div>
            <div className="hamster__limb hamster__limb--fl"></div>
            <div className="hamster__limb hamster__limb--br"></div>
            <div className="hamster__limb hamster__limb--bl"></div>
            <div className="hamster__tail"></div>
          </div>
        </div>
        <div className="spoke"></div>
      </motion.div>
      <motion.div initial="hidden" animate="visible" variants={textVariants}>
        <p className="text-xl mt-4">Loading content, please wait...</p>
      </motion.div>
    </div>
  );
};

export default LoadingPage;
