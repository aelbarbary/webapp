import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HistoryIcon from '@mui/icons-material/History';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import type { Navigation, Router } from '@toolpad/core';
import ContentPage from '../../pages/ContentPage';
import logo from '../../../src/static/img/logo.png';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Outlet, useLocation } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { height } from '@mui/system';

const NAVIGATION: Navigation = [
    { segment: 'search', title: 'Search', icon: <SearchIcon /> },
    { segment: 'history', title: 'History', icon: <HistoryIcon /> },
    { segment: 'upload', title: 'Upload', icon: <CloudUploadIcon /> },
];

interface DemoProps {
    window?: () => Window;
}

export default function DashboardLayoutBranding(props: DemoProps) {
    return (
        <AppProvider
            navigation={NAVIGATION}
            branding={{
                logo: <img src={logo} alt="Ticketing" />,
                title: 'Ticket AI',
            }}
        >
            <DashboardLayout>
                <Outlet />
            </DashboardLayout>
        </AppProvider>
    );
}
