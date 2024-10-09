// RenderedMessageContent.tsx
import { Typography } from '@mui/material';
import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface RenderedMessageContentProps {
    content: string;
}

const RenderedMessageContent: React.FC<RenderedMessageContentProps> = ({
    content,
}) => {
    // Handle code block with markdown-style syntax using regex
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const parts = content.split(codeBlockRegex);

    const renderStructuredContent = (text: string) => {
        const lines = text.split('\n');

        return lines.map((line, index) => {
            // Handle bold text with **
            const boldRegex = /\*\*(.*?)\*\*/g;
            if (boldRegex.test(line)) {
                return (
                    <Typography
                        key={index}
                        variant="body1"
                        style={{ fontWeight: 'bold', marginTop: 1 }}
                    >
                        {line.replace(boldRegex, (_, boldText) => boldText)}
                    </Typography>
                );
            }

            // Handle bullet points
            if (line.startsWith('- ')) {
                return (
                    <Typography
                        key={index}
                        variant="body1"
                        component="li"
                        style={{ marginLeft: '20px', marginTop: 10 }}
                    >
                        {line.substring(2)} {/* Remove '- ' prefix */}
                    </Typography>
                );
            }

            // Handle numbered lists (e.g., 1. Item)
            const numberedListRegex = /^\d+\.\s/;
            if (numberedListRegex.test(line)) {
                return (
                    <Typography key={index} variant="body1" component="li">
                        {line} {/* Keep the numbered prefix */}
                    </Typography>
                );
            }

            // If no special formatting is needed, return the line as is
            return (
                <Typography key={index} variant="body1" component="span">
                    {line}
                </Typography>
            );
        });
    };

    return (
        <>
            {parts.map((part, index) => {
                if (index % 3 === 0) {
                    return (
                        <span key={index}>{renderStructuredContent(part)}</span>
                    );
                } else if (index % 3 === 1) {
                    return null;
                } else {
                    return (
                        <SyntaxHighlighter
                            key={index}
                            style={a11yDark}
                            language="python"
                        >
                            {part}
                        </SyntaxHighlighter>
                    );
                }
            })}
        </>
    );
};

export default RenderedMessageContent;
