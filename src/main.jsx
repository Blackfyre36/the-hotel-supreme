import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { StyleSheetManager } from 'styled-components'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from './ui/ErrorFallback'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StyleSheetManager shouldForwardProp={prop => prop !== 'position'}>
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.replace("/")}>
      <App />
    </ErrorBoundary>
    </StyleSheetManager>
  </React.StrictMode>
)