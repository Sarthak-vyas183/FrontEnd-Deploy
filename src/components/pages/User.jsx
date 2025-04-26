/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate, NavLink, Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../Store/useAuth";
import { gsap } from "gsap";

function User() {
  const { isLoggedin } = useAuth();
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
 
  
  if (!isLoggedin) {
    return <Navigate to="/" />;
  }

  const [explore, setExplore] = useState({ hide: "hidden" });

  const toggleExplore = () => {
    setExplore({ hide: explore.hide === "hidden" ? "flex" : "hidden" });
  };

  useEffect(() => { 
    if(screenSize.width < 500) {
      if (explore.hide === "flex") {
        const elements = document.querySelectorAll(".sidebar-item");
        gsap.fromTo(
          elements,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, stagger: 0.2, duration: 0.5 }
        );
      }
    }
   
  }, [explore.hide]);

  return (
    <>
      <div
        onClick={toggleExplore}
        className="max-sm:flex gap-3 px-2 font-semibold items-center w-full h-[7vh] mt-[10vh] text-black"
      >
        {explore.hide == "hidden" ? (
          <>
            <i className="ri-menu-line text-4xl"></i>
            <p className="text-2xl">Explore</p>
          </>
        ) : (
          <>
            <i className="ri-close-large-line text-4xl"></i>
            <p className="text-2xl">Close</p>
          </>
        )}
      </div>

      <div className="flex fixed top-[10vh] max-sm:top-[17vh] left-0 w-[100vw] h-[90vh]">
        {/* Sidebar */}
        <div
          className={`w-[20vw] max-sm:w-[70vw] max-sm:relative max-sm:${explore.hide} bg-gradient-to-b from-green-600 via-green-400 to-green-200 p-4 max-sm:p-0 max-sm:pt-4 flex max-sm:items-center flex-col space-y-6 max-sm:space-y-2 border-r-2 border-green-400 shadow-xl z-20 transition-all duration-300`}
        >
          {/* Logo/Title */}
          <div className="flex items-center gap-2 mb-6 max-sm:mb-2">
            <i className="ri-leaf-fill text-3xl text-white"></i>
            <span className="text-xl font-bold text-white tracking-wide">HomeRemedy</span>
          </div>
          {/* ...existing NavLinks... */}
          {/* Replace NavLinks with the following for improved style */}
          <NavLink
            onClick={toggleExplore}
            className={({ isActive }) =>
              `sidebar-item flex items-center gap-3 text-lg font-semibold px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-white text-green-700 shadow"
                  : "text-white hover:bg-green-500 hover:text-white"
              }`
            }
            to="/user/profile"
          >
            <i className="ri-profile-line text-2xl"></i>
            <span>Profile</span>
          </NavLink>
          <NavLink
            onClick={toggleExplore}
            className={({ isActive }) =>
              `sidebar-item flex items-center gap-3 text-lg font-semibold px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-white text-green-700 shadow"
                  : "text-white hover:bg-green-500 hover:text-white"
              }`
            }
            to="/user/create"
          >
            <i className="ri-quill-pen-line text-2xl"></i>
            <span>Create Remedy</span>
          </NavLink>
          <NavLink
            onClick={toggleExplore}
            className={({ isActive }) =>
              `sidebar-item flex items-center gap-3 text-lg font-semibold px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-white text-green-700 shadow"
                  : "text-white hover:bg-green-500 hover:text-white"
              }`
            }
            to="/user/myremedy"
          >
            <i className="ri-inbox-archive-fill text-2xl"></i>
            <span>My Remedies</span>
          </NavLink>
          <NavLink
            onClick={toggleExplore}
            className={({ isActive }) =>
              `sidebar-item flex items-center gap-3 text-lg font-semibold px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-white text-green-700 shadow"
                  : "text-white hover:bg-green-500 hover:text-white"
              }`
            }
            to="/user/contact"
          >
            <i className="ri-verified-badge-fill text-2xl"></i>
            <span>Verify Remedy</span>
          </NavLink>
          <NavLink
            onClick={toggleExplore}
            className={({ isActive }) =>
              `sidebar-item flex items-center gap-3 text-lg font-semibold px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-white text-green-700 shadow"
                  : "text-white hover:bg-green-500 hover:text-white"
              }`
            }
            to="/user/bookmarks"
          >
            <i className="ri-save-fill text-2xl"></i>
            <span>Saved Remedies</span>
          </NavLink>
        </div>

        {/* Main Content */}
        <div className="w-[80vw] max-sm:w-full bg-white/80 text-black overflow-y-scroll p-4 md:p-8 rounded-l-3xl shadow-inner min-h-full">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default User;
