import axios from './axios.js';

const config = {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  };

export const getReservasRequest = () => axios.get('/Reservas', config)

export const getReservaRequest = (id) => axios.get(`/Reserva/${id}`, config)
