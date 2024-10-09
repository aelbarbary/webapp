import React, { ReactNode, useEffect, useRef, useState } from 'react';
import {
    Grid,
    TextField,
    Button,
    useTheme,
    Typography,
    Box,
    Icon,
    Paper,
    List,
    ListItem,
    ListItemText,
    Drawer,
    Slider,
    IconButton,
} from '@mui/material';
import axios from 'axios';
import RenderedMessageContent from './RenderedMessageContent';
import TypingIndicator from './TypingIndicator';
import SettingsIcon from '@mui/icons-material/Settings';

const api_url = import.meta.env.VITE_API_URL;

interface Message {
    content: string | ReactNode;
    sender: 'user' | 'bot';
    type?: 'string' | 'component';
}

export default function Search() {
    const [drawerOpen, setDrawerOpen] = useState(false); // State to manage Drawer visibility
    const [limit, setLimit] = useState(20); // Query param state
    const [metadataFilter, setMetadataFilter] = useState(''); // Query param state
    const [lexicalInterpolation, setLexicalInterpolation] = useState<number>(1); // Slider for lexical interpolation

    const [question, setQuestion] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const endOfMessagesRef = useRef<HTMLDivElement>(null);
    const theme = useTheme();

    let accumulatedAnswer = '';

    const toggleDrawer =
        (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
            // Type narrowing: Check if it's a KeyboardEvent before accessing 'key'
            if (
                (event.type === 'keydown' &&
                    (event as React.KeyboardEvent).key === 'Tab') ||
                (event as React.KeyboardEvent).key === 'Shift'
            ) {
                return;
            }
            setDrawerOpen(open);
        };

    function processAnswer(answer: any) {
        console.log(answer);
        if (answer.type === 'urls') {
            handleUrls(answer.data);
        } else {
            handleRegularAnswer(answer);
        }
    }

    function handleUrls(urls: any) {
        const formattedUrls = formatUrls(urls);
        setMessages(prevMessages => {
            const updatedMessages = [...prevMessages];
            updatedMessages.push({
                type: 'component', // Use 'html' type for rendering
                content: formattedUrls, // Pass the formatted URLs
                sender: 'bot',
            });
            return updatedMessages;
        });
    }

    function formatUrls(urls: [any]) {
        return urls.map(url => (
            <div>
                <a href={url} target="_blank" rel="noopener noreferrer">
                    ${url}
                </a>
                <br />
            </div>
        ));
    }

    function handleRegularAnswer(answer: any) {
        accumulatedAnswer += answer;
        setMessages(prevMessages => {
            const updatedMessages = [...prevMessages];
            updatedMessages.pop();
            updatedMessages.push({
                type: 'string',
                content: accumulatedAnswer,
                sender: 'bot',
            });
            return updatedMessages;
        });
    }

    const handleSend = async () => {
        if (!question.trim()) return;

        accumulatedAnswer = '';

        const userMessage: Message = {
            type: 'string',
            content: question,
            sender: 'user',
        };

        setQuestion('');
        setMessages(prevMessages => [...prevMessages, userMessage]);
        setLoading(true);
        setMessages(prevMessages => {
            return [
                ...prevMessages,
                {
                    type: 'component',
                    content: <TypingIndicator />,
                    sender: 'bot',
                },
            ];
        });

        try {
            const query_params = {
                limit: limit,
                metadata_filter: metadataFilter,
                stream_response: true,
                lexical_interpolation: lexicalInterpolation,
            };

            const responseStream = await fetch(api_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: question,
                    query_params: query_params,
                }),
            });

            const reader = responseStream.body?.getReader();
            const decoder = new TextDecoder('utf-8');

            while (true) {
                const { done, value }: any = await reader?.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                const chunks = chunk.split('\n');

                for (const line of chunks) {
                    if (line.trim()) {
                        try {
                            const data = JSON.parse(line);
                            if (data.answer) {
                                processAnswer(data.answer);
                            }
                        } catch (e) {
                            console.error('Error parsing JSON:', e);
                        }
                    }
                }
            }
        } catch (error) {
            setMessages(prevMessages => {
                const updatedMessages = [...prevMessages];
                updatedMessages.pop(); // Remove the loading message
                return [
                    ...updatedMessages,
                    {
                        type: 'string',
                        content:
                            'Error connecting to the server. Please try again.',
                        sender: 'bot',
                    },
                ];
            });
        } finally {
            setLoading(false);
            setQuestion('');
        }
    };

    useEffect(() => {
        if (endOfMessagesRef.current) {
            endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <div
            style={{
                height: '100%', // Full viewport height
                width: '100%',
                display: 'flex', // Optional: Flexbox layout
                justifyContent: 'center', // Optional: Center content horizontally
                alignItems: 'center', // Optional: Center content vertically
            }}
        >
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                sx={{ padding: 4, spacing: 10, m: 5 }}
            >
                <div style={{ width: 300, padding: 40, marginTop: 50 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Query Parameters
                    </Typography>

                    {/* Limit input */}
                    <Typography gutterBottom>Limit</Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Limit"
                        type="number"
                        value={limit}
                        onChange={e => setLimit(Number(e.target.value))}
                        sx={{ mb: 2 }}
                    />

                    {/* Metadata Filter input */}
                    <Typography gutterBottom>Metadata Filter</Typography>
                    <TextField
                        fullWidth
                        sx={{ mb: 2 }}
                        variant="outlined"
                        label="Metadata Filter"
                        value={metadataFilter}
                        onChange={e => setMetadataFilter(e.target.value)}
                    />

                    <Typography gutterBottom>Lexical Interpolation</Typography>
                    <TextField
                        type="number"
                        fullWidth
                        sx={{ mb: 2 }}
                        inputProps={{
                            step: 0.1, // Allows fractional input with step 0.1
                            min: 0,
                            max: 2,
                        }}
                        value={lexicalInterpolation}
                        onChange={e => {
                            const newValue = parseFloat(e.target.value);
                            if (
                                !isNaN(newValue) &&
                                newValue >= 0 &&
                                newValue <= 2
                            ) {
                                setLexicalInterpolation(newValue);
                            }
                        }}
                        label="Enter a value between 0 and 2"
                        variant="outlined"
                    />
                    <Button variant="contained" onClick={toggleDrawer(false)}>
                        Apply
                    </Button>
                </div>
            </Drawer>

            <Paper
                sx={{
                    display: 'flex',
                    width: '100%',
                    flexDirection: 'column',
                    padding: 2,
                    position: 'relative',
                }}
            >
                <IconButton
                    edge="end"
                    color="inherit"
                    onClick={toggleDrawer(true)}
                    aria-label="menu"
                    sx={{
                        width: '50px',
                        position: 'fixed', // Use fixed positioning
                        bottom: 20, // 20px from the bottom
                        right: 20, // 20px from the right
                        zIndex: 1000, // Ensure it is on top of other components
                    }}
                >
                    <SettingsIcon />
                </IconButton>

                <Typography variant="h5" align="center" gutterBottom>
                    What do you want to know/do?
                </Typography>
                <List
                    sx={{
                        flexGrow: 1,
                        overflowY: 'auto',
                        marginBottom: '16px',
                    }}
                >
                    {messages.map((message, index) => (
                        <ListItem
                            key={index}
                            style={{
                                justifyContent:
                                    message.sender === 'user'
                                        ? 'flex-end'
                                        : 'flex-start',
                            }}
                        >
                            <ListItemText
                                primary={
                                    message.type === 'component' ? (
                                        message.content
                                    ) : (
                                        <RenderedMessageContent
                                            content={message.content as string}
                                        />
                                    )
                                }
                                style={{
                                    backgroundColor:
                                        message.sender === 'user'
                                            ? theme.palette.grey[700]
                                            : theme.palette.grey[900],
                                    color:
                                        message.sender === 'user'
                                            ? 'white'
                                            : 'white',
                                    borderRadius: '10px',
                                    padding: '8px',
                                    maxWidth: '70%',
                                    textAlign:
                                        message.sender === 'user'
                                            ? 'right'
                                            : 'left',
                                }}
                            />
                        </ListItem>
                    ))}
                    <div ref={endOfMessagesRef} />
                </List>

                <TextField
                    fullWidth
                    variant="outlined"
                    label="Ask a question..."
                    value={question}
                    onChange={e => setQuestion(e.target.value)}
                    onKeyPress={e => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSend();
                        }
                    }}
                    multiline
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSend}
                    style={{ marginTop: '10px' }}
                    disabled={loading}
                >
                    {loading ? 'Sending...' : 'Send'}
                </Button>
            </Paper>
        </div>
    );
}
