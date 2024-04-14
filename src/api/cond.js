import axios from './axios.js';

const config = {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  };

export const getCondsRequest = () => axios.get('/Conductores', config)

export const getContCondsRequest = () => axios.get('/DashboardAdmin', config)

export const getCondRequest = (id) => axios.get(`/Conductor/${id}`)

export const createCondRequest = (cond) => axios.post('/Conductores', cond, config)

export const updateCondRequest = (id, cond) => axios.put(`/Conductor/${id}`, cond, config)

export const deleteCondRequest = (id) => axios.delete(`/Conductor/${id}`, config)

export const getimgRequest = () => axios.get('/Conductores/images', config)