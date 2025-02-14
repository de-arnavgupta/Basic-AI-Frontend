import React, { useState } from "react";

function ChatGenerator() {
    const [prompt, setPrompt] = useState('');
    const [chatResponse, setChatResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const askAi = async () => {
        if (!prompt.trim()) return;
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8080/response?message=${encodeURIComponent(prompt)}`);
            const data = await response.text();
            setChatResponse(data.replace(/<[^>]*>/g, "")); // Sanitize HTML response
        } catch (error) {
            setChatResponse("Error fetching response. Try again.");
        }
        setLoading(false);
    };

    return (
        <div className="chat-container text-white p-6 bg-white/10 backdrop-blur-lg rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold mb-4">Chat Bot</h1>
            <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your message"
                className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />
            <button
                onClick={askAi}
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
                {loading ? "Processing..." : "ASK AI"}
            </button>
            <div className="output mt-6 p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-white whitespace-pre-wrap">{chatResponse}</p>
            </div>
        </div>
    );
}

export default ChatGenerator;
