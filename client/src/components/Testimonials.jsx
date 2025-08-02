import { AnimatedTestimonials } from "../ui/AnimatedTestimonials";
import React from "react";
import a from "../../public/assets/images/a.jpg";
import b from "../../public/assets/images/b.jpg";
import c from "../../public/assets/images/c.jpg";
import d from "../../public/assets/images/d.jpg";
import e from "../../public/assets/images/e.jpg"; // corrected e.jpg

function Testimonials() {
  const testimonials = [
    {
      name: "Ananya Gupta",
      designation: "UX Researcher",
      quote:
        " I was really nervous about moving to a new city alone, but Room Genie made it so much easier. The profile questions actually helped me find someone who shares my lifestyle and values. My roommate and I instantly clicked, and now we’re more like friends than just flatmates.",
      src: a,
    },
    {
      name: "Sakshi Mehta",
      designation: "AI Enthusiast",
      quote:
        "What I loved most about Room Genie is how safe and thoughtful the process felt. It wasn’t just random matching — the app really considered habits, routines, and preferences. I found a roommate who not only respects my space but also makes the house feel like home.",
      src: b,
    },
    {
      name: "Riya Kapoor",
      designation: "Marketing Strategist",
      quote: "Finding a roommate has always been stressful for me, but Room Genie changed that. The vibe test was surprisingly accurate, and I matched with someone who is just as tidy and easy-going as I am. It feels like living with a friend I’ve known for years.",
      src: c,
    },
    {
      name: "Niharika Joshi",
      designation: "Product Manager",
      quote:
        "Room Genie was a lifesaver. I didn’t want to take risks with unsafe or incompatible flatmates, and this platform gave me peace of mind. Within days, I was connected with someone who shares similar habits, and now our apartment feels so comfortable and welcoming.",
      src: d,
    },
    {
      name: "Tanya Bansal",
      designation: "Tech Blogger",
      quote: "I honestly wasn’t expecting much, but Room Genie exceeded my expectations. The process felt simple but really smart, and I was matched with someone I genuinely get along with. We cook together, respect each other’s boundaries, and I couldn’t have asked for a better roommate.",
      src: e,
    },
  ];

  return <AnimatedTestimonials testimonials={testimonials} autoplay />;
}

export default Testimonials;
