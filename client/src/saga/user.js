import { takeEvery, put, select } from 'redux-saga/effects'
import * as constants from '../constants'
import * as API from '../api/fetchAPI'
import * as actions from '../actions/actions'

function* paginationUserSaga(data) {
    try {
        const response = yield API.paginationUser(data.payload)

        if (response.success) {
            yield put(
                actions.paginationUserSuccess({
                    listUser: response.response,
                    activePage: response.activePage,
                    totalPage: response.totalPage,
                    skip: response.skip,
                    message: response.message,
                }),
            )
        } else {
            throw new Error(response.message)
        }
    } catch (error) {
        yield put(actions.paginationUserFailure({ message: error }))
    }
}

function* registerUserSaga(data) {
    const reduxStore = yield select(state => state.userReducer)

    try {
        const response = yield API.registerUser(data.payload)
        console.log('saga: ', response)

        if (response.success) {
            yield put(
                actions.registerUserSuccess({
                    message: response.message,
                    createSuccess: true,
                }),
            )
        } else {
            throw new Error(response.message)
        }

        if (reduxStore.textSearch) {
            if (data.payload.username.includes(reduxStore.textSearch)) {
                const responseSearch = yield API.searchPaginationUser({
                    textSearch: reduxStore.textSearch,
                    activePage: 1,
                })
                yield put(
                    actions.searchPaginationUserRequest({
                        textSearch: responseSearch.textSearch,
                        activePage: responseSearch.totalPage,
                    }),
                )
            } else {
                yield put(
                    actions.paginationUserSuccess({
                        listUser: [response.response],
                        activePage: 1,
                        totalPage: 1,
                        skip: 0
                    }),
                )
            }
        } else {
            const responseGet = yield API.paginationUser(1)
            yield put(actions.paginationUserRequest(responseGet.totalPage))
        }
    } catch (error) {
        yield put(actions.registerUserFailure({ message: error.message }))
    }
}

function* searchPaginationUserSaga(data) {
    try {
        const response = yield API.searchPaginationUser(data.payload)

        if (response.success) {
            yield put(
                actions.searchPaginationUserSuccess({
                    listUser: response.response,
                    activePage: response.activePage,
                    totalPage: response.totalPage,
                    skip: response.skip,
                    message: response.message,
                    textSearch: response.textSearch,
                }),
            )
        } else {
            throw new Error(response.message)
        }
    } catch (error) {
        yield put(actions.searchPaginationUserFailure({ message: error }))
    }
}

function* updateUserSaga(data) {
    const reduxStore = yield select(state => state.userReducer)
    try {
        const response = yield API.updateUser(data.payload)

        if (response.success) {
            yield put(actions.updateUserSuccess({ message: response.message }))
        } else {
            throw new Error(response.message)
        }

        if (reduxStore.textSearch) {
            yield put(
                actions.searchPaginationUserRequest({
                    textSearch: reduxStore.textSearch,
                    activePage: reduxStore.activePage,
                }),
            )
        } else {
            yield put(actions.paginationUserRequest(reduxStore.activePage))
        }
    } catch (error) {
        yield put(actions.updateUserFailure({ message: error }))
    }
}

function* deleteUserSaga(data) {
    const reduxStore = yield select(state => state.userReducer)

    try {
        const response = yield API.deleteUser(data.payload)

        if (response.success) {
            yield put(actions.deleteUserSuccess({ message: response.message }))
        } else {
            throw new Error(response.message)
        }

        if (reduxStore.textSearch) {
            const responseSearch = yield API.searchPaginationUser({
                textSearch: reduxStore.textSearch,
                activePage: 1,
            })

            if (
                reduxStore.activePage < responseSearch.totalPage &&
                responseSearch.totalPage
            ) {
                yield put(
                    actions.searchPaginationUserRequest({
                        textSearch: reduxStore.textSearch,
                        activePage: reduxStore.activePage,
                    }),
                )
            } else if (!responseSearch.totalPage) {
                yield put(
                    actions.searchPaginationUserRequest({
                        textSearch: reduxStore.textSearch,
                        activePage: 1,
                    }),
                )
            } else if (
                reduxStore.activePage >= responseSearch.totalPage &&
                responseSearch.totalPage
            ) {
                yield put(
                    actions.searchPaginationUserRequest({
                        textSearch: reduxStore.textSearch,
                        activePage: responseSearch.totalPage,
                    }),
                )
            } else {
                yield put(
                    actions.searchPaginationUserRequest({
                        textSearch: reduxStore.textSearch,
                        activePage: reduxStore.activePage,
                    }),
                )
            }
        } else {
            const responseGet = yield API.paginationUser(1)
            if (
                reduxStore.activePage <= responseGet.totalPage &&
                responseGet.totalPage
            ) {
                yield put(actions.paginationUserRequest(reduxStore.activePage))
            } else if (!responseGet.totalPage) {
                yield put(actions.paginationUserRequest(1))
            } else {
                yield put(actions.paginationUserRequest(responseGet.totalPage))
            }
        }
    } catch (error) {
        yield put(actions.deleteUserFailure({ message: error }))
    }
}

const userSaga = [
    takeEvery(constants.PAGINATION_USER_REQUEST, paginationUserSaga),
    takeEvery(constants.REGISTER_USER_REQUEST, registerUserSaga),
    takeEvery(
        constants.SEARCH_PAGINATION_USER_REQUEST,
        searchPaginationUserSaga,
    ),
    takeEvery(constants.UPDATE_USER_REQUEST, updateUserSaga),
    takeEvery(constants.DELETE_USER_REQUEST, deleteUserSaga),
]

export default userSaga
