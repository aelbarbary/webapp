import React, { useState } from 'react';
import { Grid, useTheme, Typography, IconButton } from '@mui/material';
import JSONPretty from 'react-json-pretty';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export default function FileConverter() {
    const convert_url = import.meta.env.VITE_CONVERT_URL;

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

    const handleCopy = () => {
        if (jsonResponse) {
            // Create the JSON string for copying
            const jsonString = JSON.stringify(jsonResponse, null, 2); // Pretty print with indentation

            // Log the JSON string before copying
            console.log('JSON string to copy:', jsonString); // This will still show escape characters in console

            // Use the Clipboard API to copy text
            if (navigator.clipboard) {
                navigator.clipboard
                    .writeText(jsonString)
                    .then(() => {
                        alert('JSON copied to clipboard!');
                    })
                    .catch(err => {
                        console.error('Failed to copy: ', err);
                    });
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = jsonString; // Use the JSON string directly
                textArea.style.position = 'fixed'; // Prevent scrolling to bottom of page in MS Edge
                document.body.appendChild(textArea);
                textArea.select();
                try {
                    document.execCommand('copy'); // Copy the text
                    alert('JSON copied to clipboard!');
                } catch (err) {
                    console.error('Fallback: Failed to copy: ', err);
                } finally {
                    document.body.removeChild(textArea); // Clean up
                }
            }
        } else {
            console.warn('No JSON response available to copy.');
        }
    };

    const handleSubmit = async (selectedFile: File) => {
        setError(null);

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await fetch(convert_url, {
                method: 'POST',
                body: formData,
            });

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
                    <IconButton onClick={handleCopy} aria-label="copy">
                        <ContentCopyIcon />
                    </IconButton>
                    <JSONPretty data={jsonResponse} />
                </div>
            )}
        </Grid>
    );
}
