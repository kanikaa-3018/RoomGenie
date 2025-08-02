import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";

const lilac = "#b57bdb";
const grayText = "#5a5a5a";
const bgGray = "#f6f6f6";

const Hero = () => {
  return (
    <section>
      <header className="bg-white">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">
            <div className="flex items-center flex-shrink-0">
              <a href="#" title="" className="inline-flex">
                <span className="text-black font-medium"> RG </span>
              </a>
            </div>

            <div className="hidden lg:flex lg:justify-start lg:ml-16 lg:space-x-8 xl:space-x-14">
              <a
                href="#"
                title=""
                className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none hover:text-gray-700 focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              >
                {" "}
                Our Features{" "}
              </a>

              <a
                href="#"
                title=""
                className="text-base font-medium text-gray-900 transition-all duration-200 rounded hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              >
                {" "}
                User FLow{" "}
              </a>

              <a
                href="#"
                title=""
                className="text-base font-medium text-gray-900 transition-all duration-200 rounded hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              >
                {" "}
                testimonials{" "}
              </a>
            </div>

            <div className="flex items-center justify-end ml-auto">
              <div className="hidden lg:flex lg:items-center lg:space-x-8">
                <Link
                  to="/onboarding"
                  title=""
                  className="text-base font-medium text-gray-900 transition-all duration-200 rounded hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                >
                  {" "}
                  Find Your Match{" "}
                </Link>

                <Link
                  to="/login"
                  title=""
                  className="text-base font-medium text-gray-900 transition-all duration-200 rounded hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                >
                  {" "}
                  Login{" "}
                </Link>
              </div>

              {/* <div className="flex items-center justify-end space-x-5">
                <button
                  type="button"
                  className="p-2 -m-2 text-gray-900 transition-all duration-200 lg:hidden hover:text-gray-700"
                >
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>

                <button
                  type="button"
                  className="relative p-2 -m-2 text-gray-900 transition-all duration-200 hover:text-gray-700"
                >
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>

                  <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-indigo-600 rounded-full">
                    {" "}
                    3{" "}
                  </span>
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </header>

      <div class="relative py-12 overflow-hidden bg-gray-100 sm:py-16 lg:py-20 xl:py-24">
        <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div class="flex flex-col">
            <div class="max-w-md mx-auto text-center xl:max-w-lg lg:mx-0 lg:text-left">
              <h1 class="text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl lg:leading-tight xl:text-4xl">
                Meet Your Perfect Roommate
              </h1>
              <h1
                class="text-3xl font-bold text-[#B38FB5] sm:text-4xl md:text-5xl lg:leading-tight xl:text-8xl"
                style={{ fontFamily: "Bebas Neue, sans-serif" }}
              >
                In Minutes
              </h1>
              <h1
                class="text-3xl font-bold text-[#563f57] sm:text-4xl md:text-5xl lg:leading-tight xl:text-8xl"
                style={{ fontFamily: "Bebas Neue, sans-serif" }}
              >
                Not months
              </h1>
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
                  <p class="mt-2 text-base font-medium text-gray-500">
                    Users
                  </p>
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
