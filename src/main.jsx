import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import StateApp from './context/StateApp'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <StateApp>
        <App />
      </StateApp>
    </BrowserRouter>
  </React.StrictMode>,
)
