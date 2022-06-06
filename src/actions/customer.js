import * as api from '../api'
import { CREATE_CUSTOMER, FETCH_ALL_CUSTOMER } from '../constants'

export const getCustomers = (id) => async (dispatch) => {
    try {
        const { data } = await api.fetchCustomers(id)

        dispatch({ type: FETCH_ALL_CUSTOMER, payload: data })
    } catch (error) {
        console.error(error)
    }
}

export const createCustomer = (newCustomer) => async (dispatch) => {
    try {
        const { data } = await api.createCustomer(newCustomer)

        dispatch({ type: CREATE_CUSTOMER, payload: data })

    } catch (error) {
        console.log(error)
    }
}