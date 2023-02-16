import axios from "axios";

async function fetchWithAuth(token: string, input: string, options?: RequestInit){
    return axios(input, {
        method: options?.method,
        withCredentials: true,
        headers: {
            Authorization: `Bearer ??`
        }
    })
}

async function login( {email, password}: {email: string, password: string}) {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    return await response.json();
}

async function authCheck(token: string){
    const response = await fetchWithAuth(token, '/api/auth/check', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return await response.data;
}

export { login, authCheck };