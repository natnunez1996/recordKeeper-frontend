import { CREATE_CUSTOMER, FETCH_ALL_CUSTOMER } from './../constants/index';

const customerReducer = (state = { customers: [] }, action) => {
    switch (action.type) {
        case FETCH_ALL_CUSTOMER:
            return { ...state, customers: action.payload.data }
        case CREATE_CUSTOMER:
            return { state, customers: [...state.customers, action.payload] }
        default:
            return state;
    }
}

export default customerReducer;