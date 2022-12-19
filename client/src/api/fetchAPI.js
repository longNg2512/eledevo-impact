import * as constants from '../constants'

export function paginationUser(data) {
    return new Promise((resolve, reject) => {
        const url = `${constants.API_URL}/user/pagination?activePage=${data}&limit=${constants.LIMIT}`
        fetch(url, { method: 'GET' })
            .then(response => response.json())
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}

export function registerUser(data) {
    return new Promise((resolve, reject) => {
        const url = `${constants.API_URL}/user/register`
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}

export function searchPaginationUser(data) {
    return new Promise((resolve, reject) => {
        const url = `${constants.API_URL}/user/search-pagination?textSearch=${data.textSearch}&activePage=${data.activePage}&limit=${constants.LIMIT}`
        fetch(url, { method: 'GET' })
            .then(response => response.json())
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}

export function updateUser(data) {
    return new Promise((resolve, reject) => {
        const url = `${constants.API_URL}/user/update/${data.id}`
        fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}

export function deleteUser(data) {
    return new Promise((resolve, reject) => {
        const url = `${constants.API_URL}/user/delete/${data.id}`
        fetch(url, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}
