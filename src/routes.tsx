import { Route, Routes, useLocation } from 'react-router-dom'
import MainWebsiteIndex from './layouts/website/MainWebsiteIndex'
import DashboardLayoutBranding from './layouts/website/MainWebsiteIndex'
import Upload from './pages/website/Upload'
import History from './pages/website/History'
import Search from './pages/website/Search'

export default function Router() {    
    return (
        <Routes>
            <Route element={<DashboardLayoutBranding />}>
                <Route index element={<Search />} />
                <Route path="search" element={<Search />} />
                <Route path="history" element={<History />} />
                <Route path="upload" element={<Upload />} />
            </Route>
    </Routes>
    )
}
