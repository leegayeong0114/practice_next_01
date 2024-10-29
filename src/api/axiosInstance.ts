import axios, { AxiosInstance } from 'axios'

// http:54.180.239.248:8000/doc bbs or notice or free or gallery
export const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'http://54.180.239.248:8000/api/v1',
    headers: {
        // Authorization: `Bearer ${localStorage.getItem('token')}`
    }
})
