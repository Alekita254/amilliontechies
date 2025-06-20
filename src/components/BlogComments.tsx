import { useState, useEffect, useCallback } from "react";
import { FaThumbsUp, FaThumbsDown, FaReply, FaPlus } from "react-icons/fa";
import { apiGetRequest, apiPostRequest } from "@/backend/functions";

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
        <li className="border p-4 rounded-lg mb-4 bg-white shadow-md border-gray-200
                       dark:bg-[#101014] dark:border-[#23232b]">
            <p className="text-sm text-gray-700 dark:text-gray-200 font-bold">{comment.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{comment.created_at}</p>
            <p className="text-gray-900 dark:text-gray-100 mt-2">{comment.message}</p>

            <div className="flex items-center gap-4 mt-2 text-gray-600 dark:text-gray-400">
                <button onClick={() => onLike(comment.id)} className="flex items-center gap-1 hover:text-blue-500 dark:hover:text-blue-400">
                    <FaThumbsUp /> {comment.likes || 0}
                </button>
                <button onClick={() => onDislike(comment.id)} className="flex items-center gap-1 hover:text-red-500 dark:hover:text-red-400">
                    <FaThumbsDown /> {comment.dislikes || 0}
                </button>
                <button onClick={() => setIsReplying(!isReplying)} className="flex items-center gap-1 hover:text-green-500 dark:hover:text-green-400">
                    <FaReply /> Reply
                </button>
            </div>

            {isReplying && (
                <div className="mt-4 pl-6 border-l-2 border-gray-300 dark:border-[#23232b]">
                    <input
                        type="text"
                        placeholder="Your Name"
                        className="w-full p-2 border rounded mb-2 bg-white dark:bg-[#18181f] dark:border-[#23232b] dark:text-gray-100"
                        value={replyName}
                        onChange={(e) => setReplyName(e.target.value)}
                    />
                    <textarea
                        placeholder="Write a reply..."
                        className="w-full p-2 border rounded bg-white dark:bg-[#18181f] dark:border-[#23232b] dark:text-gray-100"
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
                <ul className="mt-4 pl-6 border-l-2 border-gray-300 dark:border-[#23232b]">
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

    const fetchComments = useCallback(async () => {
        try {
            const response = await apiGetRequest(`comments/blog/${postId}/`);
            if (response.data) {
                const commentsData = Array.isArray(response.data.data) ? response.data.data : [response.data.data];
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

    const handleAddComment = async () => {
        if (!name || !text) return;
        try {
            const newComment = {
                name,
                message: text,
                blog: postId,
            };
            const response = await apiPostRequest("comments/", newComment);
            if (response) {
                setName("");
                setText("");
                setIsAddingComment(true);
                fetchComments();
            }
        } catch (error) {
            console.error("Failed to add comment:", error);
        }
    };

    const handleLike = useCallback(async (id: number) => {
        try {
            await apiPostRequest(`comments/${id}/like/`, {});
            fetchComments();
        } catch (error) {
            console.error("Failed to like comment:", error);
        }
    }, [fetchComments]);

    const handleDislike = useCallback(async (id: number) => {
        try {
            await apiPostRequest(`comments/${id}/dislike/`, {});
            fetchComments();
        } catch (error) {
            console.error("Failed to dislike comment:", error);
        }
    }, [fetchComments]);

    const handleReply = useCallback(async (id: number, replyName: string, replyText: string) => {
        try {
            const replyData = {
                name: replyName,
                message: replyText,
                parent: id,
                blog: postId,
            };
            await apiPostRequest("comments/", replyData);
            fetchComments();
        } catch (error) {
            console.error("Failed to reply to comment:", error);
        }
    }, [fetchComments, postId]);

    return (
        <div className="mt-10 p-4 border-t border-gray-200 dark:border-[#23232b]">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Comments</h3>

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
                <div className="border p-4 rounded-lg mb-4 bg-white shadow-md border-gray-200
                                dark:bg-[#101014] dark:border-[#23232b]">
                    <input
                        type="text"
                        placeholder="Your Name"
                        className="w-full p-2 border rounded mb-2 bg-white dark:bg-[#18181f] dark:border-[#23232b] dark:text-gray-100"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <textarea
                        placeholder="Write a comment..."
                        className="w-full p-2 border rounded bg-white dark:bg-[#18181f] dark:border-[#23232b] dark:text-gray-100"
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