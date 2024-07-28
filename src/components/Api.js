import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const createTask = (task) => {
  return axios.post(`${API_URL}/createTasks`, task);
};

export const getTasks = () => {
  return axios.get(`${API_URL}/getAlltasks`);
};

export const getTaskById = (id) => {
  return axios.get(`${API_URL}/getTasksById/${id}`);
};

export const updateTask = (id, task) => {
  return axios.put(`${API_URL}/Updatetasks/${id}`, task);
};

export const deleteTask = (id) => {
  return axios.delete(`${API_URL}/Deletetasks/${id}`);
};
