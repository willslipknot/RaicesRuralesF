import axios from './axios.js';

const config = {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  };

export const getVehiculosRequest = () => axios.get('/Vehiculos', config)

export const getVehiculoRequest = (id) => axios.get(`/Vehiculo/${id}`, config)

export const createVehiculoRequest = (vehiculo) => axios.post('/Vehiculos', vehiculo, config)

export const updateVehiculoRequest = (id, vehiculo) => axios.put(`/Vehiculo/${id}`, vehiculo, config)

export const deleteVehiculoRequest = (id) => axios.delete(`/Vehiculo/${id}`, config)

export const getVehRequest = (clase) => axios.get(`/Vehiculos/${clase}`, config)
