import React, { useEffect, useState } from 'react';
import { useAuth } from '../Store/useAuth';
import { Link } from 'react-router-dom';
const baseUrl = import.meta.env.VITE_API_BASE_URL;

function Users_Requests() {
  const [userRequests, setUserRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  const UserRequests = async () => {
    try {
      const response = await fetch(`${baseUrl}p/getAllVerificationReq`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setUserRequests([]);
        setLoading(false);
        return;
      }

      const res = await response.json();
      if (Array.isArray(res.data)) {
        setUserRequests(res.data);
      } else {
        setUserRequests([]);
      }
    } catch (error) {
      setUserRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      UserRequests();
    }
  }, [token]);

  return (
    <div className="min-h-[90vh] bg-gradient-to-br from-blue-50 via-gray-100 to-blue-100 py-8 px-2">
      <h2 className="text-3xl font-extrabold text-center mb-8 text-blue-700 tracking-tight drop-shadow">
        User Verification Requests
      </h2>
      {loading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <img className="w-16 h-16 animate-spin" src="../images/loadingIcon.gif" alt="Loading..." />
        </div>
      ) : userRequests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {userRequests.map((request) => (
            <div
              key={request._id}
              className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-6 flex flex-col border border-blue-100 group"
            >
              <div className="flex flex-col gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-blue-700">About:</span>
                  <span className="text-gray-800">{request.about}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-blue-700">Message:</span>
                  <span className="text-gray-800">{request.message}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-blue-700">Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${request.status === "pending" ? "bg-yellow-200 text-yellow-800" : "bg-green-200 text-green-800"}`}>
                    {request.status}
                  </span>
                </div>
                <div className="text-gray-500 text-xs">
                  Requested At: {new Date(request.createdAt).toLocaleString()}
                </div>
              </div>
              <div className="flex justify-between items-center mt-auto">
                <Link
                  to={`/viewuser/${request.userId}`}
                  className="text-blue-600 hover:text-blue-900 underline font-semibold transition-colors"
                >
                  View User Analytics
                </Link>
                {/* Add more actions here if needed */}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <img src="../../../images/Notfound.png" alt="No requests" className="w-32 h-32 mb-4 opacity-80" />
          <span className="text-lg text-gray-500">No user requests available.</span>
        </div>
      )}
    </div>
  );
}

export default Users_Requests;
