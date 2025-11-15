// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import { getAllPosts ,deletePost} from '../services/postService';
import { AuthContext } from '../context/AuthContext';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
    const { user } = React.useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getAllPosts();
        setPosts(response.data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };
    fetchPosts();
  }, []);

 const handleDelete = async (postId) => {
    try {
      await deletePost(postId);
      // Refresh posts list by filtering out the deleted one
      setPosts(posts.filter(post => post._id !== postId));
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };


return (
    <div>
      <h2>All Posts</h2>
     {posts.map((post) => (
  <div key={post._id} className="post-card">
    <h3>{post.title}</h3>
    <p className="author">by {post.author.username}</p>
    <p>{post.content}</p>
    {user && user.userId === post.author._id && (
      <button onClick={() => handleDelete(post._id)}>Delete</button>
    )}
  </div>
))}
    </div>
  );
};

export default HomePage;