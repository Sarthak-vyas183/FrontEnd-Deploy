/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useAuth } from "../Store/useAuth";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { toast } from "react-toastify";
const baseUrl = import.meta.env.VITE_API_BASE_URL;
function SignUp() {
  const [Errmsg, setErrmsg] = useState("");
  const [user, setUser] = useState({
    fullname: "",
    email: "",
    ph_no: "",
    password: "",
  });
  const navigate = useNavigate();
  const { storeTokenInLs } = useAuth();

  useEffect(() => {
    gsap.from(".signup-container", {
      scale: 0,
      opacity: 0,
      duration: 0.5,
      ease: "power1.out",
    });
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseUrl}/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.status === 409) {
        toast.error("Email Already Register");
        return;
      } else if (!response.ok) {
        // Handle other error responses
        const errorMessage = data.msg?.issues
          ? data.msg.issues[0].message
          : data.msg || "An unexpected error occurred.";
        setErrmsg(errorMessage);
        toast.error(errorMessage);
        return;
      }

      // Successful signup
      storeTokenInLs(data.token);
      setUser({
        fullname: "",
        email: "",
        ph_no: "",
        password: "",
      });
      toast.success(data.msg || "Sign-up successful!");
      navigate("/");
    } catch (error) {
      // Handle network or unexpected errors
      console.error("Fetch error:", error);
      toast.error(`An error occurred: ${error.message}`);
    }
  };

  return (
    <div className="w-screen h-screen bg-gray-100 flex justify-center items-center overflow-hidden px-4">
      <div className="signup-container bg-white p-8 rounded-lg shadow-lg w-full max-w-md mt-[10vh]">
        <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          Sign Up
        </h1>
        <form onSubmit={handlesubmit} className="space-y-4">
          <div>
            <label htmlFor="fullname" className="block text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={user.fullname}
              onChange={handleInput}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleInput}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="ph_no" className="block text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              id="ph_no"
              name="ph_no"
              value={user.ph_no}
              onChange={handleInput}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={handleInput}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {Errmsg && <p className="text-red-500 text-sm">{Errmsg}</p>}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
