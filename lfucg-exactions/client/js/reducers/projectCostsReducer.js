import {
    GET_PROJECT_COSTS,
    GET_PROJECT_COST_ID,
    POST_PROJECT_COST,
    PUT_PROJECT_COST,
    GET_PAGINATION,
    SEARCH_QUERY,
    GET_PROJECT_PROJECT_COSTS,
} from '../constants/apiConstants';


const projectCostsReducer = (state = [], action) => {
    const {
        endpoint,
    } = action;
    switch (endpoint) {
    case GET_PROJECT_COST_ID:
    case GET_PROJECT_COSTS:
    case GET_PROJECT_PROJECT_COSTS:
        return action.response;
    case POST_PROJECT_COST:
    case PUT_PROJECT_COST:
        return {};
    case GET_PAGINATION:
    case SEARCH_QUERY:
        const next = action.response.next;
        const prev = action.response.prev;
        if ((next != null && next.substr(0, next.length) === '/estimate') ||
            (prev != null && next.substr(0, prev.length) === '/estimate') ||
            (window.location.hash === '#/project-cost')) {
            return action.response;
        }
        return state;
    default:
        return state;
    }
};
export default projectCostsReducer;
