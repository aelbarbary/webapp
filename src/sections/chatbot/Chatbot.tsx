import React, { useEffect, useRef, useState } from 'react'
import { Box, TextField, IconButton, List, ListItem, ListItemText } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'

interface Message {
    text: string
    sender: 'user' | 'bot' // You can add more sender types if necessary
    isHtml: boolean
}

const Chatbot = () => {
    const [messages, setMessages] = useState<Message[]>([])
    const [inputMessage, setInputMessage] = useState<string>('')
    const listEndRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        // Scroll to the bottom of the list whenever messages change
        listEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const handleSendMessage = async () => {
        if (inputMessage.trim()) {
            setMessages((prevMessages) => [...prevMessages, { text: inputMessage, sender: 'user', isHtml: false }])
            setInputMessage('')

            try {
                const response = await fetch('http://localhost:8000/api/v1/answer/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ prompt: inputMessage }),
                })

                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }

                const contentType = response.headers.get('Content-Type')
                console.log(contentType)
                if (contentType?.includes('application/json')) {
                    // Handle text response
                    const data = await response.json()
                    const botMessage = data.response

                    setMessages((prevMessages) => [...prevMessages, { text: botMessage, sender: 'bot', isHtml: false }])
                } else if (contentType?.includes('text/plain') || contentType?.includes('application/pdf') || contentType?.includes('application/csv')) {
                    const blob = await response.blob()
                    const url = window.URL.createObjectURL(blob)

                    // Create a message with an HTML link
                    const fileLinkMessage = `Click <a href="${url}" download="downloaded_file">here</a> to download the file.`

                    setMessages((prevMessages) => [...prevMessages, { text: fileLinkMessage, sender: 'bot', isHtml: true }])

                    // Optionally, you might want to clean up the URL after some time
                    setTimeout(() => window.URL.revokeObjectURL(url), 60000)
                } else {
                    throw new Error('Unexpected content type')
                }

                // const data = await response.json()
                // const botMessage = data.response

                // setMessages((prevMessages) => [...prevMessages, { text: botMessage, sender: 'bot' }])
            } catch (error) {
                console.error('Error:', error)
            }
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault() // Prevent the default Enter key behavior (new line)
            handleSendMessage()
        }
    }

    return (
        <Box
            sx={{
                width: '500px',
                height: '800px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                bgcolor: 'lightblue',
                borderRadius: 2,
                boxShadow: 2,
                padding: 2,
                m: 10,
            }}
        >
            {/* Message Area */}
            <List
                sx={{
                    flexGrow: 1,
                    overflowY: 'auto',
                    padding: 1,
                    bgcolor: 'white',
                    borderRadius: 2,
                }}
            >
                {messages.map((message, index) => (
                    <ListItem
                        key={index}
                        sx={{
                            justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                        }}
                    >
                        <ListItemText
                            sx={{
                                bgcolor: message.sender === 'user' ? 'lightblue' : 'lightgray',
                                padding: 1,
                                borderRadius: 2,
                                maxWidth: '80%',
                            }}
                            primary={message.isHtml ? <span dangerouslySetInnerHTML={{ __html: message.text }} /> : message.text}
                        />
                    </ListItem>
                ))}
                <div ref={listEndRef} />
            </List>

            {/* Input Field */}
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                <TextField variant="outlined" size="small" fullWidth value={inputMessage} onKeyDown={handleKeyDown} onChange={(e) => setInputMessage(e.target.value)} placeholder="Type your message..." sx={{ bgcolor: 'white', borderRadius: 2 }} />
                <IconButton color="primary" onClick={handleSendMessage} sx={{ ml: 1 }}>
                    <SendIcon />
                </IconButton>
            </Box>
        </Box>
    )
}

export default Chatbot
