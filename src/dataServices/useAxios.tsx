import { useEffect, useState, useRef } from 'react'
import Axios, { AxiosInstance } from 'axios'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

export function AuthAxios(
    authTokens: any,
    url: string,
    method: any,
    payload: any,
    headers?:any,
    timeout: number = 10 * 1000
) {
    const axios = Axios.create({
        baseURL: import.meta.env.VITE_BACKEND_URL,
        url: url,
        responseType: 'json' as const,
        headers: {
            'Content-Type': headers ||'application/json',
            ...(authTokens && {
                Authorization: `Bearer ${authTokens.access}`,
            }),
        },
        timeout,
    })
    return axios.request({
        data: payload,
        method,
        url,
    })
}

export const useAuthAxios = (url: string, method: any, payload: any) => {
    const [data, setData] = useState<any>()
    const [error, setError] = useState('')
    const [loaded, setLoaded] = useState(false)

    let { authTokens }: any = useContext(AuthContext)
    const axios = Axios.create({
        baseURL: import.meta.env.VITE_BACKEND_URL,
        url: url,
        responseType: 'json' as const,
        headers: {
            'Content-Type': 'application/json',
            ...(authTokens && {
                Authorization: `Bearer ${authTokens.access}`,
            }),
        },
        timeout: 10 * 1000,
    })

    useEffect(() => {
        ;(async () => {
            try {
                const response = await axios.request({
                    data: payload,
                    method,
                    url,
                })

                setData(response.data)
            } catch (error: any) {
                setError(error.message)
            } finally {
                setLoaded(true)
            }
        })()
    }, [url])

    return [loaded, data, error]
}

export const useAxios = (url: string, method: any, payload: any) => {
    const [data, setData] = useState<any>()
    const [error, setError] = useState('')
    const [status, setStatus] = useState(0)
    const [loaded, setLoaded] = useState(false)
    const controllerRef = useRef(new AbortController())
    const cancel = () => {
        controllerRef.current.abort()
    }

    let { authTokens }: any = useContext(AuthContext)
    const axios = Axios.create({
        baseURL: import.meta.env.VITE_BACKEND_URL,
        url: url,
        responseType: 'json' as const,
        headers: {
            'Content-Type': 'application/json',
            ...(authTokens && {
                Authorization: `Bearer ${authTokens.access}`,
            }),
        },
        timeout: 10 * 1000,
    })

    useEffect(() => {
        ;(async () => {
            try {
                const response = await axios.request({
                    data: payload,
                    signal: controllerRef.current.signal,
                    method,
                    url,
                })

                setStatus(response.status)
                setData(response.data)
            } catch (error: any) {
                setStatus(error.response.status)
                setError(error.message)
            } finally {
                setLoaded(true)
            }
        })()
    }, [])

    const putData = async (
        newData: any,
        url: string,
        options: any = {}
    ): Promise<any> => {
        let resp = await axios.put(url, newData, options)
        return resp
    }

    const refetch = async (url: string, options: any = {}): Promise<any> => {
        let resp = await axios.get(url, options)
        return resp
    }

    return { cancel, data, error, loaded, putData, status, refetch }
}
