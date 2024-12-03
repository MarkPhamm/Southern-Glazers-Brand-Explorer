import React, { useState } from 'react';

type Message = {
    role: 'user' | 'assistant';
    content: string;
};

const Chatbot: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState<string>('');

    const sendMessage = async () => {
        if (!input.trim()) return;
    
        const userMessage: Message = { role: 'user', content: input };
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
    
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userMessage: input,
                    context: updatedMessages.map((msg) => ({ role: msg.role, content: msg.content })),
                }),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            const botMessage: Message = {
                role: 'assistant',
                content: data.response || 'No response from the server.',
            };
    
            setMessages((prev) => [...prev, botMessage]);
        } catch (error: unknown) {
            console.error('Error:', error instanceof Error ? error.message : error);
    
            const errorMessage: Message = {
                role: 'assistant',
                content: 'Sorry, there was an error processing your request.',
            };
    
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setInput('');
        }
        console.log('Sending message:', input);
        console.log('Updated messages:', updatedMessages);
    };
    


    return (
        <div
            style={{
                border: '1px solid #ccc',
                padding: '16px',
                borderRadius: '8px',
                maxWidth: '400px',
                margin: '0 auto',
            }}
        >
            <div
                style={{
                    maxHeight: '300px',
                    overflowY: 'auto',
                    marginBottom: '16px',
                    padding: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                }}
            >
                {messages.map((msg, idx) => (
                    <div key={idx} style={{ marginBottom: '8px' }}>
                        <strong>{msg.role === 'user' ? 'You' : 'Bot'}:</strong> {msg.content}
                    </div>
                ))}
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    style={{
                        flex: 1,
                        padding: '8px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                    }}
                />
                <button
                    onClick={sendMessage}
                    style={{
                        padding: '8px 16px',
                        background: '#0070f3',
                        color: '#fff',
                        borderRadius: '4px',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chatbot;
