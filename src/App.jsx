import React, { useState } from 'react'
import { Tldraw } from '@tldraw/tldraw'
import '@tldraw/tldraw/tldraw.css'
import './App.css'
import { ZinePageLayoutUtil } from './utils/tldrawUtils.jsx';
import ZineEditor from './components/ZineEditor'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.log('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>
    }

    return this.props.children
  }
}

function TldrawWrapper() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  return (
    <Tldraw
      shapeUtils={[ZinePageLayoutUtil]}
    >
      <ZineEditor
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setError={setError}
      />
      {error && <div className="error-message">{error}</div>}
    </Tldraw>
  )
}

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <div style={{ position: 'fixed', inset: 0 }}>
          <TldrawWrapper />
        </div>
      </ErrorBoundary>
    </div>
  )
}

export default App