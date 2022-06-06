import { AUTH, CLEAR_MESSAGE, INVALID_CREDENTIALS, INVALID_UPDATE_CREDENTIALS, LOGOUT, UPDATE_AUTH, UPDATE_PASSWORD } from "../constants";


const authReducer = (state = { authData: null, message: null, messageUpdate: null }, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.payload }))
            return { ...state, authData: action?.payload }
        case LOGOUT:
            localStorage.clear()
            return { ...state, authData: null }
        case INVALID_CREDENTIALS:
            return { ...state, message: action.payload }
        case CLEAR_MESSAGE:
            return { ...state, message: null, messageUpdate: null }
        case UPDATE_AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.payload }))
            return { ...state, authData: { result: action?.payload.result, token: action?.payload.token }, messageUpdate: action?.payload.messageUpdate }
        case UPDATE_PASSWORD:
            localStorage.setItem('profile', JSON.stringify({ ...action?.payload }))
            return { ...state, authData: { result: action?.payload.result, token: action?.payload.token }, messageUpdate: action?.payload.messageUpdate }
        case INVALID_UPDATE_CREDENTIALS:
            return { ...state, messageUpdate: action.payload }
        default:
            return state;
    }
}

export default authReducer;