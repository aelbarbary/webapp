import { useContext } from 'react'
import { Outlet, Navigate, useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

interface RequireAuthProps {
    allowedGroups: string[]
}

const RequireAuth = ({ allowedGroups }: RequireAuthProps) => {
    const { matchmaker } = useParams()
    const { user }: any = useContext(AuthContext)
    const location = useLocation()
    if (user == null) {
        return <Navigate to={`/${matchmaker}/login`} state={{ from: location }} replace />
    }

    const isTokenExpired = user.exp < Date.now() / 1000

    if (isTokenExpired) {
        return <Navigate to={`/${matchmaker}/login`} state={{ from: location }} replace />
    }

    return user?.groups.find((group: string) => allowedGroups.includes(group)) || allowedGroups.includes('any') ? (
        <Outlet />
    ) : user ? (
        <Navigate to="/unauthorized" state={{ from: location }} replace />
    ) : (
        <Navigate to={`/${matchmaker}/login`} state={{ from: location }} replace />
    )
}

export default RequireAuth
