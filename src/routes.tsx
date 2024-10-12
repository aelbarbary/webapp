import { Route, Routes, useLocation } from 'react-router-dom';
import MainWebsiteIndex from './layouts/website/MainWebsiteIndex';
import DashboardLayoutBranding from './layouts/website/MainWebsiteIndex';
import History from './pages/website/FileConverter';
import Search from './pages/website/Search';
import FileConverter from './pages/website/FileConverter';

export default function Router() {
    return (
        <Routes>
            <Route element={<DashboardLayoutBranding />}>
                <Route index element={<Search />} />
                <Route path="search" element={<Search />} />
                <Route path="convert" element={<FileConverter />} />
            </Route>
        </Routes>
    );
}
