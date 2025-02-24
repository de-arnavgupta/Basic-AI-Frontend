import React, { useState, useEffect } from "react";

function ChatGenerator() {
    const [prompt, setPrompt] = useState('');
    const [conversation, setConversation] = useState([]); // Stores current conversation
    const [chatHistory, setChatHistory] = useState([]); // Stores past conversations
    const [loading, setLoading] = useState(false);
    const [showHistory, setShowHistory] = useState(false);

    // Fetch saved conversations when the component loads
    useEffect(() => {
        fetchChatHistory();
    }, []);

    const fetchChatHistory = async () => {
        try {
            const response = await fetch("http://localhost:8080/chatHistory");
            const data = await response.json();
            setChatHistory(data.map(conv => JSON.parse(conv.messages))); // Parse JSON conversations
        } catch (error) {
            console.error("Error fetching chat history:", error);
        }
    };

    const askAi = async () => {
        if (!prompt.trim()) return;
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8080/response?message=${encodeURIComponent(prompt)}`);
            const data = await response.text();

            // Update conversation state with new message-response pair
            setConversation([...conversation, { user: prompt, bot: data }]);
            setPrompt('');
        } catch (error) {
            console.error("Error fetching response:", error);
        }
        setLoading(false);
    };

    const saveConversation = async () => {
        await fetch("http://localhost:8080/saveConversation", { method: "GET" });
        alert("Conversation saved!");
        setConversation([]); // Clear chat after saving
        fetchChatHistory(); // Refresh history
    };

    return (
        <div className="chat-container text-white p-6 bg-white/10 backdrop-blur-lg rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold mb-4">Chat Bot</h1>

            {/* Toggle Chat History View */}
            <button
                onClick={() => setShowHistory(!showHistory)}
                className="w-full bg-blue-600 text-white py-2 mb-4 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
                {showHistory ? "Back to Chat" : "View Chat History"}
            </button>

            {showHistory ? (
                <div className="chat-history max-h-96 overflow-y-auto p-4 border border-white/10 rounded-lg bg-white/5">
                    {chatHistory.length === 0 ? (
                        <p className="text-blue-200">No chat history available.</p>
                    ) : (
                        chatHistory.map((conv, index) => (
                            <div key={index} className="mb-6 p-4 bg-white/10 rounded-lg">
                                <h3 className="text-blue-400 mb-2">Conversation {index + 1}</h3>
                                {conv.map((msg, msgIndex) => (
                                    <p key={msgIndex} className={msg.startsWith("You:") ? "text-blue-300" : "text-green-300"}>
                                        {msg}
                                    </p>
                                ))}
                            </div>
                        ))
                    )}
                </div>
            ) : (
                <>
                    {/* Chat Conversation Area */}
                    <div className="chat-history max-h-96 overflow-y-auto p-4 mb-4 border border-white/10 rounded-lg bg-white/5">
                        {conversation.map((chat, index) => (
                            <div key={index} className="mb-4">
                                <p className="text-blue-300"><strong>You:</strong> {chat.user}</p>
                                <p className="text-green-300"><strong>Bot:</strong> {chat.bot}</p>
                            </div>
                        ))}
                    </div>

                    {/* Input Field */}
                    <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Enter your message"
                        className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                    />

                    {/* Chat Controls */}
                    <div className="flex space-x-2">
                        <button
                            onClick={askAi}
                            disabled={loading}
                            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                        >
                            {loading ? "Processing..." : "ASK AI"}
                        </button>
                        <button
                            onClick={saveConversation}
                            className="flex-1 bg-green-500 text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity"
                        >
                            Save Conversation
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default ChatGenerator;
