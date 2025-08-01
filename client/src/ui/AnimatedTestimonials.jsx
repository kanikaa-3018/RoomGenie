import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import React from "react";

export const AnimatedTestimonials = ({ testimonials, autoplay = false }) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const randomRotateY = () => Math.floor(Math.random() * 21) - 10;

  return (
    <div className="mx-auto max-w-sm px-4 py-20 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12">
      <div className="relative grid grid-cols-1 gap-20 md:grid-cols-2">
        {/* Image Slider */}
        <div>
          <div className="relative h-80 w-full overflow-hidden rounded-3xl">
            <AnimatePresence mode="wait">
              <motion.img
                key={testimonials[active].src}
                src={testimonials[active].src}
                alt={testimonials[active].name}
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  rotate: randomRotateY(),
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  rotate: -randomRotateY(),
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
            </AnimatePresence>
          </div>
        </div>

        {/* Text Block */}
        <div className="flex flex-col justify-between py-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <h3 className="text-2xl font-bold text-black dark:text-white">
                {testimonials[active].name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-neutral-500">
                {testimonials[active].designation}
              </p>
              <motion.p className="mt-8 text-lg text-gray-500 dark:text-neutral-300">
                {testimonials[active].quote.split(" ").map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                    animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.2,
                      ease: "easeInOut",
                      delay: 0.02 * index,
                    }}
                    className="inline-block"
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex gap-4 pt-12 md:pt-0">
            <button
              onClick={handlePrev}
              className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800"
            >
              <IconArrowLeft className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:rotate-12 dark:text-neutral-400" />
            </button>
            <button
              onClick={handleNext}
              className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800"
            >
              <IconArrowRight className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:-rotate-12 dark:text-neutral-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
