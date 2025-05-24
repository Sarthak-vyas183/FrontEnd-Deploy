/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../Store/useAuth";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const Remedies = () => {
  const [remedies, setRemedies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { isRemedyLikedByUser, toggleRemedyLike } = useAuth();
  const [likedMap, setLikedMap] = useState({});

  useEffect(() => {
    const fetchRemedies = async () => {
      try {
        const response = await fetch(`${baseUrl}remedy`);
        const res = await response.json();
        setRemedies(res.data);
      } catch (error) {
        console.error("Error fetching remedies:", error);
        toast.error("Failed to load remedies.");
      } finally {
        setLoading(false);
      }
    };

    fetchRemedies();
  }, []);

  useEffect(() => {
    // After remedies are loaded, check which are liked
    const checkLikedRemedies = async () => {
      if (remedies.length && isRemedyLikedByUser) {
        const results = {};
        await Promise.all(
          remedies.map(async (remedy) => {
            const res = await isRemedyLikedByUser(remedy._id);
            results[remedy._id] = res.liked;
          })
        );
        setLikedMap(results);
      }
    };
    checkLikedRemedies();
    // eslint-disable-next-line
  }, [remedies]);

  const handleToggleLike = async (remedyId) => {
    const res = await toggleRemedyLike(remedyId);
    if (res && res.success) {
      setLikedMap((prev) => ({
        ...prev,
        [remedyId]: res.message === "Product Liked Successfully"
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-50 to-blue-100 pt-[10vh] pb-10">
      <h1 className="text-5xl font-extrabold text-center mb-10 text-emerald-700 drop-shadow-lg tracking-tight">
        🌿 Explore Home Remedies
      </h1>
      {loading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <img src="../images/loadingIcon.gif" alt="Loading..." className="w-20 h-20 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-6">
          {remedies.map((remedy) => (
            <div
              key={remedy._id}
              className="remedy-card bg-white rounded-3xl shadow-xl hover:shadow-2xl overflow-hidden transform transition-transform hover:scale-105 border border-emerald-100 group flex flex-col"
            >
              <div
                className="w-full h-56 bg-cover bg-center flex justify-end p-3 relative"
                style={{
                  backgroundImage: `url(${remedy.image || "../../../images/Notfound.png"})`,
                }}
              >
                <span className="absolute top-3 left-3 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold shadow">
                  {remedy.ailments?.[0] || "Remedy"}
                </span>
                {remedy.isVerified ? (
                  <img
                    src="../../../images/verified-icon.png"
                    className="w-10 h-10 bg-emerald-500 rounded-full shadow-md border-2 border-white"
                    alt="Verified"
                  />
                ) : (
                  <img
                    src="../../../images/danger.png"
                    className="w-10 h-10 bg-red-500 rounded-full shadow-md border-2 border-white"
                    alt="Not Verified"
                  />
                )}
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-2xl font-bold text-emerald-800 group-hover:text-emerald-900 transition-colors duration-200">
                      {remedy.title}
                    </h2>
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => console.log(`Bookmarked remedy: ${remedy._id}`)}
                      title="Bookmark"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="w-6 h-6"
                      >
                        <path d="M6 2c-1.1 0-2 .9-2 2v18l8-5.33L20 22V4c0-1.1-.9-2-2-2H6zm0 2h12v15.17l-6-4-6 4V4z" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-3">{remedy.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {remedy.ailments?.slice(0, 3).map((ailment, idx) => (
                      <span key={idx} className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-xs font-semibold">
                        {ailment}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                  {/* Like/Dislike Heart Button */}
                  <button
                    className="flex items-center text-red-500 hover:text-red-700 font-semibold"
                    onClick={() => handleToggleLike(remedy._id)}
                  >
                    {likedMap[remedy._id] ? (
                      // Filled red heart
                      <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" className="w-6 h-6 mr-2">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    ) : (
                      // Empty heart
                      <svg xmlns="http://www.w3.org/2000/svg" fill="white" stroke="red" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6 mr-2">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    )}
                    <span>{likedMap[remedy._id] ? "Liked" : "Like"}</span>
                  </button>
                  <button
                    className="flex items-center text-emerald-500 hover:text-emerald-700 font-semibold"
                    onClick={() => console.log(`Play video for remedy: ${remedy._id}`)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="w-6 h-6 mr-2"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    Watch Video
                  </button>
                  <Link
                    to={`/remedy/${remedy._id}`}
                    className="p-3 bg-gradient-to-r from-emerald-500 to-emerald-700 rounded-lg text-white font-semibold shadow-md hover:from-emerald-600 hover:to-emerald-800 hover:shadow-lg transition-all duration-300"
                  >
                    Read more
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Remedies;
