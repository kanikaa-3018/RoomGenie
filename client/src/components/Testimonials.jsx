import { AnimatedTestimonials } from "../ui/AnimatedTestimonials";
import React from "react";

function Testimonials() {
  const testimonials = [
    {
      name: "Jane Doe",
      designation: "Product Designer",
      quote: "This product completely changed the way I work. I love it!",
      src: "https://source.unsplash.com/random/400x400?person-1",
    },
    {
      name: "John Smith",
      designation: "Software Engineer",
      quote: "Elegant design and great usability. Would recommend 100%.",
      src: "https://source.unsplash.com/random/400x400?person-2",
    },
  ];

  return <AnimatedTestimonials testimonials={testimonials} autoplay />;
}

export default Testimonials;
