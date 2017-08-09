import {
    GET_PROJECTS,
    GET_PROJECT_ID,
    GET_PROJECT_QUERY,
    GET_AGREEMENT_PROJECTS,
    POST_PROJECT,
    PUT_PROJECT,
} from '../constants/apiConstants';


const projectsReducer = (state = {}, action) => {
    const {
        endpoint,
    } = action;
    switch (endpoint) {
    case GET_PROJECT_ID:
    case GET_PROJECTS:
    case GET_PROJECT_QUERY:
    case GET_AGREEMENT_PROJECTS:
        return action.response;
    case POST_PROJECT:
    case PUT_PROJECT:
        return {};
    default:
        return state;
    }
};
export default projectsReducer;