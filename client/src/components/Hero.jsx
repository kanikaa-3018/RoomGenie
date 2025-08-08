import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const lilac = "#b57bdb";
const grayText = "#5a5a5a";
const bgGray = "#f6f6f6";

const Hero = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <section id="#">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0">
              <a href="#" title="" className="inline-flex">
                <span className="text-black font-semibold text-lg"> RG </span>
              </a>
            </div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex lg:justify-start lg:ml-16 lg:space-x-8 xl:space-x-14">
              <a href="#bento-grid" className="nav-link">
                Our Features
              </a>
              <a href="#vertical-accordion" className="nav-link">
                User Flow
              </a>
              <a href="#animated-testimonials" className="nav-link">
                Testimonials
              </a>
            </div>

            {/* Desktop Buttons */}
            <div className="hidden lg:flex items-center space-x-6 ml-auto">
              <Link
                to="/onboarding"
                className="px-5 py-2.5 text-sm font-semibold text-white bg-[#B38FB5] rounded-full transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#b497bd]"
              >
                Find Your Match
              </Link>

              <Link
                to="/login"
                className="px-5 py-2.5 text-sm font-semibold text-[#563f57] bg-white border-2 border-[#563f57] rounded-full transition-all duration-300 hover:bg-[#f5eff9] hover:text-[#8a6a9e] hover:shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#b497bd]"
              >
                Login
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 text-gray-700 hover:text-black focus:outline-none"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        {mobileMenuOpen && (
          <div className="lg:hidden px-4 pb-4">
            <nav className="space-y-4 mt-4">
              <a href="#bento-grid" className="block text-gray-800 font-medium">
                Our Features
              </a>
              <a
                href="#vertical-accordion"
                className="block text-gray-800 font-medium"
              >
                User Flow
              </a>
              <a
                href="#animated-testimonials"
                className="block text-gray-800 font-medium"
              >
                Testimonials
              </a>
              <Link
                to="/onboarding"
                className="block w-full text-center px-4 py-2 mt-4 text-white bg-[#B38FB5] rounded-full font-semibold"
              >
                Find Your Match
              </Link>
              <Link
                to="/login"
                className="block w-full text-center px-4 py-2 mt-2 text-[#563f57] border border-[#563f57] rounded-full font-semibold"
              >
                Login
              </Link>
            </nav>
          </div>
        )}
      </header>

      <div class="relative py-12 overflow-hidden bg-gray-100 sm:py-16 lg:py-20 xl:py-24">
        <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div class="flex flex-col">
            <div class="max-w-md mx-auto text-center xl:max-w-lg lg:mx-0 lg:text-left">
              <h1 class="text-3xl font-bold text-gray-900 sm:text-2xl md:text-3xl lg:leading-tight xl:text-4xl">
                Meet Your Perfect Roommate
              </h1>
              <div
  className="flex flex-row sm:flex-row md:flex-col gap-2 items-center justify-center mt-4 text-center  lg:items-start"
>
  <h1
    className="text-3xl font-bold text-[#B38FB5] sm:text-4xl md:text-5xl xl:text-8xl"
    style={{ fontFamily: "Bebas Neue, sans-serif" }}
  >
    In Minutes
  </h1>
  <h1
    className="text-3xl font-bold text-[#563f57] sm:text-4xl md:text-5xl xl:text-8xl"
    style={{ fontFamily: "Bebas Neue, sans-serif" }}
  >
    Not months
  </h1>
</div>


              <p class="mt-5 text-lg font-medium text-gray-900 lg:mt-8">
                RoomGenie intelligently matches you based on lifestyle, habits,
                and personal preferences — not just age or location.
              </p>

              <div className="mt-8 lg:mt-10">
                <Link
                  to="/onboarding"
                  className="inline-flex items-center justify-center px-8 py-3 text-base font-bold leading-7 text-white transition-all duration-200 bg-gray-900 border border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 font-pj hover:bg-gray-600"
                >
                  Find your perfect match
                </Link>
              </div>

              <div class="mt-8 lg:mt-12">
                <svg
                  class="w-auto h-4 mx-auto text-gray-300 lg:mx-0"
                  viewBox="0 0 172 16"
                  fill="none"
                  stroke="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    y1="-0.5"
                    x2="18.0278"
                    y2="-0.5"
                    transform="matrix(-0.5547 0.83205 0.83205 0.5547 11 1)"
                  ></line>
                  <line
                    y1="-0.5"
                    x2="18.0278"
                    y2="-0.5"
                    transform="matrix(-0.5547 0.83205 0.83205 0.5547 46 1)"
                  ></line>
                  <line
                    y1="-0.5"
                    x2="18.0278"
                    y2="-0.5"
                    transform="matrix(-0.5547 0.83205 0.83205 0.5547 81 1)"
                  ></line>
                  <line
                    y1="-0.5"
                    x2="18.0278"
                    y2="-0.5"
                    transform="matrix(-0.5547 0.83205 0.83205 0.5547 116 1)"
                  ></line>
                  <line
                    y1="-0.5"
                    x2="18.0278"
                    y2="-0.5"
                    transform="matrix(-0.5547 0.83205 0.83205 0.5547 151 1)"
                  ></line>
                  <line
                    y1="-0.5"
                    x2="18.0278"
                    y2="-0.5"
                    transform="matrix(-0.5547 0.83205 0.83205 0.5547 18 1)"
                  ></line>
                  <line
                    y1="-0.5"
                    x2="18.0278"
                    y2="-0.5"
                    transform="matrix(-0.5547 0.83205 0.83205 0.5547 53 1)"
                  ></line>
                  <line
                    y1="-0.5"
                    x2="18.0278"
                    y2="-0.5"
                    transform="matrix(-0.5547 0.83205 0.83205 0.5547 88 1)"
                  ></line>
                  <line
                    y1="-0.5"
                    x2="18.0278"
                    y2="-0.5"
                    transform="matrix(-0.5547 0.83205 0.83205 0.5547 123 1)"
                  ></line>
                  <line
                    y1="-0.5"
                    x2="18.0278"
                    y2="-0.5"
                    transform="matrix(-0.5547 0.83205 0.83205 0.5547 158 1)"
                  ></line>
                  <line
                    y1="-0.5"
                    x2="18.0278"
                    y2="-0.5"
                    transform="matrix(-0.5547 0.83205 0.83205 0.5547 25 1)"
                  ></line>
                  <line
                    y1="-0.5"
                    x2="18.0278"
                    y2="-0.5"
                    transform="matrix(-0.5547 0.83205 0.83205 0.5547 60 1)"
                  ></line>
                  <line
                    y1="-0.5"
                    x2="18.0278"
                    y2="-0.5"
                    transform="matrix(-0.5547 0.83205 0.83205 0.5547 95 1)"
                  ></line>
                  <line
                    y1="-0.5"
                    x2="18.0278"
                    y2="-0.5"
                    transform="matrix(-0.5547 0.83205 0.83205 0.5547 130 1)"
                  ></line>
                  <line
                    y1="-0.5"
                    x2="18.0278"
                    y2="-0.5"
                    transform="matrix(-0.5547 0.83205 0.83205 0.5547 165 1)"
                  ></line>
                  <line
                    y1="-0.5"
                    x2="18.0278"
                    y2="-0.5"
                    transform="matrix(-0.5547 0.83205 0.83205 0.5547 32 1)"
                  ></line>
                  <line
                    y1="-0.5"
                    x2="18.0278"
                    y2="-0.5"
                    transform="matrix(-0.5547 0.83205 0.83205 0.5547 67 1)"
                  ></line>
                  <line
                    y1="-0.5"
                    x2="18.0278"
                    y2="-0.5"
                    transform="matrix(-0.5547 0.83205 0.83205 0.5547 102 1)"
                  ></line>
                  <line
                    y1="-0.5"
                    x2="18.0278"
                    y2="-0.5"
                    transform="matrix(-0.5547 0.83205 0.83205 0.5547 137 1)"
                  ></line>
                  <line
                    y1="-0.5"
                    x2="18.0278"
                    y2="-0.5"
                    transform="matrix(-0.5547 0.83205 0.83205 0.5547 172 1)"
                  ></line>
                  <line
                    y1="-0.5"
                    x2="18.0278"
                    y2="-0.5"
                    transform="matrix(-0.5547 0.83205 0.83205 0.5547 39 1)"
                  ></line>
                  <line
                    y1="-0.5"
                    x2="18.0278"
                    y2="-0.5"
                    transform="matrix(-0.5547 0.83205 0.83205 0.5547 74 1)"
                  ></line>
                  <line
                    y1="-0.5"
                    x2="18.0278"
                    y2="-0.5"
                    transform="matrix(-0.5547 0.83205 0.83205 0.5547 109 1)"
                  ></line>
                  <line
                    y1="-0.5"
                    x2="18.0278"
                    y2="-0.5"
                    transform="matrix(-0.5547 0.83205 0.83205 0.5547 144 1)"
                  ></line>
                </svg>
              </div>

              <div class="inline-grid grid-cols-2 mt-8 gap-x-8">
                <div>
                  <p class="text-4xl font-bold text-gray-900">500+</p>
                  <p class="mt-2 text-base font-medium text-gray-500">Users</p>
                </div>

                <div>
                  <p class="text-4xl font-bold text-gray-900">90% +</p>
                  <p class="mt-2 text-base font-medium text-gray-500">
                    Accurate
                  </p>
                </div>
              </div>
            </div>

            <div class="relative mt-12 lg:mt-0 lg:absolute lg:-translate-y-1/2 lg:translate-x-1/2 lg:top-1/2">
              <div class="relative w-full overflow-auto">
                <div class="flex gap-8 flex-nowrap">
                  <div class="flex-none w-full sm:w-2/3 lg:w-full lg:flex-1 whitespace-nowrap">
                    <div class="overflow-hidden bg-white rounded shadow-xl">
                      <div class="aspect-w-4 aspect-h-3">
                        <img
                          class="object-cover w-full h-full"
                          src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/hero/2/artwork-1.png"
                          alt=""
                        />
                      </div>
                      <div class="p-8">
                        <p class="text-lg font-bold text-gray-900">
                          Curated Shortlists & Admin Review
                        </p>
                        <p class="mt-6 text-xs font-medium tracking-widest text-gray-500 uppercase">
                          Our admin system ensures compatibility
                        </p>

                        <div class="grid grid-cols-2 mt-7 gap-x-4">
                          <a
                            href="#"
                            title=""
                            class="inline-flex items-center justify-center px-4 py-4 text-sm font-bold text-white transition-all duration-200 bg-gray-900 border border-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-700"
                            role="button"
                          >
                            Submit Shortlist
                          </a>

                          <a
                            href="#"
                            title=""
                            class="inline-flex items-center justify-center px-4 py-4 text-sm font-bold text-gray-900 transition-all duration-200 bg-transparent border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                            role="button"
                          >
                            Admin Process
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="flex-none w-full sm:w-2/3 lg:w-full lg:flex-1 whitespace-nowrap">
                    <div class="overflow-hidden bg-white rounded shadow-xl">
                      <div class="aspect-w-4 aspect-h-3">
                        <img
                          class="object-cover w-full h-full"
                          src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/hero/2/artwork-2.png"
                          alt=""
                        />
                      </div>
                      <div class="p-8">
                        <p class="text-lg font-bold text-gray-900">
                          Voice Based Preferences
                        </p>
                        <p class="mt-6 text-xs font-medium tracking-widest text-gray-500 uppercase">
                          Tell us about yourself
                        </p>

                        <div class="grid grid-cols-2 mt-7 gap-x-4">
                          <a
                            href="#"
                            title=""
                            class="inline-flex items-center justify-center px-4 py-4 text-sm font-bold text-white transition-all duration-200 bg-gray-900 border border-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-700"
                            role="button"
                          >
                            Start Onboarding
                          </a>

                          <a
                            href="#"
                            title=""
                            class="inline-flex items-center justify-center px-4 py-4 text-sm font-bold text-gray-900 transition-all duration-200 bg-transparent border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                            role="button"
                          >
                            Learn More
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="flex-none w-full sm:w-2/3 lg:w-full lg:flex-1 whitespace-nowrap">
                    <div class="overflow-hidden bg-white rounded shadow-xl">
                      <div class="aspect-w-4 aspect-h-3">
                        <img
                          class="object-cover w-full h-full"
                          src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/hero/2/artwork-3.png"
                          alt=""
                        />
                      </div>
                      <div class="p-8">
                        <p class="text-lg font-bold text-gray-900">
                          AI Compatibility Matching
                        </p>
                        <p class="mt-6 text-xs font-medium tracking-widest text-gray-500 uppercase">
                          Generates a multi-dimensional profile
                        </p>

                        <div class="grid grid-cols-2 mt-7 gap-x-4">
                          <a
                            href="#"
                            title=""
                            class="inline-flex items-center justify-center px-4 py-4 text-sm font-bold text-white transition-all duration-200 bg-gray-900 border border-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-700"
                            role="button"
                          >
                            Get Matched
                          </a>

                          <a
                            href="#"
                            title=""
                            class="inline-flex items-center justify-center px-4 py-4 text-sm font-bold text-gray-900 transition-all duration-200 bg-transparent border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                            role="button"
                          >
                            View How it Works
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
