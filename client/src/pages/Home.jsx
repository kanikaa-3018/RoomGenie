import React from "react";
import Hero from "../components/Hero";
import StepsSection from "../components/StepsSection";
import { BentoGrid } from "../ui/BentoGrid";
import VerticalAccordion from "../components/VerticalAccordion";

const Home = () => {
  return (
    <div>
      <Hero />
      <BentoGrid />
      <VerticalAccordion/>
    </div>
  );
};

export default Home;
