import React, { useEffect, useState } from 'react';
import { useAuth } from '../Store/useAuth';
const baseUrl = import.meta.env.VITE_API_BASE_URL;

function Admin_remedyManagement() {
  const [remedies, setRemedies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  const fetchAllRemedies = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}admin/getAllRemedies`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok && Array.isArray(data.data)) {
        setRemedies(data.data);
      } else {
        setRemedies([]);
      }
    } catch {
      setRemedies([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAllRemedies();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="min-h-[90vh] bg-gradient-to-br from-blue-50 via-gray-100 to-blue-100 py-8 px-2">
      <h2 className="text-3xl font-extrabold text-center mb-8 text-blue-700 tracking-tight drop-shadow">
        All Remedies (Verified & Unverified)
      </h2>
      {loading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <img className="w-16 h-16 animate-spin" src="../images/loadingIcon.gif" alt="Loading..." />
        </div>
      ) : remedies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {remedies.map((remedy) => (
            <div
              key={remedy._id}
              className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-6 flex flex-col border border-blue-100 group relative"
            >
              <div className="flex flex-col gap-2 mb-4">
                <div className="w-full h-40 rounded-xl bg-cover bg-center mb-3 relative"
                  style={{ backgroundImage: `url(${remedy.image})` }}>
                  <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold shadow-lg z-10 ${remedy.isVerified ? "bg-green-200 text-green-800" : "bg-yellow-200 text-yellow-800"}`}>
                    {remedy.isVerified ? "Verified" : "Pending"}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-1 text-blue-700">{remedy.title}</h3>
                <p className="text-gray-700 mb-2 line-clamp-2">{remedy.description}</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {remedy.ailments?.slice(0, 3).map((ailment, idx) => (
                    <span key={idx} className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-semibold">
                      {ailment}
                    </span>
                  ))}
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-gray-700">Effectiveness:</span>{" "}
                  <span className="text-emerald-700">{remedy.effectiveness}/5</span>
                </div>
                <div className="mb-2 text-gray-500 text-xs">
                  Created At: {new Date(remedy.createdAt).toLocaleString()}
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-gray-700">Status:</span>{" "}
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${remedy.verifyInfo?.status === "approved" ? "bg-green-200 text-green-800" : "bg-yellow-200 text-yellow-800"}`}>
                    {remedy.verifyInfo?.status || "pending"}
                  </span>
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-gray-700">Reason:</span>{" "}
                  <span className="text-gray-600">{remedy.verifyInfo?.reason}</span>
                </div>
                <div className="mb-2">
                  <a
                    href={remedy.EcommerceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    Buy Related Product
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <img src="../../../images/Notfound.png" alt="No remedies" className="w-32 h-32 mb-4 opacity-80" />
          <span className="text-lg text-gray-500">No remedies found.</span>
        </div>
      )}
    </div>
  );
}

export default Admin_remedyManagement;
