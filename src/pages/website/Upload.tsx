import React from 'react'
import { Grid, useTheme } from '@mui/material'

export default function Upload() {
    window.scrollTo(0, 0)
    const theme = useTheme()
    return (
        <Grid  sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            bgcolor: theme.palette.background.default, // Example usage of the theme
            color: theme.palette.text.primary,
            height: '900px',
            width: '100%'
          }}>
            <h1>Upload</h1>
        </Grid>
    )
}