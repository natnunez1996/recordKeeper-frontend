
import { CLEAR_RECORD, CREATE_RECORD, DELETE_RECORD, FETCH_ALL_RECORDS, FETCH_RECORD, UPDATE_RECORD } from './../constants';

const recordsReducer = (state = { records: [], recordFormLists: null, isLoading: true }, action) => {
    switch (action.type) {
        case CREATE_RECORD:
            return { ...state, records: [...state.records, action.payload] }
        case FETCH_ALL_RECORDS:
            return {
                ...state, records: action.payload.data
            }
        case FETCH_RECORD:
            return { ...state, recordFormLists: action.payload }
        case DELETE_RECORD:
            return { ...state, records: state.records.filter(record => record._id !== action.payload._id) }
        case UPDATE_RECORD:
            return { ...state, recordFormLists: action.payload }
        case CLEAR_RECORD:
            return { ...state, recordFormLists: null }
        default:
            return state;
    }
}

export default recordsReducer