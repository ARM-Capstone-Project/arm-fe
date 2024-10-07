import axios from 'axios';

const API_URL = 'http://example.com/api/auth/'; // Replace with your API URL

export const login = (email: string, password: string) => {
  return axios.post(API_URL + 'login', { email, password });
};