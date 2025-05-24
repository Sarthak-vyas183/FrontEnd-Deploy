import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Store/useAuth';
const baseUrl = import.meta.env.VITE_API_BASE_URL;

function Verify_remedy() {
  const { token } = useAuth();
  const [verifiedRem, setVerifiedRem] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper to get image src
  const getImageSrc = (img) => img || "../../../images/Notfound.png";

  // Fetch all unverified remedies
  const unVerifyedRemedy = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}p/pendingRemedies`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok && Array.isArray(data.data)) {
        setVerifiedRem(data.data);
      } else {
        setVerifiedRem([]);
      }
    } catch {
      setVerifiedRem([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    unVerifyedRemedy();
    // eslint-disable-next-line
  }, []);

  const handleVerify = async (remedyId) => {
    try {
      const response = await fetch(`${baseUrl}p/verifyRemedy/${remedyId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        console.log("Failed to verify remedy");
        return;
      }

      alert("Verification done");
      unVerifyedRemedy();
    } catch (error) {
      console.error("Error verifying remedy:", error);
    }
  };

  return (
    <>
      <div className="w-full min-h-[80vh] max-sm:h-[75vh] bg-gradient-to-br from-blue-50 via-gray-100 to-blue-100 p-4 overflow-auto">
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <img className="w-16 h-16 animate-spin" src="../images/loadingIcon.gif" alt="Loading..." />
          </div>
        ) : verifiedRem.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {verifiedRem.map((remedy) => (
              <div
                key={remedy._id}
                className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-0 flex flex-col border border-blue-100 group"
                style={{ minHeight: "420px" }}
              >
                <div
                  className="w-full h-48 rounded-t-2xl bg-cover bg-center relative"
                  style={{
                    backgroundImage: `url(${getImageSrc(remedy.image)})`,
                  }}
                >
                  <span className="absolute top-3 right-3 bg-yellow-400 text-xs font-bold px-3 py-1 rounded-full shadow">
                    {remedy.verifyInfo?.status?.toUpperCase() || "PENDING"}
                  </span>
                </div>
                <div className="flex-1 flex flex-col justify-between p-5">
                  <div>
                    <h3 className="text-2xl font-bold mb-2 text-blue-700 group-hover:text-blue-900 transition-colors duration-200">
                      {remedy.title}
                    </h3>
                    <p className="text-gray-700 mb-3 line-clamp-3">{remedy.description}</p>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {remedy.ailments?.slice(0, 3).map((ailment, idx) => (
                        <span key={idx} className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-semibold">
                          {ailment}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500">Posted by:</span>
                      <span className="font-semibold text-gray-800">{remedy.userDetail?.fullname || "Unknown"}</span>
                      <span className="text-xs text-gray-400">{new Date(remedy.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Link
                        to={`/remedy/${remedy._id}`}
                        className="text-blue-600 hover:text-blue-900 underline font-semibold"
                      >
                        Read More
                      </Link>
                      <button
                        onClick={() => handleVerify(remedy._id)}
                        className="bg-gradient-to-r from-green-400 to-green-600 text-white py-1.5 px-5 rounded-lg shadow hover:from-green-500 hover:to-green-700 font-bold transition-all duration-200"
                      >
                        Verify
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full h-full flex flex-col justify-center items-center">
            <img src="../../../images/Notfound.png" alt="No remedies" className="w-32 h-32 mb-4 opacity-80" />
            <span className="text-lg text-gray-500">No remedies to verify at the moment.</span>
          </div>
        )}
      </div>
      <div className="w-full h-[10vh] max-sm:h-[15vh] bg-gradient-to-r from-blue-200 to-blue-400 flex justify-start px-4 items-center max-sm:items-start shadow-inner">
        <button
          onClick={() => { alert("Feature is not develop yet : coming soon") }}
          className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md max-sm:mt-2 font-semibold shadow"
        >
          My Verification
        </button>
      </div>
    </>
  );
}

export default Verify_remedy;
