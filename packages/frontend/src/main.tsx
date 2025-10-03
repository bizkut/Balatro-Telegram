import React from 'react';
import ReactDOM from 'react-dom/client';
import { TWAProvider } from '@twa-dev/sdk-react';
import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TWAProvider>
      <App />
    </TWAProvider>
  </React.StrictMode>,
);