import axios from 'axios'
import React, { useContext } from 'react'
import { GoogleLogin } from 'react-google-login'
import AuthContext from '../context/AuthContext'
import { useNavigate, useParams } from 'react-router-dom'
import { API_ENDPOINTS } from '../dataServices/api'
const GoogleLoginButton = () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
    let { loginUser }: any = useContext(AuthContext)
    const navigate = useNavigate()
    const { matchmaker } = useParams()
    const { success }: any = { success: { pathname: `/${matchmaker}` } }
    const { error }: any = { error: { pathname: '/login' } }

    const onSuccess = async (res: any) => {
        const email = res.profileObj.email
        const firstName = res.profileObj.givenName
        const lastName = res.profileObj.familyName
        const password = res.profileObj.googleId
        try {
            await axios.post(API_ENDPOINTS.googleRegister, {
                email,
                first_name: firstName,
                last_name: lastName,
                password,
                registration_code: import.meta.env.VITE_REGISTRATION_CODE,
            })
        } catch (err) {
        } finally {
            await loginUser(email, password)
                .then((res: any) => {
                    if (res?.response?.status === 200) {
                        navigate(success, {
                            state: {
                                status: 'success',
                                openSnackbar: true,
                                message: 'Logged In Successfully',
                            },
                        })
                    } else if (res?.response?.status === 401) {
                        navigate(error, {
                            state: {
                                status: 'error',
                                openSnackbar: true,
                                message: 'The email is already associated with a different password. Please log in using your email and the corresponding password.',
                            },
                        })
                    }
                })
                .catch((err: any) => {
                    navigate(error, {
                        state: {
                            status: 'error',
                            openSnackbar: true,
                            message: 'Logged In Failed',
                        },
                    })
                })
        }
    }

    const onFailure = (res: any) => {
        if (res.error != 'popup_closed_by_user') {
            navigate(error, {
                state: {
                    status: 'error',
                    openSnackbar: true,
                    message: 'Logged In Failed',
                },
            })
        }
    }

    return (
        <div>
            <GoogleLogin
                clientId={clientId}
                onSuccess={onSuccess}
                onFailure={onFailure}
                buttonText="Login with Google"
                cookiePolicy="single_host_origin"
                isSignedIn={false}
                className="w-100 justify-content-center rounded-full mb-2"
            />
        </div>
    )
}
export default GoogleLoginButton
