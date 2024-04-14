import axios from './axios.js';

const config = {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
};

export const getActsRequest = () => axios.get('/Actividades', config);

export const getContActsRequest = () => axios.get('/DashboardAdmin', config);

export const getimgRequest = () => axios.get('/Actividades/images', config);

export const getActRequest = (id) => axios.get(`/Actividad/${id}`, config);

export const createActRequest = (act) => axios.post('/Actividades', act, config);

export const updateActRequest = (id, act) => axios.put(`/Actividad/${id}`, act, config);

export const deleteActRequest = (id) => axios.delete(`/Actividad/${id}`, config);
