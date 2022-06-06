import { CREATE_RECORD, DELETE_RECORD, FETCH_ALL_RECORDS, FETCH_RECORD, UPDATE_RECORD } from "../constants"
import * as api from '../api'

export const createRecord = (record, authorId, navigate) => async (dispatch) => {
    try {

        const { data } = await api.createRecord(record)

        dispatch({ type: CREATE_RECORD, payload: data })

        navigate(`/${authorId}/myrecords`, { replace: true })
    } catch (error) {
        console.log(error)
    }
}

export const getRecord = (id) => async (dispatch) => {
    try {
        const { data } = await api.fetchRecord(id)

        dispatch({ type: FETCH_RECORD, payload: data })

    } catch (error) {
        console.log(error)
    }
}

export const getRecords = (authorId) => async (dispatch) => {
    try {
        const { data } = await api.fetchRecords(authorId)

        dispatch({ type: FETCH_ALL_RECORDS, payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const updateRecord = (id, newRecord, authorId, navigate) => async (dispatch) => {
    try {
        const { data } = await api.updateRecord(id, newRecord)

        dispatch({ type: UPDATE_RECORD, payload: data })
        navigate(`/${authorId}/myrecords`, { replace: true })
    } catch (error) {
        console.log(error)
    }
}

export const deleteRecord = (id) => async (dispatch) => {
    try {
        const { data } = await api.deleteRecord(id)

        dispatch({ type: DELETE_RECORD, payload: data })
    } catch (error) {
        console.log(error)
    }
}