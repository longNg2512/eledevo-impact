import * as constants from '../constants'

const DEFAULT_STATE = {
    isLoading: false,
    userFetched: false,
    error: false,
    message: '',
    totalPage: 0,
    activePage: 0,
    skip: 0,
    textSearch: '',
    listUser: [],
}

const userReducer = (state = DEFAULT_STATE, data) => {
    switch (data.type) {
        case constants.PAGINATION_USER_REQUEST:
        case constants.SEARCH_PAGINATION_USER_REQUEST:
        case constants.REGISTER_USER_REQUEST:
        case constants.UPDATE_USER_REQUEST:
        case constants.DELETE_USER_REQUEST:
            return {
                ...state,
                isLoading: true,
                userFetched: false,
                error: false,
            }
        case constants.PAGINATION_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: false,
                message: data.payload.message,
                totalPage: data.payload.totalPage,
                activePage: data.payload.activePage,
                skip: data.payload.skip,
                listUser: data.payload.listUser,
                userFetched: true,
            }
        case constants.SEARCH_PAGINATION_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: false,
                message: data.payload.message,
                totalPage: data.payload.totalPage,
                activePage: data.payload.activePage,
                skip: data.payload.skip,
                listUser: data.payload.listUser,
                textSearch: data.payload.textSearch,
                userFetched: true,
            }

        case constants.REGISTER_USER_SUCCESS:
        case constants.UPDATE_USER_SUCCESS:
        case constants.DELETE_USER_SUCCESS:
            return {
                ...state,
                // isLoading: false,
                userFetched: false,
                error: false,
                message: data.payload.message,
            }
        case constants.PAGINATION_USER_FAILURE:
        case constants.SEARCH_PAGINATION_USER_FAILURE:
        case constants.REGISTER_USER_FAILURE:
        case constants.UPDATE_USER_FAILURE:
        case constants.DELETE_USER_FAILURE:
            return {
                ...state,
                isLoading: false,
                userFetched: false,
                error: true,
                message: data.payload.message,
                createSuccess: false,
            }
        default:
            return state
    }
}

export default userReducer
