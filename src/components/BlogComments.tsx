import { useState, useEffect } from "react";

interface Comment {
  id: number;
  name: string;
  text: string;
  date: string;
}

const BlogComments = ({ postId }: { postId: number }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  // Load comments from localStorage
  useEffect(() => {
    const savedComments = localStorage.getItem(`comments-${postId}`);
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
  }, [postId]);

  // Save comments to localStorage
  const saveComments = (newComments: Comment[]) => {
    setComments(newComments);
    localStorage.setItem(`comments-${postId}`, JSON.stringify(newComments));
  };

  // Add a new comment
  const handleAddComment = () => {
    if (!name || !text) return;
    const newComment: Comment = {
      id: Date.now(),
      name,
      text,
      date: new Date().toLocaleString(),
    };
    saveComments([newComment, ...comments]);
    setName("");
    setText("");
  };

  // Delete a comment
  const handleDeleteComment = (id: number) => {
    const filteredComments = comments.filter((comment) => comment.id !== id);
    saveComments(filteredComments);
  };

  return (
    <div className="mt-10 p-4 border-t">
      <h3 className="text-xl font-semibold mb-4">Comments</h3>

      {/* Comment Input Form */}
      <div className="mb-4">
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
        <button
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleAddComment}
        >
          Submit
        </button>
      </div>

      {/* Display Comments */}
      <ul>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <li key={comment.id} className="border p-3 rounded mb-2">
              <p className="text-sm text-gray-700">
                <strong>{comment.name}</strong> • {comment.date}
              </p>
              <p className="text-gray-900">{comment.text}</p>
              <button
                className="text-red-500 text-sm mt-1"
                onClick={() => handleDeleteComment(comment.id)}
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No comments yet. Be the first!</p>
        )}
      </ul>
    </div>
  );
};

export default BlogComments;
