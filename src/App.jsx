import { useState, useCallback } from 'react'
import './App.css'
import React from 'react'
import { Tldraw, useEditor } from 'tldraw'
import './index.css'
import PromptPanel from './components/PromptPanel'
import { generateZineOutline } from './services/api'
import { createShapesFromOutline } from './utils/tldrawUtils'

function App() {
  const [zineOutline, setZineOutline] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [tldrAwAPI, setTldrAwAPI] = useState(null)

  const handleMount = useCallback((api) => {
    setTldrAwAPI(api)
  }, [])

  const handleGenerate = async (promptData) => {
    setIsLoading(true)
    setError(null)
    try {
      const outline = await generateZineOutline(promptData.theme, promptData.style, promptData.complexity)
      setZineOutline(outline)
      
      if (tldrAwAPI) {
        const shapes = createShapesFromOutline(outline)
        tldrAwAPI.createShapes(shapes)
        tldrAwAPI.zoomToFit()
      }
    } catch (err) {
      setError('Failed to generate zine outline. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="App">
      <div style={{ position: 'fixed', inset: 0 }}>
        <Tldraw
          showMenu={false}
          showPages={false}
          onMount={handleMount}
        />
      </div>

      <div className="prompt-panel-overlay">
        <PromptPanel onGenerate={handleGenerate} isLoading={isLoading} />
      </div>

      {error && <div className="error-message">{error}</div>}
    </div>
  )
}

export default App