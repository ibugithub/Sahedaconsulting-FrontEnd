"use client"

import { useRef } from "react";
import { useInView, motion } from "framer-motion";
import peopleImg from "../../../assets/people.webp";
import Image from "next/image";

const variants = {
  initial: {
    x: -500,
    y: 100,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      staggerChildren: 0.1,
    },
  },
};

const Overview = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-100px" });

  return (
    <motion.div
      className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-[#0c0c1d] to-[#111132] text-[#ececec] p-5 overflow-hidden"
      variants={variants}
      initial="initial"
      ref={ref}
      animate={isInView && "animate"}
    >
      <motion.div className="flex-1 flex items-center justify-end mt-24 pr-5 space-x-5 animate-fadeIn" variants={variants}>
        <div className="flex flex-col items-end space-y-5">
          <p className="text-[#aaa] text-xl font-light text-right">
            We focus on helping your brand grow
            <br /> and move forward
          </p>
          <hr className="w-[400px] border-t border-[#555] animate-grow" />
        </div>
      </motion.div>

      <motion.div className="flex-2 flex flex-col items-center justify-center space-y-5 text-center" variants={variants}>
        <div className="flex items-center justify-center space-x-5">
          <Image
            src={peopleImg}
            alt=""
            className="w-[200px] h-[200px] rounded-full object-cover shadow-lg transition-transform duration-300 ease-in-out hover:scale-110"
          />
          <h1 className="text-4xl md:text-6xl font-light text-white animate-slideIn">
            <motion.b whileHover={{ color: "#ff00fe" }}>Unique</motion.b> Solutions
          </h1>
        </div>
        <div className="flex items-center justify-center space-x-5">
          <h1 className="text-4xl md:text-6xl font-light text-white animate-slideIn">
            <motion.b whileHover={{ color: "#119A46" }}>For your</motion.b> Business.
          </h1>
          <button className="w-[200px] h-[50px] rounded-full bg-[#ff6600] text-white text-lg font-medium shadow-lg transition duration-300 ease-in-out hover:bg-[#e65c00] hover:scale-105">
            WHAT WE DO?
          </button>
        </div>
      </motion.div>

      <motion.div className="flex-2 flex max-w-[1366px] mx-auto p-5 animate-fadeIn" variants={variants}>
        <p className="text-[#ccc] text-lg md:text-xl font-light leading-relaxed">
          Saheda Consulting LLC is established in the Emirate of Dubai in 2023. The vision of Saheda Consulting is to provide ghost
          consultancy/support consulting services for major consulting organizations in the field of engineering, management and information technology.
          <br />
          <br />
          It is also envisioned to provide direct services for clients especially real estate, government, schools, and other private organizations.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Overview;
