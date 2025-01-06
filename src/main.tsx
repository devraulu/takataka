import { Container, createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import React from 'react';

const root = createRoot(document.getElementById('root') as Container);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
