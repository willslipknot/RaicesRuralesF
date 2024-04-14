
import axios from 'axios';

export const registerRequest = async (user) => {
  try {
    const res = await axios.post('/register', user);
    return res.data;
  } catch (error) {
    throw error.response;
  }
};

export const loginRequest = async (user) => {
  try {
    const res = await axios.post('/login', user);
    return res.data;
  } catch (error) {
    throw error.response;
  }
};

export const verifyTokenRequest = async (token) => {
  try {
    const res = await axios.get('/verifyToken', {
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
