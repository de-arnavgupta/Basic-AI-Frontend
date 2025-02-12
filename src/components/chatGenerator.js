import React, {useState} from "react";

function ChatGenerator() {
    const [prompt, setPrompt] = useState('');
    const[chatResponse, setChatResponse] = useState('');

    const askAi = async () => {
        try{
            const response = await fetch(`http://localhost:8080/response?message=${prompt}`);
            const data = await response.text();
            setChatResponse(data);
            console.log(data);
        }
        catch(error)
        {
            console.error(error);
        }
    }
    return (
        <div>
            <h1>Chat Bot</h1>
            <input type="text"
                value = {prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={"Enter your message"}
            />
            <button onClick={askAi}>ASK AI</button>
            <div className="output">
                <p>{chatResponse}</p>
            </div>
        </div>
    );
}

export default ChatGenerator;