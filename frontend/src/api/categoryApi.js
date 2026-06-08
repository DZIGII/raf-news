import api from "./axios";

export const getCategories = (page = 1, limit = 30) =>
    api.get(`/categories?page=${page}&limit=${limit}`);

export const getCategoryById = (id) =>
    api.get(`/categories/${id}`);

export const findCategoryByName = (q) =>
    api.get(`/categories/find?q=${q}`);

export const createCategory = (data) =>
    api.post("/categories", data);

export const updateCategory = (data) =>
    api.put("/categories", data);

export const deleteCategory = (id) =>
    api.delete(`/categories/${id}`);