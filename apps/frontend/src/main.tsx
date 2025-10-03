import React from 'react'
import ReactDOM from 'react-dom/client'
import { TwaWebAppProvider } from '@twa-dev/sdk-react'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TwaWebAppProvider>
      <App />
    </TwaWebAppProvider>
  </React.StrictMode>,
)