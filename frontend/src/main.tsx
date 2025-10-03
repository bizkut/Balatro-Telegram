import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { TWAProvider } from '@twa-dev/sdk-react'

ReactDOM.render(
  <React.StrictMode>
    <TWAProvider>
      <App />
    </TWAProvider>
  </React.StrictMode>,
  document.getElementById('root')
)