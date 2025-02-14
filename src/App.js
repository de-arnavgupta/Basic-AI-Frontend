import "./App.css";
import "./tailwind-output.css";

import React, { useState } from "react";
import ChatGenerator from "./components/chatGenerator";
import ImageGenerator from "./components/imageGenerator";
import RecipeGenerator from "./components/recipeGenerator";

function App() {
    const [activeTab, setActiveTab] = useState('chat-bot');

    const tabs = [
        { id: 'chat-bot', label: 'Chat Bot', icon: '💬' },
        { id: 'image-generator', label: 'Image Generator', icon: '🖼️' },
        { id: 'recipe-generator', label: 'Recipe Generator', icon: '👨‍🍳' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">AI Assistant Hub</h1>
                    <p className="text-blue-200">Your all-in-one AI companion for chat, recipes, and more</p>
                </div>

                {/* Tab Navigation */}
                <div className="bg-white/10 backdrop-blur-lg rounded-lg p-2 mb-6">
                    <div className="flex justify-center space-x-2">
                        {tabs.map(({ id, label, icon }) => (
                            <button
                                key={id}
                                onClick={() => setActiveTab(id)}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                                    activeTab === id
                                        ? 'bg-white/20 text-white'
                                        : 'text-blue-200 hover:bg-white/10'
                                }`}
                            >
                                <span className="text-xl">{icon}</span>
                                <span>{label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
                    {activeTab === 'chat-bot' && <ChatGenerator />}
                    {activeTab === 'image-generator' && <ImageGenerator />}
                    {activeTab === 'recipe-generator' && <RecipeGenerator />}
                </div>
            </div>
        </div>
    );
}

export default App;