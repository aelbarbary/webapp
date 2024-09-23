import React, { useState } from 'react';
import { Grid, TextField, Button, useTheme, Typography, Box } from '@mui/material';
import axios from 'axios';

export default function Search() {
    window.scrollTo(0, 0);
    const theme = useTheme();
    
    const [queries, setQueries] = useState<{ query: string; response: string }[]>([]);
    const [query, setQuery] = useState('');

    const handleSearch = async () => {
        if (query.trim()) {
            try {
                const response = await axios.post('http://localhost:8000/api/v1/answer/', {
                    prompt: query.trim(),
                });

                setQueries((prevQueries) => [
                    ...prevQueries, 
                    { query: query.trim(), response: response.data.response }
                ]);
                setQuery(''); 
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    };

    return (
        <Grid 
            container
            direction="column"
            alignItems="center"
            justifyContent="flex-start"
            sx={{
                bgcolor: theme.palette.background.default,
                color: theme.palette.text.primary,
                height: '100vh',
                padding: '20px',
                overflowY: 'auto',
            }}
        >
            <h1>Chat</h1>
            <Box sx={{ width: '100%', maxWidth: '600px', mb: 2 }}>
                {queries.map((item, index) => (
                    <Box key={index} sx={{ mb: 1 }}>
                        <Typography 
                            variant="body1" 
                            sx={{ 
                                textAlign: 'right', 
                                bgcolor: theme.palette.primary.dark, 
                                color: 'white', 
                                borderRadius: '8px', 
                                padding: '10px', 
                                marginTop: '5px', 
                                mb: 1
                                
                            }}
                        >
                            {item.query}
                        </Typography>
                        <b/>    
                        <b/>    
                        <Typography 
                            variant="body1" 
                            sx={{ 
                                textAlign: 'left', 
                                bgcolor: theme.palette.grey[600], 
                                borderRadius: '8px', 
                                padding: '10px', 
                                
                            }}
                        >
                            {item.response}
                        </Typography>
                        
                        
                    </Box>
                ))}
            </Box>
            <TextField
                multiline
                rows={4}
                variant="outlined"
                label="Enter your NLP query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
            />
            <Button variant="contained" onClick={handleSearch} sx={{ mb: 1 }}>
                Search
            </Button>
        </Grid>
    );
}
