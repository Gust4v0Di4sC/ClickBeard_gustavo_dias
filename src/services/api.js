// services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export const login = (email,password) => api.get(`http://localhost:3001/users?email=${email}&password=${password}`)
export const register = (name, email, password) => api.post('/users', { name, email, password });
export const getUser = () => api.get('/users'); 
export const getBarbers = () => api.get('/barbers');
export const getBarber = (id) =>api.get(`/barbers/${id}`);
export const editBarber = (id,barber) =>api.put(`/barbers/${id}`, barber);
export const addBarber = (barber) => api.post('/barbers', barber);
export const getSpecialties = () => api.get('/specialties');
export const deleteBarber = (id) => api.delete(`/barbers/${id}`);
export const getAppointments = () => api.get('/appointments');
export const addAppointment = (appointment) => api.post('/appointments', appointment);