import {
    GET_LOTS,
    GET_LOT_ID,
    SEARCH_QUERY,
    GET_SUBDIVISION_LOTS,
    GET_PLAT_LOTS,
    POST_LOT,
    PUT_LOT,
    GET_PAGINATION,
    PUT_PERMIT_ID_ON_LOT,
} from '../constants/apiConstants';


const lotsReducer = (state = [], action) => {
    const {
        endpoint,
    } = action;
    switch (endpoint) {
    case GET_LOT_ID:
        return [...state];
    case GET_LOTS:
    case GET_SUBDIVISION_LOTS:
    case GET_PLAT_LOTS:
    case POST_LOT:
    case PUT_LOT:
    case PUT_PERMIT_ID_ON_LOT:
        return action.response;
    case SEARCH_QUERY:
    case GET_PAGINATION:
        if (action.response.endpoint === '/lot') {
            return action.response;
        }
        return state;
    default:
        return state;
    }
};
export default lotsReducer;
