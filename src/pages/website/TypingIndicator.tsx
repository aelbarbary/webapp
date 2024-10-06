import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const TypingIndicator = () => (
  <Box display="flex" alignItems="center">
    <CircularProgress size={24} />
    <span style={{ marginLeft: 10 }}>Bot is typing...</span>
  </Box>
);

export default TypingIndicator;
