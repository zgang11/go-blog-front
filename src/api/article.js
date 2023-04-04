import axios from 'axios'

export const v1ArticleCreate = (data) => axios.post('/api/v1/article/create', data);

