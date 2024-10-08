import React, { useContext, useEffect, useState } from 'react'

import { Grid, useTheme } from '@mui/material'
import Chatbot from '../../sections/chatbot/Chatbot'

export default function History() {
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
            <h1>History</h1>
        </Grid>
    )
}
