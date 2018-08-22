import { contains, map, mapObjIndexed } from 'ramda';

import {
    API_CALL_START,
} from '../constants/actionTypes';

import {
    GET_PLATS,
    GET_PLATS_QUICK,
    GET_PLAT_ID,
    GET_SUBDIVISION_PLATS,
    POST_PLAT,
    PUT_PLAT,
    GET_SUBDIVISION_ID,
    GET_PAGINATION,
    SEARCH_QUERY,
} from '../constants/apiConstants';

const initialState = {
    currentPlat: null,
    loadingPlat: true,
    next: null,
    count: 0,
    plats: [],
    prev: null,
} 

const platApiCalls = [GET_PLATS, GET_PLATS_QUICK, GET_PLAT_ID, GET_SUBDIVISION_PLATS, POST_PLAT, PUT_PLAT, GET_SUBDIVISION_ID];

const convertCurrency = (plats) => {
    let newPlatList = [];
    const platCurrencyFields = ['sewer_due', 'non_sewer_due', 'current_sewer_due', 'current_non_sewer_due'];

    if (!!plats && !plats.length) {
        newPlatList = plats;
        mapObjIndexed((value) => {
            const field_value = parseFloat(plats[value]);
            plats[value] = field_value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
        })(platCurrencyFields);
    } else {
        newPlatList = map((plat) => {

            mapObjIndexed((value) => {
                const field_value = parseFloat(plat[value]);
                plat[value] = field_value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
            })(platCurrencyFields);

            return plat;
        })(plats)
    }

    return newPlatList;
}

const platsReducer = (state = initialState, action) => {
    const {
        endpoint,
    } = action;
    switch (endpoint) {
    case API_CALL_START:
        if (contains(action.apiCall)(platApiCalls) || contains('/plat')(action.apiCall)) {
            return {
                ...state,
                loadingPlat: true,
            };
        }
        return state;
    case GET_PLAT_ID:
        return {
            ...state,
            currentPlat: action.response,
            loadingPlat: false,
            next: null,
            count: 1,
            plats: [],
            prev: null,
        };
    case GET_PLATS_QUICK:
        return {
            ...state,
            currentPlat: null,
            loadingPlat: false,
            next: null,
            count: 0,
            plats: action.response,
            prev: null,
        };
    case GET_PLATS:
    case GET_SUBDIVISION_PLATS:
        return {
            ...state,
            currentPlat: null,
            plats: convertCurrency(action.response),
            loadingPlat: false,
            next: action.response.next,
            count: action.response.count,
            prev: action.response.previous,
        }
    case PUT_PLAT:
        return action.response;
    case POST_PLAT:
        return {};
    case GET_PAGINATION:
    case SEARCH_QUERY:
        if (action.response.endpoint === '/plat') {
            return {
                ...state,
                currentPlat: null,
                plats: convertCurrency(action.response),
                loadingPlat: false,
                next: action.response.next,
                count: action.response.count,
                prev: action.response.previous,
            }
        }
        return state;
    case GET_SUBDIVISION_ID:
        return {};
    default:
        return state;
    }
};
export default platsReducer;
