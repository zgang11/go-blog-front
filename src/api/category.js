import axios from 'axios'

export const v1CategoryAll = (data) => axios.get('/api/v1/category/all', data);

