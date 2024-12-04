import React, { useState, useEffect, useRef } from 'react';

type Message = {
    role: 'user' | 'assistant';
    content: string;
};

const Chatbot: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState<string>('');
    const chatContainerRef = useRef<HTMLDivElement | null>(null);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage: Message = { role: 'user', content: input };
        setMessages((prev) => [...prev, userMessage]); // Update state immediately

        setInput('');

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userMessage: input,
                    context: [...messages, userMessage].map((msg) => ({
                        role: msg.role,
                        content: msg.content,
                    })),
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
        }
    };

    useEffect(() => {
        // Scroll to the bottom whenever messages are updated
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent the default behavior of Enter key
            sendMessage();
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 max-w-xl mx-auto border border-gray-200">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 text-center">
                    Chat with Southern Glazer's Assistant
                </h2>
                <p className="text-gray-600 text-center">
                    Get personalized wine recommendations instantly!
                </p>
            </div>
            <div
                ref={chatContainerRef}
                className="bg-gray-100 rounded-lg p-4 h-64 overflow-y-auto border border-gray-300 mb-4"
            >
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`mb-2 p-2 rounded-lg ${
                            msg.role === 'user'
                                ? 'bg-teal-600 text-white self-end text-right'
                                : 'bg-gray-200 text-gray-800 self-start'
                        }`}
                    >
                        <strong>{msg.role === 'user' ? 'You' : 'Assistant'}:</strong> {msg.content}
                    </div>
                ))}
            </div>
            <div className="flex gap-4">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown} // Add Enter key support
                    placeholder="Type your message..."
                    className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <button
                    onClick={sendMessage}
                    className="bg-teal-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-teal-700 transition-all focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chatbot;
