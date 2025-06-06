import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../Store/useAuth";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const RemedyDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const [remedy, setRemedy] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const { user, token, isRemedyLikedByUser, toggleRemedyLike } = useAuth();
  const [isLiked, setIsLiked] = useState(false);

  const fetchRemedyDetail = async () => {
    try {
      const response = await fetch(`${baseUrl}remedy/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await response.json();
      setRemedy(data.data);
    } catch (error) {
      console.error("Error fetching remedy details:", error);
      toast.error("Failed to load remedy details.");
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(`${baseUrl}comment/p/${id}`);
      const data = await response.json();
      setComments(data.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchRemedyDetail();
    fetchComments();
    const checkLiked = async () => {
      if (id && isRemedyLikedByUser) {
        const res = await isRemedyLikedByUser(id);
        setIsLiked(res.liked);
      }
    };
    checkLiked();
    // eslint-disable-next-line
  }, [id, isRemedyLikedByUser, location]);

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) {
      toast.error("Comment cannot be empty.");
      return;
    }
    try {
      const response = await fetch(`${baseUrl}comment/p/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: newComment, onModel: "Remedy" }),
      });
      const data = await response.json();
      if (data.success) {
        setNewComment("");
        setComments((prev) => [data.data, ...prev]);
        toast.success("Comment added successfully.");
      } else {
        toast.error("Failed to add comment.");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to add comment.");
    }
  };

  const handleToggleLike = async () => {
    const res = await toggleRemedyLike(id);
    if (res && res.success) {
      setIsLiked(res.message === "Product Liked Successfully");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-green-100 via-emerald-50 to-blue-100">
        <img src="../images/loadingIcon.gif" alt="Loading..." className="w-16 h-16 animate-spin" />
      </div>
    );
  }
  if (!remedy) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-green-100 via-emerald-50 to-blue-100">
        <div className="text-2xl text-emerald-700 font-bold">Remedy not found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-50 to-blue-100 p-6 pt-[13vh]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Remedy Detail */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:col-span-8 flex flex-col">
          <div className="relative mb-6">
            <img
              src={remedy.image}
              alt={remedy.title}
              className="w-full h-72 object-cover rounded-2xl shadow"
            />
            <span className={`absolute top-4 right-4 px-4 py-1 rounded-full text-white font-semibold text-sm shadow-lg ${remedy.isVerified ? "bg-emerald-500" : "bg-yellow-500"}`}>
              {remedy.isVerified ? "Verified" : "Pending"}
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <h1 className="text-4xl font-extrabold text-emerald-800 mb-2 md:mb-0">{remedy.title}</h1>
            <button
              className="flex items-center text-red-500 hover:text-red-700 font-semibold transition-colors"
              onClick={handleToggleLike}
              title="Like"
            >
              {isLiked ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" className="w-7 h-7 mr-1">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="white" stroke="red" strokeWidth="2" viewBox="0 0 24 24" className="w-7 h-7 mr-1">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              )}
              <span className="ml-1">{isLiked ? "Liked" : "Like"}</span>
            </button>
          </div>
          <p className="text-lg text-emerald-900 mb-6">{remedy.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <section>
              <h2 className="text-xl font-semibold mb-2 text-emerald-700">Ingredients</h2>
              <ul className="list-disc list-inside text-emerald-800 space-y-1">
                {remedy.ingredients.map((ing, i) => (
                  <li key={i}>{ing}</li>
                ))}
              </ul>
            </section>
            <section>
              <h2 className="text-xl font-semibold mb-2 text-emerald-700">Ailments</h2>
              <ul className="list-disc list-inside text-emerald-800 space-y-1">
                {remedy.ailments.map((ailment, i) => (
                  <li key={i}>{ailment}</li>
                ))}
              </ul>
            </section>
          </div>
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-emerald-700">Steps</h2>
            <ol className="list-decimal list-inside text-emerald-800 space-y-1">
              {remedy.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </section>
          <div className="flex items-center mb-4">
            <span className="px-3 py-1 rounded-full text-white bg-emerald-400 font-semibold mr-3">
              Effectiveness: {remedy.effectiveness}/5
            </span>
            <a
              href={remedy.EcommerceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:underline font-semibold"
            >
              Buy Related Products
            </a>
          </div>
        </div>
        {/* Owner Details + Comments */}
        <div className="md:col-span-4 flex flex-col space-y-8">
          {/* Owner Details */}
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
            <img
              src={remedy.userId.avatar}
              alt={remedy.userId.username}
              className="w-20 h-20 rounded-full mb-3 border-4 border-emerald-200 shadow"
            />
            <p className="font-semibold text-lg text-emerald-900">{remedy.userId.fullName}</p>
            <p className="text-sm text-emerald-700">{remedy.userId.email}</p>
            <p className="text-sm text-emerald-700">{remedy.userId.location}</p>
          </div>
          {/* Comments List */}
          <div className="bg-white rounded-2xl shadow-lg p-6 overflow-y-auto max-h-[60vh]">
            <h2 className="text-xl font-bold mb-4 text-emerald-800">
              Comments ({comments.length})
            </h2>
            <div className="space-y-4">
              {comments.map((comment) => (
                <div
                  key={comment._id}
                  className="border-b border-green-200 pb-4 last:border-none"
                >
                  <div className="flex items-center mb-2">
                    <img
                      src={comment.ownerDetail[0].avatar}
                      alt={comment.ownerDetail[0].username}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <p className="font-semibold text-emerald-900">
                        {comment.ownerDetail[0].fullName}
                      </p>
                      <p className="text-sm text-emerald-700">
                        {comment.ownerDetail[0].email}
                      </p>
                      <p className="text-xs text-emerald-400">
                        {new Date(comment.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <p className="text-emerald-900">{comment.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Comment Box */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:col-span-8 mt-8">
          <h2 className="text-xl font-bold mb-4 text-emerald-800">Add a Comment</h2>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full p-3 border border-green-200 rounded-lg mb-4 bg-green-100 text-emerald-900"
          />
          <button
            onClick={handleCommentSubmit}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 font-semibold"
          >
            Post Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemedyDetail;
