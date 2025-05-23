import React, { createContext, useReducer, useState, useEffect } from 'react';

// Sample initial posts
const initialPosts = [
  { id: 1, title: "Ramu", text: "Short content", image: "https://via.placeholder.com/300x150/FF5733/ffffff", likes: 0, comments: [], userID: 'Ramu', userImage: '', tag: ['kathmandu', 'nepal'] },
  { id: 2, title: "Hari", text: "This is a longer post with more content to display. The card will be taller.", image: "https://via.placeholder.com/300x200/33FF57/ffffff", likes: 0, comments: [], userID: 'Vishnu', userImage: '', tag: ['kathmandu', 'nepal'] },
  { id: 3, title: "Shiva", text: "Medium length content here.", image: "https://via.placeholder.com/300x180/3357FF/ffffff", likes: 0, comments: [], userID: 'Shiva', userImage: '', tag: ['kathmandu', 'nepal'] },
];

const initialState = {
  postList: [],
  addPost: () => {},
  deletePost: () => {},
  updatePost: () => {},
  likePost: () => {},
  unlikePost: () => {},
  commentOnPost: () => {},
  deleteComment: () => {},
  replyToComment: () => {},
  deleteReply: () => {},
  loading: false,
};

export const PostList = createContext(initialState);

export const postListReducer = (currPostList, action) => {
  switch (action.type) {
    case 'SET_POSTS':
      return action.payload;
    case 'ADD_POST':
      return [...currPostList, action.payload];
    case 'DELETE_POST':
      return currPostList.filter((post) => post.id !== action.payload);
    case 'UPDATE_POST':
      return currPostList.map((post) => post.id === action.payload.id ? action.payload : post);
    case 'LIKE_POST':
      return currPostList.map((post) => post.id === action.payload.id ? { ...post, likes: post.likes + 1 } : post);
    case 'UNLIKE_POST':
      return currPostList.map((post) => post.id === action.payload.id ? { ...post, likes: post.likes - 1 } : post);
    case 'COMMENT_ON_POST':
      return currPostList.map((post) => post.id === action.payload.postId ? { ...post, comments: [...post.comments, action.payload.comment] } : post);
    case 'DELETE_COMMENT':
      return currPostList.map((post) => post.id === action.payload.postId ? { ...post, comments: post.comments.filter((comment) => comment.id !== action.payload.commentId) } : post);
    case 'REPLY_TO_COMMENT':
      return currPostList.map((post) => post.id === action.payload.postId ? { ...post, comments: post.comments.map((comment) => comment.id === action.payload.commentId ? { ...comment, replies: [...(comment.replies || []), action.payload.reply] } : comment) } : post);
    case 'DELETE_REPLY':
      return currPostList.map((post) => post.id === action.payload.postId ? { ...post, comments: post.comments.map((comment) => comment.id === action.payload.commentId ? { ...comment, replies: (comment.replies || []).filter((reply) => reply.id !== action.payload.replyId) } : comment) } : post);
    default:
      return currPostList;
  }
};

// Simple Loader component
const Loader = () => (
  <div style={{ textAlign: 'center', padding: '2rem' }}>
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
    <div>Loading posts...</div>
  </div>
);

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(postListReducer, []);
  const [loading, setLoading] = useState(true);
  const [allDeleted, setAllDeleted] = useState(false);

  // Simulate fetching posts (add your real fetch logic here)
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      dispatchPostList({ type: 'SET_POSTS', payload: initialPosts });
      setLoading(false);
    }, 1200); // Simulate network delay
  }, []);

  // Notify when all posts are deleted
  useEffect(() => {
    if (!loading && postList.length === 0) {
      setAllDeleted(true);
      // You can also trigger a toast/alert here
      // alert('All posts have been deleted!');
    } else {
      setAllDeleted(false);
    }
  }, [postList, loading]);

  // Updated functions to accept parameters
  const addPost = (postData) => {
    const newPost = {
      id: Date.now(),
      title: postData.title || 'New Post',
      text: postData.text || 'New Post Text',
      image: postData.image || 'https://via.placeholder.com/300x150/FF5733/ffffff',
      likes: 0,
      comments: [],
      userID: postData.userID || 'User',
      userImage: postData.userImage || '',
      tag: postData.tags || ['kathmandu', 'nepal']
    };
    dispatchPostList({ type: 'ADD_POST', payload: newPost });
  };

  const deletePost = (postId) => {
    dispatchPostList({ type: 'DELETE_POST', payload: postId });
  };

  const updatePost = (updatedPost) => {
    dispatchPostList({ type: 'UPDATE_POST', payload: updatedPost });
  };

  const likePost = (postId) => {
    dispatchPostList({ type: 'LIKE_POST', payload: { id: postId } });
  };

  const unlikePost = (postId) => {
    dispatchPostList({ type: 'UNLIKE_POST', payload: { id: postId } });
  };

  const commentOnPost = (postId, commentText, userId = 'User', userImage = '') => {
    dispatchPostList({
      type: 'COMMENT_ON_POST',
      payload: {
        postId: postId,
        comment: {
          id: Date.now(),
          text: commentText,
          userID: userId,
          userImage: userImage
        }
      }
    });
  };

  const deleteComment = (postId, commentId) => {
    dispatchPostList({
      type: 'DELETE_COMMENT',
      payload: {
        postId: postId,
        commentId: commentId
      }
    });
  };

  const replyToComment = (postId, commentId, replyText, userId = 'User', userImage = '') => {
    dispatchPostList({
      type: 'REPLY_TO_COMMENT',
      payload: {
        postId: postId,
        commentId: commentId,
        reply: {
          id: Date.now(),
          text: replyText,
          userID: userId,
          userImage: userImage
        }
      }
    });
  };

  const deleteReply = (postId, commentId, replyId) => {
    dispatchPostList({
      type: 'DELETE_REPLY',
      payload: {
        postId: postId,
        commentId: commentId,
        replyId: replyId
      }
    });
  };

  return (
    <PostList.Provider value={{
      postList,
      addPost,
      deletePost,
      updatePost,
      likePost,
      unlikePost,
      commentOnPost,
      deleteComment,
      replyToComment,
      deleteReply,
      loading,
      allDeleted,
    }}>
      {loading ? (
        <Loader />
      ) : (
        <>
          {allDeleted && (
            <div className="alert alert-warning text-center" role="alert">
              All posts have been deleted!
            </div>
          )}
          {children}
        </>
      )}
    </PostList.Provider>
  );
};

export default PostListProvider;
