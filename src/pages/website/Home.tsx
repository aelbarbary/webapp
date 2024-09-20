import React, { useContext, useEffect, useState } from 'react'

import { Grid } from '@mui/material'
import Chatbot from '../../sections/chatbot/Chatbot'

export default function Home() {
    window.scrollTo(0, 0)
    return (
        <Grid>
            <Chatbot />
        </Grid>
    )
}
