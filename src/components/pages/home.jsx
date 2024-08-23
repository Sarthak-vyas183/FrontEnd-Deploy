import React, { useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function Home() {
  useEffect(() => {
    const context = gsap.context(() => {
      gsap.from(".left div", {
        x: -500,
        opacity: 0,
        duration: 0.7,
        stagger: 0.3,
      });
    });

    return () => context.revert();
  }, []);

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.to("#nav-header", {
        opacity: 0,
        delay: 1,
        duration: 1,
      });
    });
  }, []);

  return (
    <section>
      <div
        className="w-[100vw] h-[100vh]"
        style={{
          backgroundImage: "url(../../../images/about.png)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          rotate: "360deg",
        }}
      >
        <div className="w-full h-full bg-black bg-opacity-60">
          <section className="left w-full md:w-[50%] h-full flex flex-col justify-center items-center">
            <div className="w-full px-8 md:px-16">
              <p className="text-green-400 bg-gray-700 bg-opacity-80 rounded-md p-2 text-2xl md:text-5xl">
                Natural Herbal <br />
                Remedies
              </p>
            </div>

            <div className="w-full px-8 md:px-16 mt-4 md:mt-0">
              <h1 className="text-white text-3xl md:text-4xl font-bold">
                100% <br /> Organic
              </h1>
            </div>
            <br />
            <br />
            <div className="w-full flex px-8 md:px-16">
              <div className="w-[90%] rounded-sm py-2 bg-opacity-60 bg-gray-600 flex gap-2">
                <span className="w-1 h-full bg-red-500 rounded-sm"></span>
                <p className="text-white w-[80%] text-sm md:text-base">
                  Rural remedies epitomize a harmonious blend of nature's wisdom
                  and human resilience, providing holistic healing solutions
                  rooted in centuries-old knowledge. They celebrate the enduring
                  efficacy of traditional practices, showcasing a sustainable
                  approach to wellness deeply intertwined with community
                  strength.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div id="part2" className="w-[100vw] h-auto bg-green-500">
        <div id="nav-header" className="w-full bg-transparent h-[10%]"></div>

        <div className="w-full h-auto py-8 bg-white flex flex-col justify-center items-center">
          <h1 className="text-3xl font-semibold text-[#395F13]">Hurbel Pure</h1>
          <p>Who we are</p>
          <img
            className="w-20 md:w-80 h-auto"
            src="../../../images/leaficon.png"
            alt="Loading...."
          />
        </div>

        <div className="w-full h-auto flex flex-col md:flex-row bg-white">
          <div
            id="part2Left"
            className="h-full w-full md:w-1/2 px-4 md:px-8 py-4 md:py-8"
          >
            <section className="flex items-center justify-center gap-2">
              <p className="w-1 h-14 bg-green-700"></p>
              <span>
                <p>We are Amazing</p>
                <p className="text-2xl font-semibold">
                  Remedies for all problems
                </p>
              </span>
            </section>

            <section className="pt-4 md:pt-10 md:pl-36">
              <p className="w-full text-sm md:text-base">
                Homemade rural remedies preserve traditional knowledge passed
                down through generations, offering natural, accessible solutions
                for common ailments. They promote self-reliance and health in
                rural communities, reducing dependency on modern
                pharmaceuticals. Additionally, these remedies often use locally
                available ingredients, making them both cost-effective and
                sustainable.
              </p>
              <span className="flex flex-wrap w-full md:w-5/6 gap-4 pt-4">
                <p className="flex items-center gap-2">
                  <img
                    className="w-4 md:w-6 h-auto"
                    src="../../../images/homeDot.png"
                    alt=""
                  />
                  <p>Natural Healing</p>
                </p>
                <p className="flex items-center gap-2">
                  <img
                    className="w-4 md:w-6 h-auto"
                    src="../../../images/homeDot.png"
                    alt=""
                  />
                  <p>No side Effect</p>
                </p>
                <p className="flex items-center gap-2">
                  <img
                    className="w-4 md:w-6 h-auto"
                    src="../../../images/homeDot.png"
                    alt=""
                  />
                  <p>100% Organic</p>
                </p>
                <p className="flex items-center gap-2">
                  <img
                    className="w-4 md:w-6 h-auto"
                    src="../../../images/homeDot.png"
                    alt=""
                  />
                  <p>Doctor Verified</p>
                </p>
              </span>

              <button className="bg-[#395F13] p-2 text-white rounded-md mt-4">
                Read More
              </button>
            </section>
          </div>

          <div
            id="part2Right"
            className="h-full w-full md:w-1/2 flex justify-center items-center hidden md:flex"
          >
            <img
              className="w-[75%] h-auto"
              src="../../../images/home02.png"
              alt="loading......."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
