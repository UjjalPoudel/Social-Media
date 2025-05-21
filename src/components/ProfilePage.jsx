import React, { useState, useEffect } from "react";

const mockUser = {
  name: "Jane Doe",
  username: "janedoe",
  avatar: "https://via.placeholder.com/80",
  cover: "https://via.placeholder.com/500x200",
  bio: "Web developer. Coffee lover. Traveler.",
  posts: [
    { id: 1, content: "Hello world! This is my first post." },
    { id: 2, content: "Loving this new social media app!" },
    { id: 3, content: "Just had a great cup of coffee ☕" },
  ],
};

const ProfilePage = () => {
  const [user, setUser] = useState(mockUser);

  useEffect(() => {
    // Get current user ID from token
    const userId = localStorage.getItem('token');
    if (userId) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const found = users.find(u => u.id === userId);
      if (found) {
        setUser({
          ...mockUser,
          name: found.username,
          username: found.username,
        });
      }
    }
  }, []);

  return (
    <div style={{ maxWidth: 500, margin: "2rem auto", padding: 24, border: "1px solid #eee", borderRadius: 8 }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
        <img
          src={user.avatar}
          alt={user.name}
          style={{ width: 80, height: 80, borderRadius: "50%", marginRight: 24 }}
        />
        <div>
          <h2 style={{ margin: 0 }}>{user.name}</h2>
          <p style={{ color: "#888", margin: 0 }}>@{user.username}</p>
        </div>
      </div>
      <p style={{ marginBottom: 24 }}>{user.bio}</p>
      <h3>Posts</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {user.posts.map((post) => (
          <li key={post.id} style={{ background: "#fafafa", padding: 12, borderRadius: 6, marginBottom: 12 }}>
            {post.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfilePage;