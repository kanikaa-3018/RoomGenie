import { motion as Motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export const StepCard = ({ img, step }) => {
  return (
    <Motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="group w-full cursor-pointer overflow-hidden relative card h-[400px] rounded-xl shadow-xl flex flex-col justify-end p-6 border border-transparent bg-white hover:bg-[#f8f4f0] transition-all duration-500"
    >
      <img
        src={img}
        alt={step.title}
        className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-28 object-contain z-10"
      />
      <div className="z-20 text-center mt-auto">
        <h3 className="text-xl font-bold text-[#794E3C]">{step.title}</h3>
        <p className="text-sm text-[#412426] mt-2">{step.subtitle}</p>
      </div>
    </Motion.div>
  );
};

export default StepCard;
