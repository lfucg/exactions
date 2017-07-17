import {
  API_CALL,
} from '../constants/actionTypes';

import {
    ME,

    LOGIN,
    REGISTER,
    PASSWORD,
    SEND_USERNAME,
    LOGOUT,

    GET_SUBDIVISIONS,
    GET_SUBDIVISION_ID,
    POST_SUBDIVISION,
    PUT_SUBDIVISION,

    GET_PLATS,
    GET_PLAT_ID,
    POST_PLAT,
    PUT_PLAT,

    GET_PLAT_ZONES,
    GET_PLAT_ZONE_ID,
    POST_PLAT_ZONE,
    PUT_PLAT_ZONE,
    PUT_PLAT_ZONE_DUES,

    GET_LOTS,
    GET_LOT_ID,
    POST_LOT,
    PUT_LOT,
} from '../constants/apiConstants';

export function getMe() {
    return {
        type: API_CALL,
        endpoint: ME,
        url: '/me',
    };
}

// LOGIN RELATED
export function login() {
    return {
        type: API_CALL,
        endpoint: LOGIN,
        url: '/login/',
        method: 'POST',
        body: (getState) => {
            const {
                activeForm,
            } = getState();
            const {
                username,
                password,
            } = activeForm;
            return {
                username,
                password,
            };
        },
    };
}

export function register() {
    return {
        type: API_CALL,
        endpoint: REGISTER,
        url: '/register/',
        method: 'POST',
        body: (getState) => {
            const {
                activeForm,
            } = getState();
            const {
                username_1,
                password_1,
                // password_2,
                first_name,
                last_name,
                email,
            } = activeForm;
            return {
                username: username_1,
                password_1,
                // password_2,
                first_name,
                last_name,
                email,
            };
        },
    };
}

export function passwordReset() {
    return {
        type: API_CALL,
        endpoint: PASSWORD,
        url: '/forgot-password/',
        method: 'POST',
        body: (getState) => {
            const {
                activeForm,
            } = getState();
            const {
                email_2,
            } = activeForm;
            return {
                email: email_2,
            };
        },
    };
}

export function sendUsername() {
    return {
        type: API_CALL,
        endpoint: SEND_USERNAME,
        url: '/forgot-username/',
        method: 'POST',
        body: (getState) => {
            const {
                activeForm,
            } = getState();
            const {
                email_3,
            } = activeForm;
            return {
                email: email_3,
            };
        },
    };
}

export function logout() {
    return {
        type: API_CALL,
        endpoint: LOGOUT,
        url: '/delete_token/',
        method: 'POST',
    };
}

// SUBDIVISIONS
export function getSubdivisions() {
    return {
        type: API_CALL,
        endpoint: GET_SUBDIVISIONS,
        url: '/subdivision/',
    };
}

export function getSubdivisionID(selectedSubdivision) {
    return {
        type: API_CALL,
        endpoint: GET_SUBDIVISION_ID,
        url: `/subdivision/${selectedSubdivision}`,
    };
}

export function postSubdivision() {
    return {
        type: API_CALL,
        endpoint: POST_SUBDIVISION,
        url: '/subdivision/',
        method: 'POST',
        body: (getState) => {
            const {
                activeForm,
                currentUser,
            } = getState();
            const {
                name,
                gross_acreage,
                number_allowed_lots,
            } = activeForm;
            const {
                id,
            } = currentUser;
            return {
                created_by: id,
                modified_by: id,
                name,
                gross_acreage,
                number_allowed_lots,
            };
        },
    };
}

export function putSubdivision(selectedSubdivision) {
    return {
        type: API_CALL,
        endpoint: PUT_SUBDIVISION,
        url: `/subdivision/${selectedSubdivision}/`,
        method: 'PUT',
        body: (getState) => {
            const {
                activeForm,
                currentUser,
            } = getState();
            const {
                name,
                gross_acreage,
                number_allowed_lots,
            } = activeForm;
            const {
                id,
            } = currentUser;
            return {
                created_by: id,
                modified_by: id,
                name,
                gross_acreage,
                number_allowed_lots,
            };
        },
    };
}

// PLATS
export function getPlats() {
    return {
        type: API_CALL,
        endpoint: GET_PLATS,
        url: '/plat/',
    };
}

export function getPlatID(selectedPlat) {
    return {
        type: API_CALL,
        endpoint: GET_PLAT_ID,
        url: `/plat/${selectedPlat}`,
    };
}

export function postPlat() {
    return {
        type: API_CALL,
        endpoint: POST_PLAT,
        url: '/plat/',
        method: 'POST',
        body: (getState) => {
            const {
                activeForm,
                currentUser,
            } = getState();
            const {
                subdivision,
                name,
                date_recorded,
                total_acreage,
                latitude,
                longitude,
                plat_type,
                expansion_area,
                unit,
                section,
                block,
                buildable_lots,
                non_buildable_lots,
                cabinet,
                slide,
                calculation_note,
                sewer_due,
                non_sewer_due,
            } = activeForm;
            const {
                id,
            } = currentUser;
            return {
                created_by: id,
                modified_by: id,
                name,
                subdivision,
                date_recorded,
                total_acreage,
                latitude,
                longitude,
                plat_type,
                expansion_area,
                unit,
                section,
                block,
                buildable_lots,
                non_buildable_lots,
                cabinet,
                slide,
                calculation_note,
                sewer_due,
                non_sewer_due,
            };
        },
    };
}

export function putPlat(selectedPlat) {
    return {
        type: API_CALL,
        endpoint: PUT_PLAT,
        url: `/plat/${selectedPlat}/`,
        method: 'PUT',
        body: (getState) => {
            const {
                activeForm,
                currentUser,
            } = getState();
            const {
                subdivision,
                name,
                date_recorded,
                total_acreage,
                latitude,
                longitude,
                plat_type,
                expansion_area,
                unit,
                section,
                block,
                buildable_lots,
                non_buildable_lots,
                cabinet,
                slide,
                calculation_note,
                sewer_due,
                non_sewer_due,
            } = activeForm;
            const {
                id,
            } = currentUser;
            return {
                created_by: id,
                modified_by: id,
                name,
                subdivision,
                date_recorded,
                total_acreage,
                latitude,
                longitude,
                plat_type,
                expansion_area,
                unit,
                section,
                block,
                buildable_lots,
                non_buildable_lots,
                cabinet,
                slide,
                calculation_note,
                sewer_due,
                non_sewer_due,
            };
        },
    };
}

// PLAT_ZONES
export function postPlatZone() {
    return {
        type: API_CALL,
        endpoint: POST_PLAT_ZONE,
        url: '/platZone/',
        method: 'POST',
        body: (getState) => {
            const {
                activeForm,
                currentUser,
            } = getState();
            const {
                plat,
                zone,
                acres,
            } = activeForm;
            const {
                id,
            } = currentUser;
            return {
                created_by: id,
                modified_by: id,
                plat,
                zone,
                acres,
            };
        },
    };
}

export function putPlatZone(selectedPlatZone, zone, acres) {
    return {
        type: API_CALL,
        endpoint: PUT_PLAT_ZONE,
        url: `/platZone/${selectedPlatZone}/`,
        method: 'PUT',
        body: (getState) => {
            const {
                activeForm,
                currentUser,
            } = getState();
            const {
                plat,
            } = activeForm;
            const {
                id,
            } = currentUser;
            return {
                created_by: id,
                modified_by: id,
                plat,
                zone,
                acres,
            };
        },
    };
}

export function putPlatZoneDues(
    selectedPlatZone,
    zone,
    acres,
    dues_roads,
    dues_open_spaces,
    dues_sewer_cap,
    dues_sewer_trans,
    dues_parks,
    dues_storm_water,
) {
    return {
        type: API_CALL,
        endpoint: PUT_PLAT_ZONE_DUES,
        url: `/platZone/${selectedPlatZone}/`,
        method: 'PUT',
        body: (getState) => {
            const {
                activeForm,
                currentUser,
            } = getState();
            const {
                plat,
            } = activeForm;
            const {
                id,
            } = currentUser;
            return {
                created_by: id,
                modified_by: id,
                plat,
                zone,
                acres,
                dues_roads,
                dues_open_spaces,
                dues_sewer_cap,
                dues_sewer_trans,
                dues_parks,
                dues_storm_water,
            };
        },
    };
}

// LOTS
export function getLots() {
    return {
        type: API_CALL,
        endpoint: GET_LOTS,
        url: '/lot/',
    };
}

export function getLotID(selectedLot) {
    return {
        type: API_CALL,
        endpoint: GET_LOT_ID,
        url: `/lot/${selectedLot}`,
    };
}

export function postLot() {
    return {
        type: API_CALL,
        endpoint: POST_LOT,
        url: '/lot/',
        method: 'POST',
        body: (getState) => {
            const {
                activeForm,
                currentUser,
            } = getState();
            const {
                plat,
                parcel_id,
                lot_number,
                permit_id,
                latitude,
                longitude,
                address_number,
                address_direction,
                address_street,
                address_suffix,
                address_unit,
                address_city,
                address_state,
                address_zip,
                dues_roads_dev,
                dues_roads_own,
                dues_sewer_trans_dev,
                dues_sewer_trans_own,
                dues_sewer_cap_dev,
                dues_sewer_cap_own,
                dues_parks_dev,
                dues_parks_own,
                dues_storm_dev,
                dues_storm_own,
                dues_open_space_dev,
                dues_open_space_own,
                // payment,
            } = activeForm;
            const {
                id,
            } = currentUser;
            return {
                created_by: id,
                modified_by: id,
                plat,
                parcel_id,
                lot_number,
                permit_id,
                latitude,
                longitude,
                address_number,
                address_direction,
                address_street,
                address_suffix,
                address_unit,
                address_city,
                address_state,
                address_zip,
                address_full: `${address_number} ${address_direction ? address_direction : null} ${address_street} ${address_suffix ? address_suffix : null} ${address_unit ? address_unit : null}, ${address_city}, ${address_state} ${address_zip}`,
                dues_roads_dev,
                dues_roads_own,
                dues_sewer_trans_dev,
                dues_sewer_trans_own,
                dues_sewer_cap_dev,
                dues_sewer_cap_own,
                dues_parks_dev,
                dues_parks_own,
                dues_storm_dev,
                dues_storm_own,
                dues_open_space_dev,
                dues_open_space_own,
                // payment,
            };
        },
    };
}

export function putLot(selectedLot) {
    return {
        type: API_CALL,
        endpoint: PUT_LOT,
        url: `/lot/${selectedLot}/`,
        method: 'PUT',
        body: (getState) => {
            const {
                activeForm,
                currentUser,
            } = getState();
            const {
                plat,
                parcel_id,
                lot_number,
                permit_id,
                latitude,
                longitude,
                address_number,
                address_direction,
                address_street,
                address_suffix,
                address_unit,
                address_city,
                address_state,
                address_zip,
                dues_roads_dev,
                dues_roads_own,
                dues_sewer_trans_dev,
                dues_sewer_trans_own,
                dues_sewer_cap_dev,
                dues_sewer_cap_own,
                dues_parks_dev,
                dues_parks_own,
                dues_storm_dev,
                dues_storm_own,
                dues_open_space_dev,
                dues_open_space_own,
                // payment,
            } = activeForm;
            const {
                id,
            } = currentUser;
            return {
                created_by: id,
                modified_by: id,
                plat,
                parcel_id,
                lot_number,
                permit_id,
                latitude,
                longitude,
                address_number,
                address_direction,
                address_street,
                address_suffix,
                address_unit,
                address_city,
                address_state,
                address_zip,
                address_full: `${address_number} ${address_direction ? address_direction : null} ${address_street} ${address_suffix ? address_suffix : null} ${address_unit ? address_unit : null}, ${address_city}, ${address_state} ${address_zip}`,
                dues_roads_dev,
                dues_roads_own,
                dues_sewer_trans_dev,
                dues_sewer_trans_own,
                dues_sewer_cap_dev,
                dues_sewer_cap_own,
                dues_parks_dev,
                dues_parks_own,
                dues_storm_dev,
                dues_storm_own,
                dues_open_space_dev,
                dues_open_space_own,
                // payment,
            };
        },
    };
}