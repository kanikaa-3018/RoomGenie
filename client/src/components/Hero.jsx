// import React from "react";
// import { useNavigate } from "react-router-dom";

// const Hero = () => {
//   const navigate = useNavigate();

//   return (
//     <section className="bg-[#e5e5e5] h-[100dvh] w-full flex flex-col overflow-hidden relative">
//       {/* Decorative Images */}
//       <img
//         src="/assets/images/illus1.png"
//         alt="Right decoration"
//         className="absolute bottom-[-25px] left-[-25px] scale-[1.45] max-w-none w-60 md:w-80 opacity-100 z-0 pointer-events-none"
//       />
//       <img
//         src="/assets/images/illus2.png"
//         alt="Right decoration"
//         className="absolute bottom-[-25px] right-[25px] scale-150 md:scale-175 max-w-none w-60 md:w-80 opacity-100 z-0 pointer-events-none"
//       />

//       <img
//         src="/assets/images/doodle-1.png"
//         alt="Left decoration"
//         className="absolute bottom-[150px] left-[180px] max-w-none w-[60px] md:w-80 opacity-100 z-0 pointer-events-none"
//       />
//       <img
//         src="/assets/images/doodle-2.png"
//         alt="Right decoration"
//         className="absolute scale-[0.5] bottom-[250px] right-[250px] max-w-none w-[100px] md:w-80 opacity-100 z-0 pointer-events-none"
//       />

//       {/* Navbar */}
//       <nav className="flex justify-between items-center text-[#794E3C] px-12 py-8">
//         <div className="text-2xl font-bold" style={{ fontFamily: "Virgil" }}>
//           RoomGenie
//         </div>
//         <ul
//           className="hidden md:flex gap-10 text-lg font-medium"
//           style={{ fontFamily: "Virgil" }}
//         >
//           <li className="hover:font-bold cursor-pointer">Home</li>
//           <li className="hover:font-bold cursor-pointer">About</li>
//           <li className="hover:font-bold cursor-pointer">How it Works</li>
//         </ul>
//         <button className="bg-[#DA5444] hover:bg-[#c14435] text-white font-semibold py-2 px-6 rounded-xl text-sm shadow-md">
//           Let's Start
//         </button>
//       </nav>

//       {/* Centered Hero Content */}
//       <div className="flex-1 flex justify-center pt-28 z-10">
//         <div className="flex flex-col gap-10 items-center text-center">
//           {/* Heading and Subheading */}
//           <div className="flex flex-col gap-6">
//             <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-[#35012c] max-w-4xl">
//               Where{" "}
//               <span className="text-[#006d77]" style={{ fontFamily: "Virgil" }}>
//                 roommates
//               </span>{" "}
//               click — and{" "}
//               <span className="text-[#006d77]" style={{ fontFamily: "Virgil" }}>
//                 comfort
//               </span>{" "}
//               meets home.
//             </h1>
//             <p className="text-[#3c096c] text-lg md:text-xl max-w-2xl self-center">
//               Let RoomGenie find your match with just 5 chill questions. No
//               drama, no awkwardness — just vibing with the right roomie.
//             </p>
//           </div>

//           {/* CTA Buttons */}
//           <div className="flex gap-6 flex-wrap justify-center">
//             <button
//               onClick={() => navigate("/signup")}
//               className="bg-[#DA5444] hover:bg-[#c14435] text-white font-semibold py-3 px-8 rounded-xl text-lg shadow-md"
//             >
//               Sign Up
//             </button>
//             <button
//               onClick={() => navigate("/login")}
//               className="bg-[#412426] hover:bg-[#2f1a13] text-white font-semibold py-3 px-8 rounded-xl text-lg shadow-md"
//             >
//               Log In
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;

import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section
      className="h-[100dvh] w-full flex flex-col overflow-hidden relative"
      style={{
        backgroundImage: "url('/assets/images/background%20img.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#FCECCD", // fallback / tint
      }}
    >
      {/* Optional tinted overlay to keep text legible */}
      <div className="absolute inset-0 bg-[#FCECCD]/80 z-0"></div>
      {/* Decorative Images */}
      <img
        src="/assets/images/illus1.png"
        alt="Right decoration"
        className="absolute bottom-[-25px] left-[-25px] scale-[1.45] max-w-none w-60 md:w-80 opacity-100 z-0 pointer-events-none"
      />
      <img
        src="/assets/images/illus2.png"
        alt="Right decoration"
        className="absolute bottom-[-25px] right-[25px] scale-150 md:scale-175 max-w-none w-60 md:w-80 opacity-100 z-0 pointer-events-none"
      />

      <img
        src="/assets/images/backgroundimg.png"
        alt="Right decoration"
        className="absolute bottom-[-50px] right-[25px] scale-150 md:scale-175 max-w-none w-60 md:w-80 opacity-100 z-0 pointer-events-none"
      />

      <img
        src="/assets/images/doodle-1.png"
        alt="Left decoration"
        className="absolute bottom-[150px] left-[180px] max-w-none w-[60px] md:w-80 opacity-100 z-0 pointer-events-none"
      />
      <img
        src="/assets/images/doodle-2.png"
        alt="Right decoration"
        className="absolute scale-[0.5] bottom-[250px] right-[250px] max-w-none w-[100px] md:w-80 opacity-100 z-0 pointer-events-none"
      />
      {/* Navbar */}
      <nav className="flex justify-between items-center text-[#794E3C] px-12 py-8 z-10">
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
      {/* Centered Hero Content */}
      <div className="flex-1 flex justify-center pt-28 z-10">
        <div className="flex flex-col gap-10 items-center text-center">
          {/* Heading and Subheading */}
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-[#35012c] max-w-4xl">
              Where{" "}
              <span className="text-[#006d77]" style={{ fontFamily: "Virgil" }}>
                roommates
              </span>{" "}
              click — and{" "}
              <span className="text-[#006d77]" style={{ fontFamily: "Virgil" }}>
                comfort
              </span>{" "}
              meets home.
            </h1>
            <p className="text-[#3c096c] text-lg md:text-xl max-w-2xl self-center">
              Let RoomGenie find your match with just 5 chill questions. No
              drama, no awkwardness — just vibing with the right roomie.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-6 flex-wrap justify-center">
            <button
              onClick={() => navigate("/signup")}
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
      </div>
    </section>
  );
};

export default Hero;
