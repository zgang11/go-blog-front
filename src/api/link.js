import axios from 'axios'

export const v1LinkCreate = (data) => axios.post('/api/v1/link/create', data);

export const v1LinkAll = (data) => axios.get('/api/v1/link/all', data);

