import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Home from "./website/Home";
import History from "./website/History";

const routeConfig: Record<string, React.ComponentType> = {
    '/home': Home,
    '/history': History,
  };

export default function DemoPageContent({ pathname }: { pathname: string }) {
    const Component = routeConfig[pathname] || (() => <Typography>Dashboard content for {pathname}</Typography>);

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