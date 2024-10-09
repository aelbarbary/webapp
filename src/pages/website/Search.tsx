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
} from '@mui/material';
import axios from 'axios';
import RenderedMessageContent from './RenderedMessageContent';
import TypingIndicator from './TypingIndicator';

const api_url = import.meta.env.VITE_API_URL;

interface Message {
    content: string | ReactNode;
    sender: 'user' | 'bot';
    type?: 'string' | 'component';
}

export default function Search() {
    const [question, setQuestion] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const endOfMessagesRef = useRef<HTMLDivElement>(null);
    const theme = useTheme();

    let accumulatedAnswer = '';

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
            const responseStream = await fetch(api_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: question }),
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
            <Paper
                sx={{
                    display: 'flex',
                    width: '100%',
                    flexDirection: 'column',
                    padding: 2,
                }}
            >
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
