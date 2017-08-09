import {
    GET_PLATS,
    GET_PLAT_ID,
    GET_PLAT_QUERY,
    POST_PLAT,
    PUT_PLAT,
} from '../constants/apiConstants';


const platsReducer = (state = {}, action) => {
    const {
        endpoint,
    } = action;
    switch (endpoint) {
    case GET_PLAT_ID:
    case GET_PLATS:
    case GET_PLAT_QUERY:
    case PUT_PLAT:
        return action.response;
    case POST_PLAT:
        return {};
    default:
        return state;
    }
};
export default platsReducer;
