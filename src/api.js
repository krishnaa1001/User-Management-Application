import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com/users";

export const fetchUsers = () => {
  return axios.get(BASE_URL);
};

export const createUser = (userData) => {
  return axios.post(BASE_URL, userData);
};

export const updateUser = (id, userData) => {
  return axios.put(`${BASE_URL}/${id}`, userData);
};

export const deleteUser = (id) => {
  return axios.delete(`${BASE_URL}/${id}`);
};
