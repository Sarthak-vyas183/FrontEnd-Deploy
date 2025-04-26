/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Optionally reset form fields here
  };

  return (
    <div className="flex items-center justify-center w-screen h-[90vh] absolute top-[10vh] bg-gradient-to-br from-green-200 via-green-100 to-green-50 overflow-hidden">
      <div className="relative bg-white/90 p-10 rounded-3xl shadow-2xl w-full max-w-xl animate-fade-in transition-all duration-500">
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-green-600 rounded-full p-3 shadow-lg">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 10.5a8.38 8.38 0 01-.9 3.8c-.6 1.1-1.5 2.1-2.6 2.8a8.5 8.5 0 01-8.6 0c-1.1-.7-2-1.7-2.6-2.8A8.38 8.38 0 013 10.5C3 6.4 6.4 3 10.5 3S18 6.4 18 10.5z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-green-700 mb-8 text-center mt-4">Get In Touch</h1>
        <form className="space-y-5" onSubmit={handleSubmit} autoComplete="off">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.485 0 4.797.755 6.879 2.047M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full pl-10 pr-4 py-3 bg-green-50 rounded-xl border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              required
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 01-8 0m8 0a4 4 0 00-8 0m8 0v1a4 4 0 01-8 0v-1m8 0V7a4 4 0 00-8 0v5" />
                </svg>
              </span>
              <input
                type="email"
                placeholder="Email"
                className="w-full pl-10 pr-4 py-3 bg-green-50 rounded-xl border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                required
              />
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007 17h10a1 1 0 00.95-.68L19 13M7 13V6a1 1 0 011-1h5a1 1 0 011 1v7" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Phone"
                className="w-full pl-10 pr-4 py-3 bg-green-50 rounded-xl border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              />
            </div>
          </div>
          <div className="relative">
            <span className="absolute left-3 top-4 text-green-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z" />
              </svg>
            </span>
            <textarea
              placeholder="Type your message here"
              rows="4"
              className="w-full pl-10 pr-4 py-3 bg-green-50 rounded-xl border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 transition resize-none"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-green-600 to-green-400 text-white font-semibold rounded-xl shadow-md hover:from-green-700 hover:to-green-500 transition-all duration-200 transform hover:-translate-y-1"
          >
            Send Message
          </button>
        </form>
        {submitted && (
          <p className="mt-6 text-green-600 text-center font-medium animate-fade-in">
            Thanks for submitting!
          </p>
        )}
      </div>
      <style>
        {`
          .animate-fade-in {
            animation: fadeIn 0.8s ease;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(30px);}
            to { opacity: 1; transform: translateY(0);}
          }
        `}
      </style>
    </div>
  );
}

export default Contact;
