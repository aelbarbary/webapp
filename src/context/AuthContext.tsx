import { createContext, useState, useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import { BASE_URL, API_ENDPOINTS } from '../dataServices/api'
import { MatcherProfile } from '../interfaces/MarriageInterfaces'

export interface User {
    first_name: String
    last_name: String
    email: String
    status: String
    groups: Array<String>
    is_superuser: Boolean
}

export interface AuthContextInterface {
    user: User
}

const AuthContext = createContext({})

export default AuthContext

export const AuthProvider = ({ children }: any) => {
    const [authTokens, setAuthTokens] = useState(() => (localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')!) : null))
    const [user, setUser] = useState(() => (localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')!) : null))
    const [loading, setLoading] = useState(true)
    const [matcherProfile, setMatcherProfile] = useState<MatcherProfile>()

    const navigate = useNavigate()

    const loginUser = async (email: string, password: string) => {
        const response = await fetch(`${API_ENDPOINTS.tokenObtainPair}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })
        const data = await response.json()
        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        }
        return { response, data }
    }

    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')

        if (matcherProfile && matcherProfile.username) {
            navigate(`/${matcherProfile.username}/`)
        } else {
            console.error('Invalid matcherProfile or missing username')
        }
    }

    const deleteUser = async () => {
        const response = await fetch(`${API_ENDPOINTS.deleteUser}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                ...(authTokens && {
                    Authorization: `Bearer ${authTokens.access}`,
                }),
            },
        })
        const data = await response.json()

        return { response, data }
    }

    let updateToken = async () => {
        let response = await fetch(`${API_ENDPOINTS.tokenRefresh}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh: authTokens?.refresh }),
        })

        let data = await response.json()

        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        } else {
            logoutUser()
        }

        if (loading) {
            setLoading(false)
        }
    }

    const getMatcherProfile = async (matcherUsername: string) => {
        const defaultProfile = {
            name: 'not_found',
        }

        if (matcherUsername === undefined) {
            setMatcherProfile(defaultProfile)
        } else {
            try {
                const response = await fetch(API_ENDPOINTS.getMatcherProfile(matcherUsername))

                const userData = await response.json()

                if (!response.ok) {
                    setMatcherProfile(defaultProfile)
                    return defaultProfile
                }

                const { id, image, phone, gender, status, birthdate, matcher, first_name, last_name, registration_code, username, hero_image, header, subheader, description } = userData

                const matcherProfile = {
                    id,
                    logo: image ? image : '',
                    phone,
                    gender,
                    status,
                    birthdate,
                    matcher,
                    username,
                    name: `${first_name} ${last_name}`,
                    registration_code,
                    hero_image,
                    header,
                    subheader,
                    description,
                }

                setMatcherProfile(matcherProfile)

                return matcherProfile
            } catch (error) {
                setMatcherProfile(defaultProfile)
            }
        }
    }

    useEffect(() => {
        let refreshInterval = 1000 * 30 * 60

        let interval = setInterval(() => {
            if (authTokens) {
                updateToken()
            }
        }, refreshInterval)
        return () => clearInterval(interval)
    }, [authTokens, loading])

    const contextData = {
        user,
        setUser,
        authTokens,
        setAuthTokens,
        loginUser,
        logoutUser,
        deleteUser,
        getMatcherProfile,
        matcherProfile,
    }

    useEffect(() => {
        if (authTokens) {
            setUser(jwt_decode(authTokens.access))
        }
        setLoading(false)
    }, [authTokens, loading, matcherProfile])

    return <AuthContext.Provider value={contextData}>{loading ? null : children}</AuthContext.Provider>
}
