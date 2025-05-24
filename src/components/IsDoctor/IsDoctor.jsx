import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink, Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../Store/useAuth';
import { gsap } from 'gsap';
import { FaUserMd, FaClipboardList, FaCheckCircle, FaClipboardCheck, FaBookmark, FaPenFancy } from 'react-icons/fa';

function Doctor() {
  const { user } = useAuth();
  const [explore, setExplore] = useState({ hide: "hidden" });

  const toggleExplore = () => {
    setExplore({ hide: explore.hide === "hidden" ? "flex" : "hidden" });
  };

  useEffect(() => {
    if (window.innerWidth < 500) {
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

  if (!user || !user.isprofessional) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div
        onClick={toggleExplore}
        className="max-sm:flex gap-3 px-2 font-semibold items-center w-full h-[7vh] mt-[10vh] text-black"
      >
        {explore.hide === "hidden" ? (
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

      <div className="flex fixed top-[10vh] max-sm:top-[17vh] left-0 w-[100vw] h-[90vh] bg-gradient-to-br from-blue-50 via-gray-100 to-blue-100">
        {/* Sidebar */}
        <div
          className={`w-[20vw] max-sm:w-[25vw] max-sm:relative max-sm:${explore.hide} bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700 p-4 max-sm:p-0 max-sm:pt-4 flex max-sm:items-center flex-col space-y-6 max-sm:space-y-2 border-r-2 border-blue-400 shadow-2xl`}
        >
          <div className="flex flex-col items-center mb-6">
            <FaUserMd className="text-5xl text-white mb-2 drop-shadow-lg" />
            <span className="text-lg font-bold text-white tracking-wide">{user.fullName || "Doctor"}</span>
            <span className="text-xs text-blue-200">{user.email}</span>
          </div>
          <NavLink
            onClick={toggleExplore}
            className={({ isActive }) =>
              `sidebar-item flex items-center gap-2 text-lg font-bold p-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg"
                  : "text-blue-100 hover:bg-blue-800 hover:text-white"
              }`
            }
            to="/professional/profile"
          >
            <FaUserMd className="text-2xl" />
            <span>Profile</span>
          </NavLink>
          <NavLink
            onClick={toggleExplore}
            className={({ isActive }) =>
              `sidebar-item flex items-center gap-2 text-lg font-bold p-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg"
                  : "text-blue-100 hover:bg-blue-800 hover:text-white"
              }`
            }
            to="/professional/create"
          >
            <FaPenFancy className="text-2xl" />
            <span>Create Remedy</span>
          </NavLink>
          <NavLink
            onClick={toggleExplore}
            className={({ isActive }) =>
              `sidebar-item flex items-center gap-2 text-lg font-bold p-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg"
                  : "text-blue-100 hover:bg-blue-800 hover:text-white"
              }`
            }
            to="/professional/myremedy"
          >
            <FaClipboardList className="text-2xl" />
            <span>My Remedies</span>
          </NavLink>
          <NavLink
            onClick={toggleExplore}
            className={({ isActive }) =>
              `sidebar-item flex items-center gap-2 text-lg font-bold p-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-green-400 to-green-600 text-white shadow-lg"
                  : "text-blue-100 hover:bg-green-700 hover:text-white"
              }`
            }
            to="/professional/verifyremedy"
          >
            <FaCheckCircle className="text-2xl" />
            <span>Verify Remedies</span>
          </NavLink>
          <NavLink
            onClick={toggleExplore}
            className={({ isActive }) =>
              `sidebar-item flex items-center gap-2 text-lg font-bold p-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow-lg"
                  : "text-blue-100 hover:bg-yellow-600 hover:text-white"
              }`
            }
            to="/professional/requests"
          >
            <FaClipboardCheck className="text-2xl" />
            <span>User's Requests</span>
          </NavLink>
          <NavLink
            onClick={toggleExplore}
            className={({ isActive }) =>
              `sidebar-item flex items-center gap-2 text-lg font-bold p-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-purple-400 to-purple-700 text-white shadow-lg"
                  : "text-blue-100 hover:bg-purple-700 hover:text-white"
              }`
            }
            to="/professional/bookmarks"
          >
            <FaBookmark className="text-2xl" />
            <span>Saved Remedies</span>
          </NavLink>
        </div>
        {/* Main Content */}
        <div className="w-[80vw] max-sm:w-[100vw] bg-gray-100 text-black overflow-y-scroll rounded-l-3xl shadow-inner">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Doctor;
