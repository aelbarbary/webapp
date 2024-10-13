import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import Converter from './website/FileConverter';

import Search from './website/Search';

const routeConfig: Record<string, React.ComponentType> = {
    '/search': Search,
    '/convert': Converter,
};

export default function ContentPage({ pathname }: { pathname: string }) {
    const Component =
        routeConfig[pathname] ||
        (() => <Typography>Dashboard content for {pathname}</Typography>);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
            }}
        >
            <Component />
        </Box>
    );
}
