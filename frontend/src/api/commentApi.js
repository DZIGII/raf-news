import api from "./axios";

export const getCommentsByNews = (newsId, page = 1, limit = 20) =>
    api.get(`/comments/news/${newsId}?page=${page}&limit=${limit}`);

export const createComment = (data) =>
    api.post("/comments", data);

export const likeComment = (id) =>
    api.post(`/comments/${id}/like`);

export const dislikeComment = (id) =>
    api.post(`/comments/${id}/dislike`);