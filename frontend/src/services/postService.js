// src/services/postService.js
import api from './api';

export const createPost = (postData) => {
  return api.post('/posts', postData);
};

export const getAllPosts = () => {
  return api.get('/posts');
};

export const updatePost = (id, postData) => {
  return api.put(`/posts/${id}`, postData);
};

export const deletePost = (id) => {
  return api.delete(`/posts/${id}`);
};