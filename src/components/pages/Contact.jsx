import React from 'react';

function Contact() {
  return (
    <div className="flex max-[600px]:px-2 items-center justify-center w-[100vw] h-[90vh] absolute top-[10vh] bg-gray-700 overflow-hidden">
      <div className="bg-blue-100 p-8 h-[90%] rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-3xl font-semibold text-blue-600 mb-6 text-center">Get In Touch</h1>
        <form className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Fullname"
              className="w-[558px] max-[600px]:w-[280px] p-3 bg-blue-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
           
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="email"
              placeholder="Email"
              className="p-3 bg-blue-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              placeholder="Phone"
              className="p-3 bg-blue-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
         
          <textarea
            placeholder="Type your message here"
            rows="4"
            className="w-full p-3 bg-blue-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Submit
          </button>
        </form>
        <p className="mt-4 text-green-500 text-center">Thanks for submitting!</p>
      </div>
    </div>
  );
}

export default Contact;
