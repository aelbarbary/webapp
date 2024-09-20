// layouts

import Home from './pages/website/Home'

// Marriage Links

import { Route, Routes } from 'react-router-dom'

import MainWebsiteIndex from './layouts/website/MainWebsiteIndex'

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<MainWebsiteIndex />}>
                <Route index element={<Home />} />
            </Route>
        </Routes>
    )
}
