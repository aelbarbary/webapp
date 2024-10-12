import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import History from './website/FileConverter';
import Upload from './website/Upload';
import Search from './website/Search';

const routeConfig: Record<string, React.ComponentType> = {
    '/search': Search,
    '/history': History,
    '/upload': Upload,
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
