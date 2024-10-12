import React, { useState } from 'react';
import { Grid, useTheme, Typography } from '@mui/material';
import JSONPretty from 'react-json-pretty';

export default function FileConverter() {
    const theme = useTheme();
    const [file, setFile] = useState<File | null>(null);
    const [jsonResponse, setJsonResponse] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            await handleSubmit(selectedFile); // Upload immediately after selecting
        }
    };

    const handleSubmit = async (selectedFile: File) => {
        setError(null);

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await fetch(
                'http://127.0.0.1:8000/api/v1/convert/',
                {
                    method: 'POST',
                    body: formData,
                }
            );

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            // Ensure data is an object

            setJsonResponse(data);
        } catch (err) {
            if (err instanceof Error) {
                setError('Error uploading file: ' + err.message);
            } else {
                setError('An unexpected error occurred.');
            }
        }
    };

    return (
        <Grid
            sx={{
                display: 'flex',
                flexDirection: 'column',

                bgcolor: theme.palette.background.default,
                color: theme.palette.text.primary,
                height: '900px',
                width: '100%',
                padding: 2,
            }}
        >
            <Typography variant="h4">File Converter</Typography>
            <input type="file" accept=".md, .mdx" onChange={handleFileChange} />
            {error && <Typography color="error">{error}</Typography>}
            {jsonResponse && (
                <div
                    style={{
                        marginTop: 20,
                        maxHeight: '400px',
                        overflowY: 'auto',
                        textAlign: 'left',
                    }}
                >
                    <JSONPretty data={jsonResponse} />
                </div>
            )}
        </Grid>
    );
}
