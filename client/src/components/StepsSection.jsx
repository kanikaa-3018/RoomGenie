import StepCard from "../ui/StepCard";
import React from "react";

const steps = [
  {
    title: "Set Up Your Profile",
    subtitle:
      "Tell us your lifestyle, preferences, and what kind of roomie you want.",
    img: "/assets/images/step1.png",
  },
  {
    title: "Take the Vibe Test",
    subtitle: "5 quick, thoughtful questions — no stress, just vibes.",
    img: "/assets/images/step2.png",
  },
  {
    title: "Get Matched Instantly",
    subtitle: "Our algorithm finds your best-fit roommates effortlessly.",
    img: "/assets/images/step3.png",
  },
  {
    title: "Connect & Choose",
    subtitle: "View matches, chat freely, and pick the right person for you.",
    img: "/assets/images/step4.png",
  },
];

const StepsSection = () => {
  return (
    <section className="bg-[#FCECCD] py-16 px-6 md:px-20">
      <h2 className="text-3xl font-bold text-[#412426] text-center mb-12">
        How It Works
      </h2>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-10 flex-wrap">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center gap-6">
            <StepCard img={step.img} step={step} />
            {index !== steps.length - 1 && (
              <img
                src="/assets/images/right-arrow.png"
                alt="Arrow"
                className="w-[48px] h-[48px] scale-150 hidden md:block "
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default StepsSection;
