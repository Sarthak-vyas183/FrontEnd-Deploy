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
    // Check if remedy is liked by user
    const checkLiked = async () => {
      if (id && isRemedyLikedByUser) {
        const res = await isRemedyLikedByUser(id);
        setIsLiked(res.liked);
      }
    };
    checkLiked();
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
      <div className="flex justify-center items-center h-screen">Loading...</div>
    );
  }
  if (!remedy) {
    return (
      <div className="flex justify-center items-center h-screen">
        Remedy not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 pt-[13vh]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left: Remedy Detail (70%) */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:col-span-8">
          <img
            src={remedy.image}
            alt={remedy.title}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">{remedy.title}</h1>
            <div className="flex items-center space-x-2">
              {/* Like Button */}
              <button
                className="flex items-center transition-colors"
                onClick={handleToggleLike}
                title="Like"
              >
                {isLiked ? (
                  // Filled red heart
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="red"
                    viewBox="0 0 24 24"
                    className="w-7 h-7 mr-1"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                ) : (
                  // Empty heart
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="white"
                    stroke="red"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    className="w-7 h-7 mr-1"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                )}
                {isLiked ? "Liked" : "Like"}
              </button>
            </div>
          </div>
          <p className="text-gray-700 mb-4">{remedy.description}</p>

          <section className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Ingredients:</h2>
            <ul className="list-disc list-inside">
              {remedy.ingredients.map((ing, i) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>
          </section>

          <section className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Steps:</h2>
            <ol className="list-decimal list-inside">
              {remedy.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </section>

          <section className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Ailments:</h2>
            <ul className="list-disc list-inside">
              {remedy.ailments.map((ailment, i) => (
                <li key={i}>{ailment}</li>
              ))}
            </ul>
          </section>

          <div className="flex items-center mb-4">
            <span
              className={`px-3 py-1 rounded-full text-white ${remedy.isVerified ? "bg-green-500" : "bg-yellow-500"
                }`}
            >
              {remedy.isVerified ? "Verified" : "Pending Verification"}
            </span>
          </div>

          <a
            href={remedy.EcommerceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Buy Related Products
          </a>
        </div>

        {/* Right: Owner Details + All Comments (30%) */}
        <div className="md:col-span-4 flex flex-col space-y-6">
          {/* Owner Details */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Owner Details</h2>
            <div className="flex items-center">
              <img
                src={remedy.userId.avatar}
                alt={remedy.userId.username}
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <p className="font-semibold text-lg">
                  {remedy.userId.fullName}
                </p>
                <p className="text-sm text-gray-500">
                  {remedy.userId.email}
                </p>
                <p className="text-sm text-gray-500">
                  {remedy.userId.location}
                </p>
              </div>
            </div>
          </div>

          {/* Comments List */}
          <div className="bg-white rounded-lg shadow-lg p-6 overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">
              Comments ({comments.length})
            </h2>
            <div className="space-y-4 max-h-[60vh]">
              {comments.map((comment) => (
                <div
                  key={comment._id}
                  className="border-b pb-4 last:border-none"
                >
                  <div className="flex items-center mb-2">
                    <img
                      src={comment.ownerDetail[0].avatar}
                      alt={comment.ownerDetail[0].username}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <p className="font-semibold">
                        {comment.ownerDetail[0].fullName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {comment.ownerDetail[0].email}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(comment.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom-left: Comment Box */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:col-span-8">
          <h2 className="text-2xl font-bold mb-4">Add a Comment</h2>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full p-3 border rounded-lg mb-4"
          />
          <button
            onClick={handleCommentSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Post Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemedyDetail;
