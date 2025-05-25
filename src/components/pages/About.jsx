/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profile from "../../assets/profile.jpg";
gsap.registerPlugin(ScrollTrigger);

function About() {
  const founderRef = useRef(null);

  useEffect(() => {
    // Select the scrollable element (if not using the body)
    const scroller = document.querySelector(".main-scroll-container");

    // Animation for the background image and overlay text
    gsap.from(".img", {
      opacity: 0,
      y: -100,
      duration: 1,
      ease: "power1.out",
      scrollTrigger: {
        trigger: ".img",
        start: "top 80%",
        scroller: scroller || null,  // Use the custom scroll container if it exists
      },
    });

    // Animation for the About Us section
    gsap.from(".about-text", {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power1.out",
      scrollTrigger: {
        trigger: ".about-text",
        start: "top 80%",
        scroller: scroller || null,
      },
    });

    // Animation for the founder images and text
    // Fix: Animate on mount if in viewport, not only on scroll
    if (founderRef.current) {
      gsap.from(founderRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power1.out",
        stagger: 0.3,
        scrollTrigger: {
          trigger: founderRef.current,
          start: "top 90%",
          scroller: scroller || null,
          toggleActions: "play none none none",
        },
      });
    }
  }, []);

  return (
    <div className="main-scroll-container w-full min-h-screen flex flex-col bg-gradient-to-br from-green-100 via-green-200 to-green-300">
      {/* Hero Section */}
      <div className="w-full flex flex-col items-center">
        <div
          className="img w-full md:w-4/5 h-[45vh] bg-cover bg-center rounded-2xl shadow-xl mt-8 relative overflow-hidden"
          style={{ backgroundImage: `url("../../../images/about.png")` }}
        >
          <div className="overlay absolute inset-0 flex flex-col justify-center items-center text-white font-bold text-3xl gap-4 bg-black bg-opacity-60 rounded-2xl">
            <div className="flex items-center gap-2">
              <a href="/" className="text-blue-300 underline hover:text-blue-400 transition">
                Home
              </a>
              <span className="mx-2">/</span>
              <span>About</span>
            </div>
            <p className="text-lg font-normal text-gray-200 mt-2 max-w-xl text-center">
              Discover the story and people behind HomeRemedy.in
            </p>
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div className="flex flex-col justify-center items-center w-full md:w-4/5 mx-auto h-auto p-8 mt-10 bg-white bg-opacity-90 rounded-xl shadow-lg">
        <span className="w-full text-3xl font-bold text-center about-text text-green-800 mb-2 tracking-wide">
          About Us
        </span>
        <span className="w-full text-center mt-2 text-gray-700 about-text leading-relaxed text-lg">
          HomeRemedy.in was born in 2024 when three college students participated in the Sistech Hackathon. The challenge was to create a web application that could have a positive impact on society. Motivated by the opportunity to make a difference, they developed a platform where users can share and explore homemade remedies for various ailments. This initiative not only impressed the judges but also laid the foundation for a community-driven platform that empowers individuals to leverage traditional knowledge for health and well-being.
        </span>
        <button
          className="mt-6 px-6 py-2 bg-green-500 text-white rounded-full shadow hover:bg-green-600 transition font-semibold text-lg"
          onClick={() => window.location.href = "/contact"}
        >
          Contact Us
        </button>
      </div>

      {/* Divider */}
      <div className="w-full flex justify-center my-10">
        <div className="w-2/3 h-1 bg-gradient-to-r from-green-400 via-green-200 to-green-400 rounded-full opacity-60"></div>
      </div>

      {/* Founders Section */}
      <div className="w-full flex flex-col items-center">
        <h1 className="text-3xl font-bold text-center text-green-800 mb-6 tracking-wide drop-shadow">
          Founders
        </h1>
        <div
          className="flex flex-wrap justify-center items-center gap-10"
          ref={founderRef}
        >
          <div className="flex flex-col items-center founder bg-white bg-opacity-95 rounded-2xl shadow-xl p-8 transition transform hover:scale-105 hover:shadow-2xl duration-300">
            <img
              className="rounded-full w-36 h-36 border-4 border-green-400 shadow-md object-cover"
              src={profile}
              alt="Sarthak Vyas"
            />
            <p className="font-semibold underline mt-4 text-green-700 text-lg">
              <a
                href="https://www.linkedin.com/in/sarthak-vyas-/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-900 transition"
              >
                Sarthak Vyas
              </a>
            </p>
            <p className="text-center text-gray-700 mt-2">
              Founder and CEO of HomeRemedy.org
            </p>
            <a
              href="mailto:sarthak@example.com"
              className="mt-4 px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium hover:bg-green-200 transition"
            >
              Email
            </a>
          </div>
          {/* Add more founders here if needed */}
        </div>
      </div>
      {/* Footer */}
      <footer className="w-full text-center text-gray-500 text-sm mt-12 mb-4">
        &copy; {new Date().getFullYear()} HomeRemedy.in &mdash; All rights reserved.
      </footer>
    </div>
  );
}

export default About;
