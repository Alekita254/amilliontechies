import { useState, useEffect, useCallback } from "react";
import { FaThumbsUp, FaThumbsDown, FaReply, FaPlus } from "react-icons/fa";
import { apiGetRequest, apiPostRequest } from "@/backend/functions"; // Import your API functions

interface Comment {
    id: number;
    name: string;
    message: string;
    created_at: string;
    likes: number;
    dislikes: number;
    parent: number | null; 
    replies: Comment[];
    comments?: Comment[];
  }

const CommentItem = ({ comment, onLike, onDislike, onReply }) => {
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
            <p className="text-xs text-gray-500">{comment.created_at}</p>
            <p className="text-gray-900 mt-2">{comment.message}</p>

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
    const [isAddingComment, setIsAddingComment] = useState(true);

  
    // const fetchComments = useCallback(async () => {
    //     try {
    //         const response = await apiGetRequest(`comments/blog/${postId}/`);
    //         if (response.data) {
    //             const commentsData = Array.isArray(response.data.data) ? response.data.data : [response.data.data];
                
    //             // Ensure `replies` is always an array
    //             const formattedComments = commentsData.map(comment => ({
    //                 ...comment,
    //                 replies: Array.isArray(comment.replies) ? comment.replies : [],
    //             }));
    
    //             setComments(formattedComments);
    //         }
    //     } catch (error) {
    //         console.error("Failed to fetch comments:", error);
    //     }
    // }, [postId]);

    const fetchComments = useCallback(async () => {
        try {
          const response = await apiGetRequest(`comments/blog/${postId}/`);
          if (response.data) {
            const commentsData = Array.isArray(response.data.data) ? response.data.data : [response.data.data];
      
            // Flatten the nested comments into a single array
            const flattenComments = (comments: Comment[]): Comment[] => {
              return comments.reduce((acc, comment) => {
                acc.push(comment);
                if (comment.replies && comment.replies.length > 0) {
                  acc.push(...flattenComments(comment.replies));
                }
                return acc;
              }, [] as Comment[]);
            };
      
            const flattenedComments = flattenComments(commentsData);
            setComments(flattenedComments);
          }
        } catch (error) {
          console.error("Failed to fetch comments:", error);
        }
      }, [postId]);

      

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    // Add a new comment
    const handleAddComment = async () => {
        if (!name || !text) return;

        try {
            const newComment = {
                name,
                message: text, // Use 'message' instead of 'text'
                blog: postId, // The ID of the blog post
            };

            const response = await apiPostRequest("comments/", newComment);
            if (response) {
                // Refresh the comments list after adding a new comment
                // fetchComments();
                setName("");
                setText("");
                setIsAddingComment(true);
                fetchComments();

            }
        } catch (error) {
            console.error("Failed to add comment:", error);
        }
    };

    // Handle liking a comment
    const handleLike = useCallback(async (id: number) => {
        try {
            await apiPostRequest(`comments/${id}/like/`, {}); // Assuming the backend has a like endpoint
            fetchComments(); // Refresh the comments list
        } catch (error) {
            console.error("Failed to like comment:", error);
        }
    }, [fetchComments]);

    // Handle disliking a comment
    const handleDislike = useCallback(async (id: number) => {
        try {
            await apiPostRequest(`comments/${id}/dislike/`, {}); // Assuming the backend has a dislike endpoint
            fetchComments(); // Refresh the comments list
        } catch (error) {
            console.error("Failed to dislike comment:", error);
        }
    }, [fetchComments]);

    // Handle replying to a comment
    const handleReply = useCallback(async (id: number, replyName: string, replyText: string) => {
        try {
            const replyData = {
                name: replyName,
                message: replyText, // Use 'message' instead of 'text'
                parent: id, // The ID of the parent comment
                blog: postId, // The ID of the blog post
            };

            await apiPostRequest("comments/", replyData);
            fetchComments(); // Refresh the comments list
        } catch (error) {
            console.error("Failed to reply to comment:", error);
        }
    }, [fetchComments, postId]);

    console.log("isAddingComment state:", isAddingComment, "The comments received are: ", comments);

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
                <>               
                <div className="border p-4 rounded-lg mb-4 bg-white shadow-md">
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
                </>
             )} 

            {/* Display Comments */}
            <ul>
    {comments.length > 0 && comments[0]?.comments?.length > 0 ? (
        comments[0].comments
            .filter((comment) => comment.parent === null) // Only display top-level comments
            .map((comment) => (
                <CommentItem
                    key={comment.id}
                    comment={comment}
                    onLike={handleLike}
                    onDislike={handleDislike}
                    onReply={handleReply}
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