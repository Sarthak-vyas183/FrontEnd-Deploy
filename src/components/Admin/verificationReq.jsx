/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Store/useAuth";
import { toast } from "react-toastify";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

function VerificationReq() {
  const { token } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${baseUrl}admin/getAllReq`, {
          method: "POST",
          headers: {
            Authorization: token,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setRequests(data.data || []);
        } else {
          setError(data.msg || "Failed to fetch requests");
        }
      } catch (err) {
        setError("Network error");
      }
      setLoading(false);
    };
    fetchRequests();
  }, [token]);

  // Modal open handler
  const handleViewDocument = (imgUrl) => {
    setModalImg(imgUrl);
    setModalOpen(true);
  };

  // Modal close handler
  const handleCloseModal = () => {
    setModalOpen(false);
    setModalImg("");
  };

  // Download handler
  const handleDownload = () => {
    window.open(modalImg, "_blank", "noopener,noreferrer");
  };

  // Accept/Decline handlers (UI only)
  const handleAccept = (id) => {
    toast.success("Accepted (UI only)");
    // ...API call here if needed...
  };
  const handleDecline = (id) => {
    toast.error("Declined (UI only)");
    // ...API call here if needed...
  };

  return (
    <div
      style={{
        padding: "2.5rem 1rem",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f7fafc 0%, #e3e8ee 100%)",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "2.5rem",
          color: "#2d3748",
          fontWeight: 800,
          letterSpacing: "0.02em",
          fontSize: "2.1rem",
        }}
      >
        Doctor Verification Requests
      </h2>
      <Link
        to="/admin/profile"
        style={{
          display: "inline-block",
          marginBottom: "1.5rem",
          color: "#2563eb",
          fontWeight: 700,
          textDecoration: "underline",
          fontSize: "1.05em",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        ← Back to Dashboard
      </Link>
      {loading && (
        <div style={{ textAlign: "center", color: "#3182ce" }}>Loading...</div>
      )}
      {error && (
        <div style={{ textAlign: "center", color: "#e53e3e" }}>{error}</div>
      )}
      {!loading && !error && requests.length === 0 && (
        <div style={{ textAlign: "center", color: "#718096" }}>
          No verification requests found.
        </div>
      )}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
          gap: "2rem",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {requests.map((req) => (
          <div
            key={req._id}
            style={{
              background: "#fff",
              borderRadius: "18px",
              boxShadow:
                "0 4px 24px 0 rgba(44, 62, 80, 0.10), 0 1.5px 6px 0 rgba(44, 62, 80, 0.06)",
              padding: "2rem 1.5rem 1.5rem 1.5rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transition: "box-shadow 0.25s, transform 0.18s",
              position: "relative",
              border: "1px solid #e2e8f0",
              cursor: "pointer",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow =
                "0 8px 32px 0 rgba(44, 62, 80, 0.18), 0 2px 8px 0 rgba(44, 62, 80, 0.10)";
              e.currentTarget.style.transform = "translateY(-2px) scale(1.012)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow =
                "0 4px 24px 0 rgba(44, 62, 80, 0.10), 0 1.5px 6px 0 rgba(44, 62, 80, 0.06)";
              e.currentTarget.style.transform = "none";
            }}
          >
            {/* No image preview here */}
            <div style={{ width: "100%" }}>
              <div style={{ marginBottom: "0.7rem" }}>
                <span style={{ fontWeight: 700, color: "#2563eb" }}>RMP No:</span>{" "}
                {req.RMP_NO}
              </div>
              <div style={{ marginBottom: "0.7rem" }}>
                <span style={{ fontWeight: 700, color: "#2563eb" }}>Message:</span>{" "}
                <span style={{ color: "#4a5568" }}>{req.message}</span>
              </div>
              <div style={{ marginBottom: "0.7rem" }}>
                <span style={{ fontWeight: 700, color: "#2563eb" }}>Status:</span>{" "}
                <span
                  style={{
                    color:
                      req.status === "pending"
                        ? "#d69e2e"
                        : req.status === "approved"
                          ? "#38a169"
                          : "#e53e3e",
                    fontWeight: 700,
                    letterSpacing: "0.01em",
                  }}
                >
                  {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                </span>
              </div>
              <div
                style={{
                  fontSize: "0.98em",
                  color: "#718096",
                  marginBottom: "1.2rem",
                }}
              >
                <span style={{ fontWeight: 700, color: "#2563eb" }}>Requested:</span>{" "}
                {new Date(req.createdAt).toLocaleString()}
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "0.7rem",
                  marginTop: "0.7rem",
                  justifyContent: "center",
                }}
              >
                <button
                  className="text-blue-700 underline"
                  onClick={() => handleViewDocument(req.RMP_Img)}
                >
                  View Document
                </button>
                <button
                  className="text-green-500 font-bold"
                  onClick={() => handleAccept(req._id)}
                >
                  Accept
                </button>
                <button
                  className="text-red-500 font-bold"
                  onClick={() => handleDecline(req._id)}
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Modal for viewing document */}
      {modalOpen && (
        <div
          style={{
            position: "fixed",
            zIndex: 9999,
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(30,41,59,0.92)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            backdropFilter: "blur(2px)",
            transition: "background 0.2s",
          }}
          onClick={handleCloseModal}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "18px",
              padding: "2rem 2.5rem 1.5rem 2.5rem",
              boxShadow:
                "0 8px 32px 0 rgba(44, 62, 80, 0.18), 0 2px 8px 0 rgba(44, 62, 80, 0.10)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: "95vw",
              maxHeight: "90vh",
              position: "relative",
            }}
            onClick={e => e.stopPropagation()}
          >
            <img
              src={modalImg}
              alt="RMP Document"
              style={{
                maxWidth: "70vw",
                maxHeight: "60vh",
                borderRadius: "10px",
                boxShadow: "0 4px 24px rgba(0,0,0,0.13)",
                background: "#f7fafc",
                marginBottom: "1.5rem",
                border: "1.5px solid #e2e8f0",
              }}
            />
            <div style={{ display: "flex", gap: "1.2rem" }}>
              <button
                style={{
                  background: "#2563eb",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "0.6rem 2rem",
                  fontWeight: 700,
                  fontSize: "1em",
                  cursor: "pointer",
                  boxShadow: "0 1px 4px rgba(44,62,80,0.07)",
                  transition: "background 0.18s, transform 0.16s",
                }}
                onMouseEnter={e =>
                  (e.currentTarget.style.background = "#174ea6")
                }
                onMouseLeave={e =>
                  (e.currentTarget.style.background = "#2563eb")
                }
                onClick={e => {
                  e.stopPropagation();
                  handleDownload();
                }}
              >
                Download
              </button>
              <button
                style={{
                  background: "#e53e3e",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "0.6rem 2rem",
                  fontWeight: 700,
                  fontSize: "1em",
                  cursor: "pointer",
                  boxShadow: "0 1px 4px rgba(44,62,80,0.07)",
                  transition: "background 0.18s, transform 0.16s",
                }}
                onMouseEnter={e =>
                  (e.currentTarget.style.background = "#9b2c2c")
                }
                onMouseLeave={e =>
                  (e.currentTarget.style.background = "#e53e3e")
                }
                onClick={e => {
                  e.stopPropagation();
                  handleCloseModal();
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VerificationReq;
