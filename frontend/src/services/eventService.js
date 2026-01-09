import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getEvents() {
  return axios.get(`${API_BASE_URL}/api/events`);
}

export async function getEvent(id) {
  return axios.get(`${API_BASE_URL}/api/events/${id}`);
}

export async function createEvent(data) {
  return axios.post(`${API_BASE_URL}/api/events`, data);
}

export async function updateEvent(id, data) {
  return axios.put(`${API_BASE_URL}/api/events/${id}`, data);
}

export async function deleteEvent(id) {
  return axios.delete(`${API_BASE_URL}/api/events/${id}`);
}
