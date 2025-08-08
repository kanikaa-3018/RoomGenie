import { FiBarChart, FiBell, FiDollarSign, FiPlay } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { useWindowSize } from "./UseWindowSize.jsx";
import { useState } from "react";
import React from "react";
import long1 from "../../public/assets/images/long1.jpg";
import long2 from "../../public/assets/images/long2.jpg";
import long3 from "../../public/assets/images/long3.jpg";
import long4 from "../../public/assets/images/long4.png";
const VerticalAccordion = () => {
  const [open, setOpen] = useState(items[0].id);

  return (
    <section className="p-4 bg-[#d6bbd7]" id="vertical-accordion">
      <div className="mb-8 flex flex-col-reverse lg:flex-row items-start justify-start gap-6 px-4 md:px-8">
        <div className="flex flex-col lg:flex-row h-fit lg:h-[450px] w-full max-w-6xl mx-auto shadow overflow-hidden py-6 self-start">
          {items.map((item) => {
            return (
              <Panel
                key={item.id}
                open={open}
                setOpen={setOpen}
                id={item.id}
                Icon={item.Icon}
                title={item.title}
                imgSrc={item.imgSrc}
                description={item.description}
              />
            );
          })}
        </div>
        {/* <div
          className="flex flex-row justify-center items-center gap-3 pt-2 text-center 
                lg:flex-col lg:items-start lg:justify-around lg:text-left"
        >
          <h2 className="text-4xl font-bold md:text-7xl">MATCH.</h2>
          <h2 className="text-4xl font-bold md:text-7xl text-[#563f57]">
            CONNECT.
          </h2>
          <h2 className="text-4xl font-bold md:text-7xl">MOVE IN.</h2>
        </div> */}

        <div className="flex flex-col lg:flex-col items-center lg:items-start justify-around pt-2 text-center lg:text-left">
  {/* For lg and above – full vertical layout */}
  <div className="hidden lg:flex flex-col gap-3">
    <h2 className="text-4xl font-bold lg:text-7xl">MATCH.</h2>
    <h2 className="text-4xl font-bold lg:text-7xl text-[#563f57]">CONNECT.</h2>
    <h2 className="text-4xl font-bold lg:text-7xl">MOVE IN.</h2>
  </div>

  {/* For sm and md – single row, centered, short text */}
  <div className="flex lg:hidden flex-row flex-wrap gap-3 justify-center items-center">
    <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">MATCH.</h2>
    <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl text-[#563f57]">CONNECT.</h2>
    <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">MOVE IN.</h2>
  </div>
</div>

      </div>
    </section>
  );
};

const Panel = ({ open, setOpen, id, Icon, title, imgSrc, description }) => {
  const { width } = useWindowSize();
  const isOpen = open === id;

  return (
    <>
      <button
        className="bg-white hover:bg-slate-50 transition-colors p-3 border-r-[1px] border-b-[1px] border-slate-200 flex flex-row-reverse lg:flex-col justify-end items-center gap-4 relative group"
        onClick={() => setOpen(id)}
      >
        <span
          style={{
            writingMode: "vertical-lr",
          }}
          className="hidden lg:block text-xl font-light rotate-180"
        >
          {title}
        </span>
        <span className="block lg:hidden text-xl font-light">{title}</span>
        <div className="w-6 lg:w-full aspect-square bg-indigo-600 text-white grid place-items-center">
          <Icon />
        </div>
        <span className="w-4 h-4 bg-white group-hover:bg-slate-50 transition-colors border-r-[1px] border-b-[1px] lg:border-b-0 lg:border-t-[1px] border-slate-200 rotate-45 absolute bottom-0 lg:bottom-[50%] right-[50%] lg:right-0 translate-y-[50%] translate-x-[50%] z-20" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key={`panel-${id}`}
            variants={width && width > 1024 ? panelVariants : panelVariantsSm}
            initial="closed"
            animate="open"
            exit="closed"
            style={{
              backgroundImage: `url(${imgSrc})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className="w-full h-full overflow-hidden relative bg-black flex items-end"
          >
            <motion.div
              variants={descriptionVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="px-4 py-2 bg-black/40 backdrop-blur-sm text-white"
            >
              <p>{description}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VerticalAccordion;

const panelVariants = {
  open: {
    width: "100%",
    height: "100%",
  },
  closed: {
    width: "0%",
    height: "100%",
  },
};

const panelVariantsSm = {
  open: {
    width: "100%",
    height: "200px",
  },
  closed: {
    width: "100%",
    height: "0px",
  },
};

const descriptionVariants = {
  open: {
    opacity: 1,
    y: "0%",
    transition: {
      delay: 0.125,
    },
  },
  closed: { opacity: 0, y: "100%" },
};

const items = [
  {
    id: 1,
    title: "Set Preferences",
    Icon: FiDollarSign,
    imgSrc: long3,
    description:
      "Tell us about your lifestyle, habits, sleep schedule, cleanliness level, and other living preferences. We don’t match based on age or location — just real compatibility.",
  },
  {
    id: 2,
    title: "Smart Matching",
    Icon: FiPlay,
    imgSrc: long2,
    description:
      "Our AI compares your preferences with others to suggest roommates who complement your lifestyle and personality — think of it like a dating app, but for roommates.",
  },
  {
    id: 3,
    title: "Explore Profiles",
    Icon: FiBell,
    imgSrc: long4,
    description:
      "Browse through recommended profiles with key info on compatibility — no endless swiping. Just clean, meaningful details to help you decide quickly.",
  },
  {
    id: 4,
    title: "Connect & Chat",
    Icon: FiBarChart,
    imgSrc: long1,
    description:
      "Once you like a match, start chatting securely to break the ice. RoomGenie makes sure both sides are comfortable and aligned before moving in.",
  },
];
