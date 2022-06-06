import * as API from '../api'
import { AUTH, INVALID_CREDENTIALS, INVALID_UPDATE_CREDENTIALS, LOGOUT, UPDATE_AUTH, UPDATE_PASSWORD } from '../constants'

export const signIn = (authData, navigate) => async (dispatch) => {
    try {
        const { data } = await API.signIn(authData)

        dispatch({ type: AUTH, payload: data })

        navigate(`/${data.result._id}/myrecords`, { replace: true })

    } catch (error) {
        const { message } = error.response.data

        dispatch({ type: INVALID_CREDENTIALS, payload: message })
    }
}
export const signUp = (authData, navigate) => async (dispatch) => {
    try {
        const { data } = await API.signUp(authData)

        dispatch({ type: AUTH, payload: data })

        navigate(`/${data.result._id}/myrecords`, { replace: true })
    } catch (error) {
        const { message } = error.response.data

        dispatch({ type: INVALID_CREDENTIALS, payload: message })
    }
}

export const logOut = (navigate) => async (dispatch) => {
    try {
        dispatch({ type: LOGOUT })
        navigate('/', { replace: true })
    } catch (error) {
        console.log(error)
    }
}

export const updateAuth = (newAuthData, navigate) => async (dispatch) => {
    try {
        const { data } = await API.updateAuth(newAuthData)

        dispatch({ type: UPDATE_AUTH, payload: data })

        navigate('/user', { replace: true })
    } catch (error) {
        const { messageUpdate } = error.response.data
        dispatch({ type: INVALID_UPDATE_CREDENTIALS, payload: messageUpdate })
    }
}

export const updatePassword = (newPassword, navigate) => async (dispatch) => {
    try {
        const { data } = await API.updatePassword(newPassword)

        dispatch({ type: UPDATE_PASSWORD, payload: data })

        navigate('/user', { replace: true })

    } catch (error) {
        const { messageUpdate } = error.response.data

        dispatch({ type: INVALID_UPDATE_CREDENTIALS, payload: messageUpdate })
    }
}