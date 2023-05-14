import axios from 'axios'

export const v1TagAll = (data) => axios.get('/api/v1/tag/all', data);

export const v1TagDelete = (params) => axios.delete('/api/v1/tag/delete', {params});

export const v1TagCreate = (data) => axios.post('/api/v1/tag/create', data);

