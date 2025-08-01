import React from "react";
import Hero from "../components/Hero";
import StepsSection from "../components/StepsSection";
import { BentoGrid } from "../ui/BentoGrid";

const Home = () => {
  return (
    <div>
      <Hero />
      <BentoGrid />
    </div>
  );
};

export default Home;
