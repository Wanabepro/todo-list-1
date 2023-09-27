import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

import App from './components/app'

import './index.css'

const root = ReactDOM.createRoot(document.querySelector('.todoapp'))
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)
