import React, { useState, useEffect } from "react";
import { useAuth } from "../Store/useAuth";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { toast } from "react-toastify";
const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/";

function SignUp() {
  const [step, setStep] = useState(1);
  const [Errmsg, setErrmsg] = useState("");
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    username: "",
    ph_no: "",
    password: "",
    avatar: null,
  });

  const navigate = useNavigate();
  const { storeTokenInLs } = useAuth();

  useEffect(() => {
    gsap.from(".signup-container", {
      scale: 0.9,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  }, [step]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileInput = (e) => {
    setUser((prev) => ({
      ...prev,
      avatar: e.target.files[0],
    }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!user.fullName || !user.email || !user.username) {
      toast.error("Please fill out all fields in this step.");
      return;
    }
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    // Validate phone number
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(user.ph_no)) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }

    // Validate password strength
    if (user.password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    try {
      const formData = new FormData();
      Object.keys(user).forEach((key) => {
        if (user[key]) formData.append(key, user[key]);
      });

      // Validate avatar file type and size
      if (user.avatar) {
        const allowedTypes = ["image/jpeg", "image/png"];
        if (!allowedTypes.includes(user.avatar.type)) {
          toast.error("Avatar must be a JPEG or PNG image.");
          return;
        }
        if (user.avatar.size > 2 * 1024 * 1024) {
          toast.error("Avatar file size must be less than 2MB.");
          return;
        }
      }

      const response = await fetch(`${baseUrl}user/register`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.status === 409) {
        toast.error("Email Already Registered");
        return;
      } else if (!response.ok) {
        const errorMessage = data.msg?.issues
          ? data.msg.issues[0].message
          : data.msg || "An unexpected error occurred.";
        setErrmsg(errorMessage);
        toast.error(errorMessage);
        return;
      }
      storeTokenInLs(data.data.accessToken);
      toast.success(data.msg || "Sign-up successful!");
      navigate("/");
    } catch (error) {
      toast.error(`An error occurred: ${error.message}`);
    }
  };

  return (
    <div className="w-screen min-h-screen bg-[#F3F4F6] flex justify-center items-center px-4 py-8">
      <div className="signup-container bg-white p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-xl">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-800">
          Create an Account
        </h1>

        <form onSubmit={step === 1 ? handleNext : handlesubmit} className="space-y-5">
          {step === 1 ? (
            <>
              <div>
                <label htmlFor="fullname" className="block text-gray-700 font-semibold mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullname"
                  name="fullName"
                  value={user.fullName}
                  onChange={handleInput}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={handleInput}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="username" className="block text-gray-700 font-semibold mb-1">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={user.username}
                  onChange={handleInput}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Choose a username"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-semibold text-lg"
              >
                Next
              </button>
            </>
          ) : (
            <>
              <div>
                <label htmlFor="ph_no" className="block text-gray-700 font-semibold mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  id="ph_no"
                  name="ph_no"
                  value={user.ph_no}
                  onChange={handleInput}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={user.password}
                  onChange={handleInput}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Create a password"
                />
              </div>

              <div>
                <label htmlFor="avatar" className="block text-gray-700 font-semibold mb-1">
                  Avatar
                </label>
                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  onChange={handleFileInput}
                  className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>

              {Errmsg && <p className="text-red-500 text-sm">{Errmsg}</p>}

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-all"
                >
                  Back
                </button>

                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                >
                  Register
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default SignUp;
