import axios from 'axios'

export const v1ArticleCreate = (data) => axios.post('/api/v1/article/create', data);

export const v1ArticleAll = (data) => axios.get('/api/v1/article/all', data);
