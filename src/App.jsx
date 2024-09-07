import React, { useState, useCallback } from 'react'
import { Tldraw, useEditor} from 'tldraw'
import './App.css'
import PromptPanel from './components/PromptPanel'
import { generateZineOutline } from './services/api'
import { createShapesFromOutline, ZinePageShapeUtil } from './utils/tldrawUtils.jsx'

const customShapeUtils = [ZinePageShapeUtil()]

function App() {
  const [zineOutline, setZineOutline] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [editor, setEditor] = useState(null)

  const handleMount = useCallback((editor) => {
    console.log('Editor mounted:', editor)
    setEditor(editor)
  }, [])

  const handleGenerate = async (promptData) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await generateZineOutline(promptData.theme, promptData.style, promptData.complexity)
      console.log('Full API response:', response)
      
      if (response && response.content && Array.isArray(response.content)) {
        const textContent = response.content.find(item => item.type === 'text')
        if (textContent && textContent.text) {
          setZineOutline(textContent.text)
          
          if (editor) {
            const shapes = createShapesFromOutline(textContent.text)
            
            // Get all existing shape ids
            const existingShapeIds = editor.getCurrentPageShapeIds()
            console.log('Existing shape IDs:', existingShapeIds)
            
            // Create an array of shape updates to remove all existing shapes
            let removeShapes = []
            if (Array.isArray(existingShapeIds)) {
              removeShapes = existingShapeIds.map(id => ({ id, type: 'zine-page', isDeleted: true }))
            } else if (existingShapeIds && typeof existingShapeIds === 'object') {
              removeShapes = Object.keys(existingShapeIds).map(id => ({ id, type: 'zine-page', isDeleted: true }))
            }
            
            // Combine the remove and create operations
            const shapeUpdates = [...removeShapes, ...shapes]
            
            // Update shapes in a single operation
            editor.updateShapes(shapeUpdates)
            
            // Adjust the camera
            const currentOptions = editor.getCameraOptions()
            editor.setCameraOptions({
              ...currentOptions,
              constraints: {
                ...currentOptions.constraints,
                initialZoom: 'fit-max',
                baseZoom: 'fit-max',
                padding: { x: 50, y: 50 },
                behavior: { x: 'contain', y: 'contain' },
              },
            })
  
            // Reset the camera to apply the new options
            try {
              const currentCamera = editor.getCamera()
              if (currentCamera && typeof currentCamera.x === 'number' && typeof currentCamera.y === 'number') {
                editor.setCamera(currentCamera, { reset: true })
              } else {
                // If the camera is not available or invalid, use a default position
                editor.setCamera({ x: 0, y: 0, z: 1 }, { reset: true })
              }
            } catch (cameraError) {
              console.error('Error setting camera:', cameraError)
              // Fallback: try to zoom to fit without setting the camera explicitly
              editor.zoomToFit()
            }
            
            // Ensure the editor re-renders
            editor.updateRenderingBounds()
          }
        } else {
          throw new Error('No text content found in the response')
        }
      } else {
        throw new Error('Unexpected API response structure')
      }
    } catch (err) {
      console.error('Error in handleGenerate:', err)
      setError('Failed to generate zine outline. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="App">
      <div style={{ position: 'fixed', inset: 0 }}>
        <Tldraw
          shapeUtils={customShapeUtils}
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