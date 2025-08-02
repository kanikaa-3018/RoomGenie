import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import React from "react";

export const AnimatedTestimonials = ({ testimonials, autoplay = false }) => {
  const [active, setActive] = useState(0);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !message) return;
    // Submit logic here
    alert(`Thanks for reaching out!`);
    setEmail("");
    setMessage("");
  };

  return (
    <div className="mx-auto w-full px-4 py-20 font-sans antialiased md:px-8 lg:px-12 bg-[#d5bad6] mt-6">
      {/* Heading */}
      <div className="mb-16 text-center">
        <motion.h2
          className="text-4xl font-bold text-black "
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          HEAR WHAT OUR <span className="text-[#563f57]">USERS</span> SAY
        </motion.h2>
        <p className="mt-2 text-gray-600 ">Real feedback from our community</p>
      </div>

      {/* Testimonials */}
      <section className="w-full px-4rounded-lg">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-lg w-full py-4 grid grid-cols-1 gap-20 md:grid-cols-2">
            {/* Image Slider */}
            <div>
              <div className="relative h-80 w-full overflow-hidden rounded-3xl mt-2">
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
                  <h3 className="text-2xl font-bold text-black">
                    {testimonials[active].name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {testimonials[active].designation}
                  </p>
                  <motion.p className="mt-6 mb-4 text-lg text-gray-600">
                    {testimonials[active].quote
                      .split(" ")
                      .map((word, index) => (
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
                  className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-gray-100"
                >
                  <IconArrowLeft className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:rotate-12" />
                </button>
                <button
                  onClick={handleNext}
                  className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-gray-100"
                >
                  <IconArrowRight className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:-rotate-12" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <div className="mt-24 rounded-2xl bg-white/20 backdrop-blur-md p-6 shadow-xl border border-white/20">
  <h4 className="mb-4 text-xl font-semibold text-white">
    Want to discuss something?
  </h4>
  <form
    onSubmit={handleSubmit}
    className="space-y-4 md:flex md:space-y-0 md:gap-4 flex-wrap"
  >
    <input
      type="email"
      placeholder="Email"
      value={email}
      required
      onChange={(e) => setEmail(e.target.value)}
      className="w-full md:flex-1 rounded-lg text-gray-600 backdrop-blur-sm border border-white/30 px-4 py-2 text-sm  placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
    />
    <input
      type="text"
      placeholder="Message"
      value={message}
      required
      onChange={(e) => setMessage(e.target.value)}
      className="w-full md:flex-1 rounded-lg text-gray-600 backdrop-blur-sm border border-white/30 px-4 py-2 text-sm  placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
    />
    <button
      type="submit"
      className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2 text-sm font-semibold text-white hover:opacity-90 transition"
    >
      Submit
    </button>
  </form>
</div>

    </div>
  );
};
