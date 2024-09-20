import { Box, Grid, Stack, Typography } from "@mui/material";

export function UserInformation({ info }: any) {
    return (
        <Stack spacing={2}>
            <Box>
                <Typography variant="h6">
                    Description
                </Typography>
                <Typography variant="body1">
                    {info.description}
                </Typography>
            </Box>

            <Grid container >
                <Grid item xs={4}>
                    <Typography variant="h6">
                        Address
                    </Typography>
                    <Typography variant="body1">
                        {info.address}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="h6">
                        Country
                    </Typography>
                    <Typography variant="body1">
                        {info.country}
                    </Typography>
                </Grid>

                <Grid item xs={4}>
                    <Typography variant="h6">
                        City
                    </Typography>
                    <Typography variant="body1">
                        {info.city}
                    </Typography>
                </Grid>

            </Grid>

            <Grid container>
                <Grid item xs={4}>
                    <Typography variant="h6">
                        State
                    </Typography>
                    <Typography variant="body1">
                        {info.state}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="h6">
                        Zip Code
                    </Typography>
                    <Typography variant="body1">
                        {info.zip_code}
                    </Typography>
                </Grid>
            </Grid>

            <Box>
                <Typography variant="h6">
                    Employer
                </Typography>
                <Typography variant="body1">
                    {info.employer}
                </Typography>
            </Box>


        </Stack >
    )
}