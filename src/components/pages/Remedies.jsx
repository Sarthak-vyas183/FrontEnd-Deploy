import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Remedies = () => {
  const [remedies, setRemedies] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchRemedies = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/auth/remedies");
        const res = await response.json();
        setRemedies(res.data);
      } catch (error) {
        console.error("Error fetching remedies:", error);
        alert("Failed to load remedies.");
      }
    };

    fetchRemedies();
  }, []);

  const getImageSrc = (buffer) => {
    if (!buffer) return "";
    const binary = new Uint8Array(buffer.data).reduce(
      (acc, byte) => acc + String.fromCharCode(byte),
      ""
    );
    const base64String = window.btoa(binary);
    return `data:image/jpeg;base64,${base64String}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 relative top-[10vh]">
      
      <h1 className="text-4xl font-bold text-center mb-6 w-full h-[5%]">Remedies</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {remedies.length > 0 ? (
          remedies.map((remedy) => (
            <div
              key={remedy._id}
              className="remedy-card bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105"
            >
              <div
                className="w-full h-48 bg-cover bg-center flex justify-end p-2"
                style={{ backgroundImage: `url(${getImageSrc(remedy.image)})` }}
              >
                {remedy.isVerified ? (
                  <img
                    src="../../../images/verified-icon.png"
                    className="w-8 h-8 bg-green-500 rounded-full"
                    alt="Verified"
                  />
                ) : (
                  <img
                    src="../../../images/danger.png"
                    className="w-8 h-8 bg-red-500 rounded-full"
                    alt="Not Verified"
                  />
                )}
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{remedy.title}</h2>
                <p className="text-gray-700 mb-2">{remedy.description}</p>
              </div>
              <div className="w-full h-16 flex justify-end items-center pr-8">
                <Link to={`/remedy/${remedy._id}`} className="p-2 m-2 bg-blue-600 rounded-md text-white">
                  Read more
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-700">No remedies available</p>
        )}
      </div>
    </div>
  );
};

export default Remedies;
