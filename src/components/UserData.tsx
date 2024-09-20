import { Box, Grid, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';

export function UserData({ data }: any) {
    return (
        <Stack sx={{ width: "100%" }} spacing={3}>
            <Box>
                <Typography variant="h4" fontWeight="bold">
                    {data.first_name} {data.last_name}
                    <Link to="/profile/edit" >
                        <EditIcon sx={{mx: 2}} />
                    </Link>
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    {data.email}
                </Typography>
            </Box>
            <Grid container>
                <Grid item xs={4}>
                    <Typography variant="h6">
                        Phone
                    </Typography>
                    <Typography variant="body1">
                        {data.phone || "None"}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="h6">
                        Gender
                    </Typography>
                    <Typography variant="body1">
                        {data.gender}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="h6">
                        Birthdate
                    </Typography>
                    <Typography variant="body1">
                        {data.birthdate}
                    </Typography>
                </Grid>
            </Grid>

            <Grid container>
                <Grid item xs={4}>
                    <Typography variant="h6">
                        Registration Link
                    </Typography>
                    <Typography variant="body1">
                        <a href={"/register#/register/" + data.registration_code}>
                            Registration Link
                        </a>
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="h6">
                        Reffered By
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        {data.referred_by_code}
                    </Typography>

                </Grid>
            </Grid>


        </Stack>
    )
}