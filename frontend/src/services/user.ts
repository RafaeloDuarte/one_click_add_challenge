import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

// Serviço para registrar um novo usuário
export const registerUser = async (userData: { username: string; email: string; password: string }) => {
  const response = await axios.post(`${API_BASE_URL}/users/register`, userData);
  return response.data;
};

// Serviço para realizar login
export const loginUser = async (loginData: { email: string; password: string; lng: string }) => {
  const response = await axios.post(`${API_BASE_URL}/users/login`, loginData);
  return response.data;
};