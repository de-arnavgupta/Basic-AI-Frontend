import React, {useState} from "react";
import './App.css';
import ChatGenerator from "./components/chatGenerator";
import RecipeGenerator from "./components/recipeGenerator";
import ImageGenerator from "./components/imageGenerator";
function App() {
  const [active, setActiveTab] = useState('chat-bot');
  const tabChange = (tab) => {
    // alert(tab);
    setActiveTab(tab);
  }
    return (
      <div className="App">
          <button className={active === 'image-generator' ? 'active' : ''} onClick={() => tabChange('image-generator')}>Image Generator</button>
          <button className={active === 'chat-bot' ? 'active' : ''} onClick={() => tabChange('chat-bot')}>Chat Bot</button>
          <button className={active === 'recipe-generator' ? 'active' : ''} onClick={() => {tabChange('recipe-generator')}}>Recipe Generator</button>

          <div>
              {active === 'chat-bot' && <ChatGenerator/>}
              {active === 'image-generator' && <ImageGenerator/>}
              {active === 'recipe-generator' && <RecipeGenerator/>}
          </div>

      </div>
  );
}

export default App;
