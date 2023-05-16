import axios from 'axios'

export const v1ArticleCreate = (data) => axios.post('/api/v1/article/create', data);

export const v1ArticleAll = (data) => axios.get('/api/v1/article/all', data);

export const v1ArticleDetail = (data) => axios.get( `/api/v1/article/detail`, { params: data });

export const v1ArticleUpdate = (data) => axios.post('/api/v1/article/update', data);

export const v1ArticleDelete = (data) => axios.delete( `/api/v1/article/delete`, { params: data });
