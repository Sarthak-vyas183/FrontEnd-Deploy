import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../Store/useAuth";
import gsap from "gsap";

function Nav() {
  const location = useLocation();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.from(".Navigation li, .Navigation h1", {
        y: -100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power1.out",
      }); 
    });

    return () => context.revert();
  }, []);

  useEffect(() => {
    if (isSidebarOpen) {
      gsap.from(".sidebar-item", {
        x: -200,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power1.out",
      });
    }
  }, [isSidebarOpen]);

  const { isLoggedin, user } = useAuth();

  const navTextColor =
    location.pathname === "/remedies" ||
    location.pathname.includes("/remedies/")
      ? "text-white bg-gray-800"
      : "text-white bg-transparent";

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
    document.body.classList.toggle("overflow-hidden", !isSidebarOpen); // Toggle body scroll
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
    document.body.classList.remove("overflow-hidden"); // Ensure body scroll is enabled
  };

  // Close sidebar if user clicks outside of it
  useEffect(() => {
    if (isSidebarOpen) {
      const handleOutsideClick = (event) => {
        if (!document.getElementById("sidebar").contains(event.target)) {
          closeSidebar();
        }
      };
      document.addEventListener("mousedown", handleOutsideClick);
      return () =>
        document.removeEventListener("mousedown", handleOutsideClick);
    }
  }, [isSidebarOpen]);

  return (
    <div>
      <div className="w-[100vw] h-[10vh] bg-gray-800 bg-opacity-60 fixed pr-2 z-10">
        <div
          className={`Navigation h-full flex justify-between items-center ${navTextColor} font-semibold text-2xl px-4`}
        >
          <div className="flex items-center">
            <h1 className="text-gray-100 flex gap-2">
              <img
                className="w-10 h-10 text-green-800"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                alt="Logo"
              />
              <p>HomeRemedy.in</p>
            </h1>
          </div>

          {/* Hamburger menu for mobile screens */}
          <button
            className="block lg:hidden focus:outline-none"
            onClick={toggleSidebar}
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>

          {/* Navigation links for desktop screens */}
          <ul className="hidden lg:flex gap-10">
            <li className={`hover:text-yellow-300 ${navTextColor}`}>
              <Link to="/">Home</Link>
            </li>
            <li className={`hover:text-yellow-300 ${navTextColor}`}>
              <Link to="/about">About</Link>
            </li>
            <li className={`hover:text-yellow-300 ${navTextColor}`}>
              <Link to="/contact">Contact</Link>
            </li>
            <li className={`hover:text-yellow-300 ${navTextColor}`}>
              <Link to="/remedies">Remedies</Link>
            </li>
            {isLoggedin ? (
              <>
                {user && user.isAdmin ? (
                  <li className={`hover:text-yellow-300 ${navTextColor}`}>
                    <Link to="/admin/profile">Profile</Link>
                  </li>
                ) : user && user.isDoctor ? (
                  <li className={`hover:text-yellow-300 ${navTextColor}`}>
                    <Link to="/doctor/profile">Profile</Link>
                  </li>
                ) : (
                  <li className={`hover:text-yellow-300 ${navTextColor}`}>
                    <Link to="/user/profile">Profile</Link>
                  </li>
                )}
                <li className={`hover:text-yellow-300 ${navTextColor}`}>
                  <Link to="/logout">Logout</Link>
                </li>
              </>
            ) : (
              <>
                <li className={`hover:text-yellow-300 ${navTextColor}`}>
                  <Link to="/login">Login</Link>
                </li>
                <li className={`hover:text-yellow-300 ${navTextColor}`}>
                  <Link to="/signup">SignUp</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      {/* Sidebar for mobile screens */}
      <div 
        id="sidebar"
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white shadow-lg z-50 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:hidden`}
      >
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src="https://via.placeholder.com/40"
              alt="Profile Image"
              className="w-10 h-10 rounded-full"
            />
            <span className="text-lg font-semibold">Sarthak</span>
          </div>
          <button className="focus:outline-none" onClick={toggleSidebar}>
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <ul className="mt-4 space-y-2">
          <li className=" text-2xl px-4 py-2 hover:bg-gray-700 cursor-pointer sidebar-item">
            <Link to="/" onClick={toggleSidebar}>
              Home
            </Link>
          </li>
          <li className=" text-2xl px-4 py-2 hover:bg-gray-700 cursor-pointer sidebar-item">
            <Link to="/about" onClick={toggleSidebar}>
              About
            </Link>
          </li>
          <li className=" text-2xl px-4 py-2 hover:bg-gray-700 cursor-pointer sidebar-item">
            <Link to="/contact" onClick={toggleSidebar}>
              Contact
            </Link>
          </li>
          <li className="text-2xl px-4 py-2 hover:bg-gray-700 cursor-pointer sidebar-item">
            <Link to="/remedies" onClick={toggleSidebar}>
              Remedies
            </Link>
          </li>
          {isLoggedin ? (
            <>
              {user && user.isAdmin ? (
                <li className="px-4 py-2 text-2xl hover:bg-gray-700 cursor-pointer sidebar-item">
                  <Link to="/admin/profile" onClick={toggleSidebar}>
                    Profile
                  </Link>
                </li>
              ) : user && user.isDoctor ? (
                <li className="px-4 py-2 text-2xl hover:bg-gray-700 cursor-pointer sidebar-item">
                  <Link to="/doctor/profile" onClick={toggleSidebar}>
                    Profile
                  </Link>
                </li>
              ) : (
                <li className="px-4 py-2 text-2xl hover:bg-gray-700 cursor-pointer sidebar-item">
                  <Link to="/user/profile" onClick={toggleSidebar}>
                    Profile
                  </Link>
                </li>
              )}
              <li className="px-4 py-2 text-2xl hover:bg-gray-700 cursor-pointer sidebar-item">
                <Link to="/logout" onClick={toggleSidebar}>
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="px-4 py-2 text-2xl hover:bg-gray-700 cursor-pointer sidebar-item">
                <Link to="/login" onClick={toggleSidebar}>
                  Login
                </Link>
              </li>
              <li className="px-4 py-2 text-2xl hover:bg-gray-700 cursor-pointer sidebar-item">
                <Link to="/signup" onClick={toggleSidebar}>
                  SignUp
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Nav;
