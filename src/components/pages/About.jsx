import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function About() {
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
    gsap.from(".founder", {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power1.out",
      stagger: 0.3,
      scrollTrigger: {
        trigger: ".founder",
        start: "top 80%",
        scroller: scroller || null,
      },
    });
  }, []);

  return (
    <div className="main-scroll-container w-full min-h-screen flex flex-col">
      <div className="w-full">
        <div
          className="img w-full h-[50vh] bg-cover bg-center"
          style={{ backgroundImage: `url("../../../images/about.png")` }}
        >
          <p className="overlay flex justify-center items-center text-white font-bold text-2xl gap-4 w-full h-full bg-black bg-opacity-60">
            <a href="/" className="text-blue-300 underline">
              Home
            </a>
            About
          </p>
        </div>

        <div className="flex flex-col justify-center items-center w-full h-auto p-4">
          <span className="w-full md:w-1/2 text-2xl font-semibold text-center about-text">
            About Us
          </span>
          <span className="w-full md:w-1/2 text-center mt-4 about-text">
            HomeRemedy.in was born in 2024 when three college students
            participated in the Sistech Hackathon. The challenge was to create a
            web application that could have a positive impact on society.
            Motivated by the opportunity to make a difference, they developed a
            platform where users can share and explore homemade remedies for
            various ailments. This initiative not only impressed the judges but
            also laid the foundation for a community-driven platform that
            empowers individuals to leverage traditional knowledge for health
            and well-being.
          </span>
        </div>
      </div>

      <div className="w-full h-auto bg-slate-700 mt-8 p-4">
        <h1 className="text-2xl font-semibold text-center text-white p-4">
          Founders
        </h1>
        <div className="flex flex-wrap justify-center items-center gap-4">
          <div className="flex flex-col items-center founder">
            <img
              className="rounded-md w-40 h-40"
              src="https://media.licdn.com/dms/image/D5603AQH5rgrXmYTRVg/profile-displayphoto-shrink_400_400/0/1712716429252?e=1729123200&v=beta&t=uwQl6pYY-P0X_WAgbaT61nWhYlf5unJPBeeJX5OJFW8"
              alt="Sarthak Vyas"
            />
            <p className="font-semibold underline mt-2">
              <a href="https://www.linkedin.com/in/sarthak-vyas-/">
                Sarthak Vyas
              </a>
            </p>
            <p className="text-center">
              Co-founder and Chairman of HomeRemedy.org
            </p>
          </div>

          <div className="flex flex-col items-center founder">
            <img
              className="rounded-md w-40 h-40"
              src="https://media.licdn.com/dms/image/v2/D5603AQFWEEvRQA2O-A/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1718255276985?e=1729123200&v=beta&t=JuXd2Gq_1QXN5ZKRlQ3xsuNLMDPqMK6S0W3tTxEUh2Q"
              alt="Shivani Barya"
            />
            <p className="font-semibold underline mt-2">
              <a href="https://www.linkedin.com/in/shivani-barya-/">
                Shivani Barya
              </a>
            </p>
            <p className="text-center">
              HomeRemedy.in Co-founder and Chief Strategy Officer
            </p>
          </div>

          <div className="flex flex-col items-center founder">
            <img
              className="rounded-md w-40 h-40"
              src="https://media.licdn.com/dms/image/v2/D4D03AQFMNcwbML1I5A/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1723357631817?e=1729123200&v=beta&t=L9GTWtMDpkBLcoIwClHRWiKfwoiTXa1h55oAcuiQ_go"
              alt="Yash Sharma"
            />
            <p className="font-semibold underline mt-2">
              <a href="https://www.linkedin.com/in/yash-sharma-357064224/">
                Yash Sharma
              </a>
            </p>
            <p className="text-center">
              HomeRemedy.in Co-founder and Chief Executive Officer
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
