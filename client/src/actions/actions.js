import * as constants from '../constants'

export function paginationUserRequest(payload) {
    return {
        type: constants.PAGINATION_USER_REQUEST,
        payload,
    }
}

export function paginationUserSuccess(payload) {
    return {
        type: constants.PAGINATION_USER_SUCCESS,
        payload,
    }
}

export function paginationUserFailure(payload) {
    return {
        type: constants.PAGINATION_USER_FAILURE,
        payload,
    }
}

export function registerUserRequest(payload) {
    return {
        type: constants.REGISTER_USER_REQUEST,
        payload,
    }
}

export function registerUserSuccess(payload) {
    return {
        type: constants.REGISTER_USER_SUCCESS,
        payload,
    }
}

export function registerUserFailure(payload) {
    return {
        type: constants.REGISTER_USER_FAILURE,
        payload,
    }
}

export function searchPaginationUserRequest(payload) {
    return {
        type: constants.SEARCH_PAGINATION_USER_REQUEST,
        payload,
    }
}

export function searchPaginationUserSuccess(payload) {
    return {
        type: constants.SEARCH_PAGINATION_USER_SUCCESS,
        payload,
    }
}

export function searchPaginationUserFailure(payload) {
    return {
        type: constants.SEARCH_PAGINATION_USER_FAILURE,
        payload,
    }
}

export function updateUserRequest(payload) {
    return {
        type: constants.UPDATE_USER_REQUEST,
        payload,
    }
}

export function updateUserSuccess(payload) {
    return {
        type: constants.UPDATE_USER_SUCCESS,
        payload,
    }
}

export function updateUserFailure(payload) {
    return {
        type: constants.UPDATE_USER_FAILURE,
        payload,
    }
}

export function deleteUserRequest(payload) {
    return {
        type: constants.DELETE_USER_REQUEST,
        payload,
    }
}

export function deleteUserSuccess(payload) {
    return {
        type: constants.DELETE_USER_SUCCESS,
        payload,
    }
}

export function deleteUserFailure(payload) {
    return {
        type: constants.DELETE_USER_FAILURE,
        payload,
    }
}
