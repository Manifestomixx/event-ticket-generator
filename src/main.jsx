import { StrictMode } from 'react'
import LayoutWrapper from './layouts/LayoutWrapper.jsx'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <LayoutWrapper>
      <App />
    </LayoutWrapper>
    </BrowserRouter>
  </StrictMode>,
)
