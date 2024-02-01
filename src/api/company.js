import axios from 'axios'

export const v1CompanyAll = (data) => axios.get('/api/v1/company/all', data);

