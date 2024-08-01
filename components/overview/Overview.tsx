"use client"

import "./overview.css";
import { useRef } from "react";
import { useInView, motion } from "framer-motion";
import peopleImg from "../../assets/people.webp";
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
      className="overview "
      variants={variants}
      initial="initial"
      ref={ref}
      animate={isInView && "animate"}
    >
      <motion.div className="textContainer" variants={variants}>
        <p>
          We focus on helping your brand grow
          <br /> and move forward
        </p>
        <hr />
      </motion.div>
      <motion.div className="titleContainer" variants={variants}>
        <div className="title">
          <Image src={peopleImg} alt="" />
          <h1>
            <motion.b whileHover={{ color: "#ff00fe" }}>Unique</motion.b>{" "}
            Solutions
          </h1>
        </div>
        <div className="title">
          <h1>
            <motion.b whileHover={{ color: "#119A46" }}>For your</motion.b>{" "}
            Business.
          </h1>
          <button>WHAT WE DO?</button>
        </div>
      </motion.div>
      <motion.div className="listContainer" variants={variants}>
        <p>
          Saheda Consulting LLC is established in the Emirate of Dubai in 2023.
          The vision of Saheda Consulting is to provide ghost
          consultancy/support consulting services for major consulting
          organizations in the field of engineering, management and information
          technology.
          <br />
          <br />
          It is also envisioned to provide direct services for clients
          especially real estate, government, schools and other private
          organization.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Overview;
