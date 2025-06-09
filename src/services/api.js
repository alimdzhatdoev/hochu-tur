import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const getFeaturedTours = async () => {
  const res = await axios.get(`${API_URL}/tours?isFeatured=true`);
  return res.data;
};

export const sendContactMessage = async (data) => {
  return await axios.post(`${API_URL}/messages`, data);
};
