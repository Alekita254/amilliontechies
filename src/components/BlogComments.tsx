//
// import { useState, useEffect, useCallback } from "react";
// import { FaThumbsUp, FaThumbsDown, FaReply, FaTrash, FaPlus } from "react-icons/fa";
//
// interface Comment {
//   id: number;
//   name: string;
//   text: string;
//   date: string;
//   likes: number;
//   dislikes: number;
//   replies: Comment[];
// }
//
// const CommentItem = ({ comment, onLike, onDislike, onReply, onDelete }) => {
//   const [replyInput, setReplyInput] = useState("");
//   const [isReplying, setIsReplying] = useState(false);
//
//   const handleReply = () => {
//     if (replyInput.trim()) {
//       onReply(comment.id, replyInput);
//       setReplyInput("");
//       setIsReplying(false); // Hide the reply input after submitting
//     }
//   };
//
//   return (
//       <li className="border p-4 rounded-lg mb-4 bg-white shadow-md">
//         <p className="text-sm text-gray-700 font-bold">{comment.name}</p>
//         <p className="text-xs text-gray-500">{comment.date}</p>
//         <p className="text-gray-900 mt-2">{comment.text}</p>
//
//         <div className="flex items-center gap-4 mt-2 text-gray-600">
//           <button onClick={() => onLike(comment.id)} className="flex items-center gap-1 hover:text-blue-500">
//             <FaThumbsUp /> {comment.likes || 0} {/* Ensure likes is a number */}
//           </button>
//           <button onClick={() => onDislike(comment.id)} className="flex items-center gap-1 hover:text-red-500">
//             <FaThumbsDown /> {comment.dislikes || 0} {/* Ensure dislikes is a number */}
//           </button>
//           <button onClick={() => setIsReplying(!isReplying)} className="flex items-center gap-1 hover:text-green-500">
//             <FaReply /> Reply
//           </button>
//           <button onClick={() => onDelete(comment.id)} className="flex items-center gap-1 hover:text-red-500">
//             <FaTrash /> Delete
//           </button>
//         </div>
//
//         {/* Reply Input Field */}
//         {isReplying && (
//             <div className="mt-4 pl-6 border-l-2 border-gray-300">
//           <textarea
//               placeholder="Write a reply..."
//               className="w-full p-2 border rounded"
//               rows={2}
//               value={replyInput}
//               onChange={(e) => setReplyInput(e.target.value)}
//           ></textarea>
//               <button
//                   className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
//                   onClick={handleReply}
//               >
//                 Submit Reply
//               </button>
//             </div>
//         )}
//
//         {/* Display Replies */}
//         {comment.replies.length > 0 && (
//             <ul className="mt-4 pl-6 border-l-2 border-gray-300">
//               {comment.replies.map((reply) => (
//                   <CommentItem
//                       key={reply.id}
//                       comment={reply}
//                       onLike={onLike}
//                       onDislike={onDislike}
//                       onReply={onReply}
//                       onDelete={onDelete}
//                   />
//               ))}
//             </ul>
//         )}
//       </li>
//   );
// };
//
// const BlogComments = ({ postId }: { postId: number }) => {
//   const [comments, setComments] = useState<Comment[]>([]);
//   const [name, setName] = useState("");
//   const [text, setText] = useState("");
//   const [isAddingComment, setIsAddingComment] = useState(false); // State to toggle comment input form
//
//   useEffect(() => {
//     const savedComments = localStorage.getItem(`comments-${postId}`);
//     if (savedComments) {
//       try {
//         const parsedComments: Comment[] = JSON.parse(savedComments);
//         const validatedComments = parsedComments.map((comment) => ({
//           ...comment,
//           likes: comment.likes || 0, // Ensure likes is a number
//           dislikes: comment.dislikes || 0, // Ensure dislikes is a number
//           replies: comment.replies
//               ? comment.replies.map((reply) => ({
//                 ...reply,
//                 likes: reply.likes || 0, // Ensure likes is a number
//                 dislikes: reply.dislikes || 0, // Ensure dislikes is a number
//                 replies: reply.replies || [],
//               }))
//               : [],
//         }));
//         setComments(validatedComments);
//       } catch (error) {
//         console.error("Error parsing comments from localStorage", error);
//         setComments([]);
//       }
//     }
//   }, [postId]);
//
//   const saveComments = useCallback(
//       (newComments: Comment[]) => {
//         setComments(newComments);
//         localStorage.setItem(`comments-${postId}`, JSON.stringify(newComments));
//       },
//       [postId]
//   );
//
//   const handleAddComment = () => {
//     if (!name || !text) return;
//     const newComment: Comment = {
//       id: Date.now(),
//       name,
//       text,
//       date: new Date().toLocaleString(),
//       likes: 0,
//       dislikes: 0,
//       replies: [],
//     };
//     saveComments([newComment, ...comments]);
//     setName("");
//     setText("");
//     setIsAddingComment(false); // Hide the comment input form after submitting
//   };
//
//   const handleLike = useCallback(
//       (id: number) => {
//         const updatedComments = comments.map((comment) =>
//             comment.id === id ? { ...comment, likes: (comment.likes || 0) + 1 } : comment
//         );
//         saveComments(updatedComments);
//       },
//       [comments, saveComments]
//   );
//
//   const handleDislike = useCallback(
//       (id: number) => {
//         const updatedComments = comments.map((comment) =>
//             comment.id === id ? { ...comment, dislikes: (comment.dislikes || 0) + 1 } : comment
//         );
//         saveComments(updatedComments);
//       },
//       [comments, saveComments]
//   );
//
//   const handleDeleteComment = useCallback(
//       (id: number) => {
//         const filteredComments = comments.filter((comment) => comment.id !== id);
//         saveComments(filteredComments);
//       },
//       [comments, saveComments]
//   );
//
//   const handleReply = useCallback(
//       (id: number, replyText: string) => {
//         const updatedComments = comments.map((comment) =>
//             comment.id === id
//                 ? {
//                   ...comment,
//                   replies: [
//                     ...comment.replies,
//                     {
//                       id: Date.now(),
//                       name: "Anonymous",
//                       text: replyText,
//                       date: new Date().toLocaleString(),
//                       likes: 0,
//                       dislikes: 0,
//                       replies: [],
//                     },
//                   ],
//                 }
//                 : comment
//         );
//         saveComments(updatedComments);
//       },
//       [comments, saveComments]
//   );
//
//   return (
//       <div className="mt-10 p-4 border-t">
//         <h3 className="text-xl font-semibold mb-4">Comments</h3>
//
//         {/* Button to Toggle Comment Input Form */}
//         {!isAddingComment && (
//             <button
//                 className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition flex items-center gap-2"
//                 onClick={() => setIsAddingComment(true)}
//             >
//               <FaPlus /> Add New Comment
//             </button>
//         )}
//
//         {/* Comment Input Form - Visible when isAddingComment is true */}
//         {isAddingComment && (
//             <div className="mb-4 bg-gray-100 p-4 rounded-lg shadow">
//               <input
//                   type="text"
//                   placeholder="Your Name"
//                   className="w-full p-2 border rounded mb-2"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//               />
//               <textarea
//                   placeholder="Write a comment..."
//                   className="w-full p-2 border rounded"
//                   rows={3}
//                   value={text}
//                   onChange={(e) => setText(e.target.value)}
//               ></textarea>
//               <div className="flex gap-2">
//                 <button
//                     className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
//                     onClick={handleAddComment}
//                 >
//                   Submit
//                 </button>
//                 <button
//                     className="mt-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
//                     onClick={() => setIsAddingComment(false)}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//         )}
//
//         {/* Display Comments */}
//         <ul>
//           {comments.length > 0 ? (
//               comments.map((comment) => (
//                   <CommentItem
//                       key={comment.id}
//                       comment={comment}
//                       onLike={handleLike}
//                       onDislike={handleDislike}
//                       onReply={handleReply}
//                       onDelete={handleDeleteComment}
//                   />
//               ))
//           ) : (
//               <p className="text-gray-500">No comments yet. Click "Add New Comment" to get started!</p>
//           )}
//         </ul>
//       </div>
//   );
// };
//
// export default BlogComments;

import { useState, useEffect, useCallback } from "react";
import { FaThumbsUp, FaThumbsDown, FaReply, FaTrash, FaPlus } from "react-icons/fa";

interface Comment {
  id: number;
  name: string;
  text: string;
  date: string;
  likes: number;
  dislikes: number;
  replies: Comment[];
}

const CommentItem = ({ comment, onLike, onDislike, onReply, onDelete }) => {
  const [replyInput, setReplyInput] = useState("");
  const [replyName, setReplyName] = useState("");
  const [isReplying, setIsReplying] = useState(false);

  const handleReply = () => {
    if (replyName.trim() && replyInput.trim()) {
      onReply(comment.id, replyName, replyInput);
      setReplyInput("");
      setReplyName("");
      setIsReplying(false);
    }
  };

  return (
      <li className="border p-4 rounded-lg mb-4 bg-white shadow-md">
        <p className="text-sm text-gray-700 font-bold">{comment.name}</p>
        <p className="text-xs text-gray-500">{comment.date}</p>
        <p className="text-gray-900 mt-2">{comment.text}</p>

        <div className="flex items-center gap-4 mt-2 text-gray-600">
          <button onClick={() => onLike(comment.id)} className="flex items-center gap-1 hover:text-blue-500">
            <FaThumbsUp /> {comment.likes || 0}
          </button>
          <button onClick={() => onDislike(comment.id)} className="flex items-center gap-1 hover:text-red-500">
            <FaThumbsDown /> {comment.dislikes || 0}
          </button>
          <button onClick={() => setIsReplying(!isReplying)} className="flex items-center gap-1 hover:text-green-500">
            <FaReply /> Reply
          </button>
          <button onClick={() => onDelete(comment.id)} className="flex items-center gap-1 hover:text-red-500">
            <FaTrash /> Delete
          </button>
        </div>

        {isReplying && (
            <div className="mt-4 pl-6 border-l-2 border-gray-300">
              <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-2 border rounded mb-2"
                  value={replyName}
                  onChange={(e) => setReplyName(e.target.value)}
              />
              <textarea
                  placeholder="Write a reply..."
                  className="w-full p-2 border rounded"
                  rows={2}
                  value={replyInput}
                  onChange={(e) => setReplyInput(e.target.value)}
              ></textarea>
              <button
                  className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                  onClick={handleReply}
              >
                Submit Reply
              </button>
            </div>
        )}

        {comment.replies.length > 0 && (
            <ul className="mt-4 pl-6 border-l-2 border-gray-300">
              {comment.replies.map((reply) => (
                  <CommentItem
                      key={reply.id}
                      comment={reply}
                      onLike={onLike}
                      onDislike={onDislike}
                      onReply={onReply}
                      onDelete={onDelete}
                  />
              ))}
            </ul>
        )}
      </li>
  );
};

const BlogComments = ({ postId }: { postId: number }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [isAddingComment, setIsAddingComment] = useState(false);

  useEffect(() => {
    const savedComments = localStorage.getItem(`comments-${postId}`);
    if (savedComments) {
      try {
        const parsedComments: Comment[] = JSON.parse(savedComments);
        const validatedComments = parsedComments.map((comment) => ({
          ...comment,
          likes: comment.likes || 0,
          dislikes: comment.dislikes || 0,
          replies: comment.replies
              ? comment.replies.map((reply) => ({
                ...reply,
                likes: reply.likes || 0,
                dislikes: reply.dislikes || 0,
                replies: reply.replies || [],
              }))
              : [],
        }));
        setComments(validatedComments);
      } catch (error) {
        console.error("Error parsing comments from localStorage", error);
        setComments([]);
      }
    }
  }, [postId]);

  const saveComments = useCallback(
      (newComments: Comment[]) => {
        setComments(newComments);
        localStorage.setItem(`comments-${postId}`, JSON.stringify(newComments));
      },
      [postId]
  );

  const handleAddComment = () => {
    if (!name || !text) return;
    const newComment: Comment = {
      id: Date.now(),
      name,
      text,
      date: new Date().toLocaleString(),
      likes: 0,
      dislikes: 0,
      replies: [],
    };
    saveComments([newComment, ...comments]);
    setName("");
    setText("");
    setIsAddingComment(false);
  };

  const handleLike = useCallback(
      (id: number) => {
        const updatedComments = comments.map((comment) =>
            comment.id === id ? { ...comment, likes: (comment.likes || 0) + 1 } : comment
        );
        saveComments(updatedComments);
      },
      [comments, saveComments]
  );

  const handleDislike = useCallback(
      (id: number) => {
        const updatedComments = comments.map((comment) =>
            comment.id === id ? { ...comment, dislikes: (comment.dislikes || 0) + 1 } : comment
        );
        saveComments(updatedComments);
      },
      [comments, saveComments]
  );

  const handleDeleteComment = useCallback(
      (id: number) => {
        const filteredComments = comments.filter((comment) => comment.id !== id);
        saveComments(filteredComments);
      },
      [comments, saveComments]
  );

  const handleReply = useCallback(
      (id: number, replyName: string, replyText: string) => {
        const updatedComments = comments.map((comment) =>
            comment.id === id
                ? {
                  ...comment,
                  replies: [
                    ...comment.replies,
                    {
                      id: Date.now(),
                      name: replyName,
                      text: replyText,
                      date: new Date().toLocaleString(),
                      likes: 0,
                      dislikes: 0,
                      replies: [],
                    },
                  ],
                }
                : comment
        );
        saveComments(updatedComments);
      },
      [comments, saveComments]
  );

  return (
      <div className="mt-10 p-4 border-t">
        <h3 className="text-xl font-semibold mb-4">Comments</h3>

        {/* Button to Toggle Comment Input Form */}
        {!isAddingComment && (
            <button
                className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition flex items-center gap-2"
                onClick={() => setIsAddingComment(true)}
            >
              <FaPlus /> Add New Comment
            </button>
        )}

        {/* Comment Input Form - Visible when isAddingComment is true */}
        {isAddingComment && (
            <div className="mb-4 bg-gray-100 p-4 rounded-lg shadow">
              <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-2 border rounded mb-2"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
              />
              <textarea
                  placeholder="Write a comment..."
                  className="w-full p-2 border rounded"
                  rows={3}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
              ></textarea>
              <div className="flex gap-2">
                <button
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    onClick={handleAddComment}
                >
                  Submit
                </button>
                <button
                    className="mt-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                    onClick={() => setIsAddingComment(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
        )}

        {/* Display Comments */}
        <ul>
          {comments.length > 0 ? (
              comments.map((comment) => (
                  <CommentItem
                      key={comment.id}
                      comment={comment}
                      onLike={handleLike}
                      onDislike={handleDislike}
                      onReply={handleReply}
                      onDelete={handleDeleteComment}
                  />
              ))
          ) : (
              <p className="text-gray-500">No comments yet. Click "Add New Comment" to get started!</p>
          )}
        </ul>
      </div>
  );
};

export default BlogComments;

