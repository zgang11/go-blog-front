import axios from 'axios'

export const v1UserLogin = (data) => axios.post('/api/v1/user/login', data);

