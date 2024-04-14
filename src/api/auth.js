/*import axios from './axios.js';

export const registerRequest = user => axios.post(`/register`, user)

export const loginRequest = user => axios.post(`/login`, user)

export const verifyTokenRequest = () => axios.get(`/verify`)

export const updateUserRequest = (id, user) => axios.put(`/profile/${id}`, user)*/


// api/auth.js

import axios from './axios.js';

export const registerRequest = async (user) => {
  try {
    const res = await axios.post('/register', user);
  } catch (error) {
    throw error.response;
  }
};

export const loginRequest = async (user) => {
    try {
      const res = await axios.post('/login', user);
      return res;
    } catch (error) {
      throw error.response;
    }
  };
  

export const verifyTokenRequest = async (token) => {
  try {
    const res = await axios.get('/verify', {
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
    const res = await axios.put(`/users/${id}`, user);
    return res.data;
  } catch (error) {
    throw error.response;
  }
};
