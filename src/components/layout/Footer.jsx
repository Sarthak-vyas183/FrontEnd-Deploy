/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import Logo from "../../assets/LOGO.png";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
function Footer() {
  const [darkMode, setDarkmode] = useState(false)
  return (
    <section className={`w-full h-auto flex flex-col justify-center items-center bg-gradient-to-t from-blue-50 via-emerald-50 to-white pb-8`}>
      <div className="w-[95%] h-full">
        <header className="w-full h-auto flex flex-col md:flex-row bg-white border-y-[1px] border-emerald-200 pb-4">
          <div className="w-full md:w-[30%] h-auto flex flex-col py-8 px-4">
            <span className="flex flex-col items-center">
              <img className="w-16 h-16" src={Logo} alt="Logo" />
              <p className="text-center text-emerald-700 font-semibold">Let’s Connect with our Socials</p>
            </span>
            <span className="flex justify-center gap-3 cursor-pointer mt-2 text-emerald-600 text-xl">
              <FaInstagram />
              <FaFacebook />
              <FaTwitter />
            </span>
          </div>

          <div className="w-full md:w-[70%] h-auto flex flex-col md:flex-row justify-evenly pt-4 md:pt-10">

            <div className="leading-loose mb-4 md:mb-0">
              <h1 className="font-bold text-lg">Company</h1>
              <ul className="leading-6 text-sm font-extralight cursor-pointer">
                <li>About Us</li>
                <li>Support</li>
                <li>Privacy Policy</li>
                <li>Terms and Condition</li>
                <li>Pricing & Refund</li>
                <li>Hire From Us</li>
              </ul>
            </div>

            <div className="leading-loose mb-4 md:mb-0">
              <h1 className="font-bold text-lg">Community</h1>
              <ul className="leading-6 text-sm font-extralight cursor-pointer">
                <li>
                  <Link to="/">Traditional-Remedies.org</Link>
                </li>
                <li>
                  <Link to="/">Discord</Link>
                </li>
              </ul>
            </div>

            <div className="leading-loose mb-4 md:mb-0">
              <h1 className="font-bold text-lg">Get In Touch</h1>
              <ul className="leading-6 text-sm font-extralight cursor-pointer">
                <li>
                  <Link to="/">+91-9981546195</Link>
                </li>
                <li>
                  <Link to="/">+91-9302695689</Link>
                </li>
                <li>
                  <Link>traditional.remedy@gmail.com</Link>
                </li>
              </ul>
            </div>

          </div>
        </header>

        <div className="w-full h-auto flex justify-center pt-4">
          <span className="text-center text-emerald-700">
            <h1 className="text-sm">Copyright © 2024 HomeRemedy.in</h1>
            <p className="text-xs">All Rights Reserved.</p>
          </span>
        </div>

      </div>
    </section>
  );
}

export default Footer;