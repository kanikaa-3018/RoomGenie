import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-[#FCECCD] h-[100dvh] w-full flex flex-col px-6 md:px-20 py-6">
      {/* Navbar */}
      <nav className="flex justify-between items-center text-[#794E3C]">
        <div className="text-2xl font-bold" style={{ fontFamily: "Virgil" }}>
          RoomGenie
        </div>
        <ul
          className="hidden md:flex gap-10 text-lg font-medium"
          style={{ fontFamily: "Virgil" }}
        >
          <li className="hover:font-bold cursor-pointer">Home</li>
          <li className="hover:font-bold cursor-pointer">About</li>
          <li className="hover:font-bold cursor-pointer">How it Works</li>
        </ul>
        <button className="bg-[#DA5444] hover:bg-[#c14435] text-white font-semibold py-2 px-6 rounded-xl text-sm shadow-md">
          Let's Start
        </button>
      </nav>

      {/* Hero Content */}
      <div className="flex-1 flex flex-col justify-center items-center text-center gap-10 z-10">
        {/* Text Flex */}
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-[#794E3C] max-w-4xl">
            Where{" "}
            <span className="text-[#DA5444]" style={{ fontFamily: "Virgil" }}>
              roommates
            </span>{" "}
            click — and{" "}
            <span className="text-[#DA5444]" style={{ fontFamily: "Virgil" }}>
              comfort
            </span>{" "}
            meets home.
          </h1>

          <p className="text-[#5B3F33] text-lg md:text-xl max-w-2xl self-center">
            Let RoomGenie find your match with just 5 chill questions. No drama,
            no awkwardness — just vibing with the right roomie.
          </p>
        </div>

        {/* CTA Flex */}
        {/* CTA Flex */}
        <div className="flex gap-6 flex-wrap justify-center">
          <button
            onClick={() => navigate("/onboarding")}
            className="bg-[#DA5444] hover:bg-[#c14435] text-white font-semibold py-3 px-8 rounded-xl text-lg shadow-md"
          >
            Sign Up
          </button>
          <button
            onClick={() => navigate("/login")}
            className="bg-[#412426] hover:bg-[#2f1a13] text-white font-semibold py-3 px-8 rounded-xl text-lg shadow-md"
          >
            Log In
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
