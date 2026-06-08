import api from "./axios";

export const getNews = (page = 1, limit = 10) =>
    api.get(`/news?page=${page}&limit=${limit}`);

export const getNewsById = (id) =>
    api.get(`/news/${id}`);

export const getMostReadNews = () =>
    api.get("/news/most-read");

export const getTopReactions = () =>
    api.get("/news/top-reactions");

export const filterNews = (params) =>
    api.get("/news/filter", { params });

export const getNewsByTag = (tagId, page = 1, limit = 10) =>
    api.get(`/news/tag/${tagId}?page=${page}&limit=${limit}`);

export const createNews = (formData) =>
    api.post("/news", formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });

export const updateNews = (id, formData) =>
    api.put(`/news/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });

export const deleteNews = (id) =>
    api.delete(`/news/${id}`);

export const getRelatedNews = (id) =>
    api.get(`/news/${id}/related`);

export const likeNews = (id) =>
    api.post(`/news/${id}/like`);

export const dislikeNews = (id) =>
    api.post(`/news/${id}/dislike`);
