import React, { useState } from 'react'

function PromptPanel({ isLoading, onGenerate }) {
  const [theme, setTheme] = useState('')
  const [style, setStyle] = useState('')
  const [complexity, setComplexity] = useState(5)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (typeof onGenerate === 'function') {
      onGenerate({ theme, style, complexity })
    } else {
      console.error('onGenerate is not a function')
    }
  }

  return (
    <div className="prompt-panel-overlay">
      <div className="prompt-panel">
        <h2>Generate Zine Outline</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="theme">Theme:</label>
            <input
              type="text"
              id="theme"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="style">Style:</label>
            <input
              type="text"
              id="style"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="complexity">Complexity (1-10):</label>
            <input
              type="range"
              id="complexity"
              min="1"
              max="10"
              value={complexity}
              onChange={(e) => setComplexity(Number(e.target.value))}
              required
            />
          </div>
          <button type="submit" disabled={isLoading === true}>
            {isLoading ? 'Generating...' : 'Generate Outline'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default PromptPanel