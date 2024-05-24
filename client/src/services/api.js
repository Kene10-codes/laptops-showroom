import { SERVER_BASE_URL } from '../constants/constants'

export const fetchProducts = async (url, methodType) => {
    try {
        const requestOptions = {
            method: methodType,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        }

        // POST USER DATA
        const response = await fetch(
            `${SERVER_BASE_URL}/${url}`,
            requestOptions
        )
        if (!response) {
            throw new Error('Network issue')
        }
        const result = await response.json()
        return result
    } catch (e) {
        // console.log(e)
    }
}

// POST USER API FUNC
export const postUser = async (url, methodType, body) => {
    try {
        const requestOptions = {
            method: methodType,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        }

        // POST USER DATA
        const response = await fetch(
            `${SERVER_BASE_URL}/${url}`,
            requestOptions
        )
        if (!response) {
            throw new Error('Network issue')
        }
        const result = await response.json()
        return result
    } catch (e) {
        // console.log(e)
    }
}
