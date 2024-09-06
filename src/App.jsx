import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react'
import { Tldraw } from 'tldraw'
import './index.css' // Vite usually has some default styling
import PromptPanel from './components/PromptPanel'  // Corrected import path

function App() {
  const [zineData, setZineData] = useState(null);

  const handleGenerate = (promptData) => {
    console.log("Generating zine with:", promptData);
    // TODO: Implement actual zine generation and update zineData state
  };

  return (
    <div className="App">
      {/* Fullscreen canvas container */}
      <div style={{ position: 'fixed', inset: 0 }}>
        <Tldraw showMenu={false} showPages={false} />
      </div>

      {/* PromptPanel overlay */}
      <div className="prompt-panel-overlay">
        <PromptPanel onGenerate={handleGenerate} />
      </div>
    </div>
  )
}

export default App