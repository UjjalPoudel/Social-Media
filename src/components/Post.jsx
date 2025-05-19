import React, { useContext, useState } from 'react';
import { PostList as PostListContext } from '../store/Post-List-Store';

const Post = ({ id, title, text, image, comments = [], likes }) => {
  const { deletePost, likePost, commentOnPost, deleteComment } = useContext(PostListContext);
  const [commentText, setCommentText] = useState('');
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    likePost(id);
    setLiked(!liked);
  };

  const handleAddComment = () => {
    if (commentText.trim() !== '') {
      commentOnPost(id, commentText); // 👈 Sends comment to global state
      setCommentText('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddComment();
    }
  };

  return (
    <div className="card shadow h-100 p-2 rounded-4 mb-3">
      <img
        src={image || "https://via.placeholder.com/300x200"}
        className="card-img-top rounded-4"
        alt={title || "Card image"}
      />
      <div className="card-body">
        <h5 className="card-title">{title || "Untitled"}</h5>
        <p className="card-text">{text || "No content available."}</p>

        {/* Buttons: Like / Comment / Delete */}
        <div className="d-flex gap-1 mb-2">
          <button
            className={`btn btn-sm ${liked ? 'btn-danger' : 'btn-outline-danger'}`}
            onClick={handleLike}
          >
            ❤️ {likes}
          </button>
          <button className="btn btn-sm btn-outline-secondary" onClick={handleAddComment}>
            💬 Comment
          </button>
          <button className="btn btn-sm btn-outline-dark" onClick={() => deletePost(id)}>
            🗑️ Delete
          </button>
        </div>

        {/* Comment Input Field with Enter key support */}
        <input
          type="text"
          className="form-control form-control-sm mb-2"
          placeholder="Add a comment and press Enter..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        {/* Comment List */}
        {comments.length > 0 && (
          <ul className="list-group list-group-flush">
            {comments.map((comment) => (
              <li
                key={comment.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>{comment.text}</span>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => deleteComment(id, comment.id)}
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Post;
