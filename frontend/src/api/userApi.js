import api from "./axios";

export const getUsers = (page = 1, limit = 10) =>
    api.get(`/users?page=${page}&limit=${limit}`);

export const getUserById = (id) =>
    api.get(`/users/${id}`);

export const updateUserByAdmin = (id, data) =>
    api.put(`/users/${id}`, data);

export const toggleUserActive = (id) =>
    api.patch(`/users/${id}/toggle-active`);

export const deleteUser = (id) =>
    api.delete(`/users/delete/${id}`);
