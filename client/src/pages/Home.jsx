import React from "react";
import Hero from "../components/Hero";
import StepsSection from "../components/StepsSection";
import  BentoGrid  from "../ui/BentoGrid";
import VerticalAccordion from "../components/VerticalAccordion";
import Footer from "../ui/Footer";

const Home = () => {
  return (
    <div>
      <Hero />
      <VerticalAccordion />
      <BentoGrid />
      <Footer />
    </div>
  );
};

export default Home;
