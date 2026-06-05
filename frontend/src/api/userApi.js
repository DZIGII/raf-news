import api from "./axios";

export const getUsers = (page = 1, limit = 10) =>
    api.get(`/users?page=${page}&limit=${limit}`);

export const deleteUser = (id) =>
    api.delete(`/users/delete/${id}`);