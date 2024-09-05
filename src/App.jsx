import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react'
import { Tldraw } from 'tldraw'
import './index.css' // Vite usually has some default styling

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
        <h1>My Zine Canvas</h1>
      </header>

      {/* Main canvas container */}
      <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>

        {/* Container for Tldraw to ensure it layers properly */}
        <div style={{ position: 'fixed', inset: 0 }}>
          <Tldraw />
        </div>
      </div>
    </div>
  )
}

export default App
