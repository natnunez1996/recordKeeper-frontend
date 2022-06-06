import axios from "axios";

const API = axios.create({ baseURL: 'http://localhost:8000' })

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }

    return req
})

export const fetchRecord = (id) => API.get(`/records/${id}`)
export const fetchRecords = (authorId) => API.get(`/records/${authorId}/myrecords`)
export const createRecord = (newRecord) => API.post('/records', newRecord)
export const updateRecord = (id, newRecord) => API.patch(`records/${id}`, newRecord)
export const deleteRecord = (id) => API.delete(`/records/${id}`)

export const signIn = (authData) => API.post('/user/signin', authData)
export const signUp = (authData) => API.post('/user/signup', authData)
export const updateAuth = (newAuthData) => API.patch('/user/update', newAuthData)
export const updatePassword = (newPassword) => API.patch('/user/updatePassword', newPassword)

export const fetchCustomers = (id) => API.get(`/customer/${id}`)
export const createCustomer = (newCustomer) => API.post('/customer', newCustomer)
