// api/auth.js

import axios from 'axios';

export const registerRequest = async (user) => {
  try {
    const res = await axios.post('/api/register', user);
    return res.data;
  } catch (error) {
    throw error.response;
  }
};

export const loginRequest = async (user) => {
  try {
    const res = await axios.post('/api/login', user);
    return res.data;
  } catch (error) {
    throw error.response;
  }
};

export const verifyTokenRequest = async (token) => {
  try {
    const res = await axios.get('/api/verifyToken', {
      headers: {
        Authorization: token,
      },
    });
    return res.data;
  } catch (error) {
    throw error.response;
  }
};

export const updateUserRequest = async (id, user) => {
  try {
    const res = await axios.put(`/api/users/${id}`, user);
    return res.data;
  } catch (error) {
    throw error.response;
  }
};
