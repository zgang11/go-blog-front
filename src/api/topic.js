import axios from 'axios'

export const v1TopicCreate = (data) => axios.post('/api/v1/topic/create', data);

export const v1TopicAll = (params) => axios.get('/api/v1/topic/all', { params });

export const v1TopicDelete = (params) => axios.get('/api/v1/topic/delete', { params });
