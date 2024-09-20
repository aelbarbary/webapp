import { Route, Routes } from 'react-router-dom'

import MainWebsiteIndex from './layouts/website/MainWebsiteIndex'
import Dashboard from '@mui/icons-material/Dashboard'

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<MainWebsiteIndex />}>

            </Route>
        </Routes>
    )
}
