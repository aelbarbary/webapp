// SearchResults.js
import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

export default function SearchResults({ query }: any) {
    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h4">Results for: {query}</Typography>
            {/* Fake Results */}
            <Typography>Result 1: This is a fake result.</Typography>
            <Typography>Result 2: This is another fake result.</Typography>
            <Typography>Result 3: Yet another fake result.</Typography>
            <TextField
                variant="outlined"
                label="Follow-up question"
                fullWidth
                sx={{ mt: 2 }}
            />
            <Button variant="contained" color="primary" sx={{ mt: 1 }}>
                Ask
            </Button>
        </Box>
    );
}
