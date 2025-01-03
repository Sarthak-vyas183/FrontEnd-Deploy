/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../Store/useAuth";
import { toast } from "react-toastify";


const baseUrl = import.meta.env.VITE_API_BASE_URL;
function RemedyDetail() {
  const { token } = useAuth();
  const [currRemedy, setCurrRemedy] = useState(null);
  const [owner, setOwner] = useState("");
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const [commentOnRemedy, setCommentOnRemedy] = useState([]);
  const [RemedySaved, setRemedySaved] = useState(null);
  const [defaultimg , setdetaultimg] = useState('../../../images/user.png');

  const showComments = async () => {
    try {
      const response = await fetch(`${baseUrl}/auth/showcomments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ RemedyId: id }),
      });
  
      if (!response.ok) throw new Error("Internal server error!");
  
      const res = await response.json();
      const comments = res.data || [];
  
      const commentsWithUserData = await Promise.all(
        comments.map(async (comment) => {
          const userResponse = await fetch(`${baseUrl}/auth/showcommentuser`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ user: comment.userId }),
          });
  
          if (!userResponse.ok) throw new Error("Failed to fetch user data");
  
          const userData = await userResponse.json();
          return {
            ...comment,
            commenter: userData.commenter,
          };
        })
      );
  
      // Sort comments by createdAt in descending order
      commentsWithUserData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
      setCommentOnRemedy(commentsWithUserData);
    } catch (error) {
      console.log(error);
    }
  };
  
  

  useEffect(() => {
    showComments();
  }, [id, token]);

  const curr_remedy = async () => {
    try {
      const response = await fetch(`${baseUrl}/auth/remedydetail/${id}`);
      if (!response.ok) {
        throw new Error("Remedy Detail Not Found");
      }
      const data = await response.json();
      setCurrRemedy(data.remedydetail);
      setOwner(data.ownerdata);
    } catch (error) {
      console.error("Error fetching remedy details:", error);
      toast.error("Error fetching remedy details");
    }
  };

  useEffect(() => {
    curr_remedy();
  }, [id]);

  const getImageSrc = (buffer) => {
    if (!buffer) return "";
    const binary = new Uint8Array(buffer.data).reduce(
      (acc, byte) => acc + String.fromCharCode(byte),
      ""
    );
    const base64String = window.btoa(binary);
    return `data:image/jpeg;base64,${base64String}`;
  };

  const handleInput = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/auth/comment`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment, RemedyId: id }),
      });

      if (!response.ok) {
        toast.error("Failed to post : Please Login")
        throw new Error("Failed to post comment");
      }

      const data = await response.json();
      toast.success("Comment Post");
      setComment("");
      showComments();
    } catch (error) {
      console.log(`Internal server error: ${error}`);
    }
  };

  const bookMarkRemedy = async () => {
    try {
      const response = await fetch(`${baseUrl}/auth/bookmark`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ RemedyId: id }),
      });

    

      if (response.status === 403) {
       
        setRemedySaved(false);
      } else if (response.status === 200) {
        
        setRemedySaved(true);
        toast.info("Saved")
      } else if(response.status === 401) {
         toast.info("Please login to Save ")
      } else {
         toast.error("Not an authorized user")
      }

      
       
    } catch (error) {
      console.log(`Internal server error: ${error}`);
    }
  };

  const bookMarkOrNot = async () => {
    try {
      const response = await fetch(`${baseUrl}/auth/bookmarkornot`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ RemedyId: id }),
      });

      if (response.status === 403) {
        setRemedySaved(true);
      } else if (response.status === 200) {
        setRemedySaved(false);
       
      } 

      if (!response.ok) {
        console.log("Server side error");
        return;
      }
    } catch (error) {
      console.log(`Internal server error: ${error}`);
    }
  };

  useEffect(() => {
   if (id && token) {
      bookMarkOrNot();
    }
  }, [id, token]);
  
  const [ownerDetailshow , setOwnerDetailshow] = useState("hidden")
 
  

  if (!currRemedy) {
    return (
      <div className="w-[100vw] h-[90vh] relative top-[10vh] flex justify-center items-center">
        <p className="text-3xl font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          display: none; /* Safari and Chrome */
        }
        .custom-scrollbar {
          -ms-overflow-style: none; /* Internet Explorer and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>

<div className="w-[100vw] h-[90vh] top-[10vh] flex flex-row max-sm:flex-col overflow-x-hidden">

  <div className="fixed w-[20%] h-full max-sm:hidden left-0 top-[10vh] border-r border-black">
    <div className="w-full h-48 px-2">
      <div className="w-full h-12 flex justify-start items-center gap-2 border-y px-2 border-black">
        <img
          className="w-8 h-8 rounded-full"
          src={getImageSrc(owner.profileimg) || defaultimg}
          alt=""
        />
        <p>{owner.fullname}</p>
      </div>
      <div className="flex gap-4">
        <span>Email :</span>
        <span>{owner.email}</span>
      </div>
      <div className="flex gap-4">
        <span>Phone :</span>
        <span>{owner.ph_no}</span>
      </div>
      <div className="flex gap-4">
        <span>Status :</span>
        <span>{owner.isDoctor ? "Doctor" : "User"}</span>
      </div>
      <div className="flex justify-start mt-2">
        <button className="p-1 text-white bg-blue-700 rounded-md">
          Connect
        </button>
      </div>
    </div>
  </div>

  
<div className="w-[50%] h-full ml-[20%] mr-[30%] max-sm:ml-0 max-sm:w-full p-8 max-sm:p-3 pb-28 max-sm:pb-2 fixed max-sm:relative top-[10vh] overflow-y-scroll custom-scrollbar">
     
    <div className="p-2 img w-[100%] h-auto flex flex-col items-center justify-center">
     <div className="flex w-full justify-between px-4">
      <i onClick={bookMarkRemedy} className={`ri-bookmark-${RemedySaved ? "fill" : "line"} ml-96 max-sm:ml-0`}>
        {RemedySaved ? "Saved" : "Save"}
      </i> 
      
      </div>
      <img
        className="w-[80%] h-full rounded-md"
        src={getImageSrc(currRemedy.image)}
        alt=""
      />
      <p className="opacity-70 underline cursor-pointer">Posted by : {owner.fullname}</p>
    </div> 

    <div className="title_desc">
      <h1 className="font-medium">
        <span className="font-semibold text-2xl">Title : </span>
        {currRemedy.title}
      </h1>
      <br />
      <p className="leading-tight">
        <span className="font-semibold text-2xl">Description : <br /></span>
        {currRemedy.description}
      </p>
      <br />
    </div>
    <div className="stepsAndIngredient">
      <span>
        <p className="font-semibold text-2xl">Ingredients : </p>
        {currRemedy.ingredients}
      </span>
      <br />
      <br />
      <span>
        <p className="font-semibold text-2xl">Steps :</p>
        {currRemedy.steps}
      </span>
      <br />
    </div>
    <br />

    <form
      onSubmit={handleSubmit}
      className="w-full flex justify-evenly items-center h-16"
    >
      <input
        className="w-[75%] h-8 border-4 outline-none border-gray-300 px-2"
        type="text"
        placeholder="Comment here..."
        onChange={handleInput}
        value={comment}
      />
      <button
        type="submit"
        className="py-1 px-6 bg-blue-600 rounded-md text-white"
      >
        Post
      </button>
    </form> 

    <div className="hidden max-sm:flex flex-col">
    <h1>Comments :</h1> <br />
    <section className="flex flex-col gap-8 mb-[15vh]">
      {commentOnRemedy && commentOnRemedy.length > 0 ? (
        commentOnRemedy.map((comment, index) => (
          <div key={index} className="w-full h-auto border-y border-black">
            <span className="p-2 border-b border-black w-full h-10 flex justify-start items-center gap-2">
              <img
                className="w-8 h-8 rounded-full"
                src={getImageSrc(comment.commenter?.profileimg) || defaultimg}
                alt=""
              />
              <p className="flex">
                <span className="text-green-600">
                  {comment.commenter?.isDoctor ? "Dr." : ""}
                </span>
                {comment.commenter?.fullname || "Unknown User"}
              </p>
              <p className="text-xs text-gray-500">  {new Date(comment.createdAt).toLocaleDateString()}</p>
            </span>
            <p>{comment.comment}</p>
          </div>
        ))
      ) : (
        <p>No comments yet</p>
      )}
    </section>
    </div>  

</div> 

 
  <div className="fixed w-[30%] max-sm:hidden h-full right-0 top-[10vh] max-sm:top-0  overflow-y-scroll pr-2 custom-scrollbar">
    <h1>Comments :</h1> <br />
    <section className="flex flex-col gap-8 mb-[15vh]">
  {commentOnRemedy && commentOnRemedy.length > 0 ? (
    commentOnRemedy.map((comment, index) => (
      <div key={index} className="w-full h-auto border-y border-black">
        <span className="p-2 border-b border-black w-full h-10 flex justify-start items-center gap-2">
          <img
            className="w-8 h-8 rounded-full"
            src={getImageSrc(comment.commenter?.profileimg) || defaultimg}
            alt=""
          />
          <div className="flex flex-col">
            <p className="flex">
              <span className="text-green-600">
                {comment.commenter?.isDoctor ? "Dr." : ""}
              </span>
              {comment.commenter?.fullname || "Unknown User"}
            </p>
            <p className="text-xs text-gray-500">  {new Date(comment.createdAt).toLocaleDateString()}</p>
          </div>
        </span>
        <p>{comment.comment}</p>
      </div>
    ))
  ) : (
    <p>No comments yet</p>
  )}
</section>

  </div> 

</div>


    </>
  );
}

export default RemedyDetail;
