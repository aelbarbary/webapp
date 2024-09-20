import React from 'react'
import { Grid, useTheme } from '@mui/material'

export default function Home() {
    window.scrollTo(0, 0)
    const theme = useTheme()
    return (
        <Grid  sx={{
            m: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            bgcolor: theme.palette.background.default, // Example usage of the theme
            color: theme.palette.text.primary,
            height: '900px',
            width: '100%'
          }}>
            <h1>Home</h1>
        </Grid>
    )
}
