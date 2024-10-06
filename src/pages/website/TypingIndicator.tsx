import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { AIIcon } from '../../components/AIIcon';

const TypingIndicator = () => (
    <Box display="flex" alignItems="center">
        <AIIcon icon="eos-icons:three-dots-loading" width={40} />
        <span style={{ marginLeft: 10 }}>Bot is typing...</span>
    </Box>
);

export default TypingIndicator;
