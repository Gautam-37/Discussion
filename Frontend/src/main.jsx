// src/main.jsx
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

const rootNode = document.getElementById('root');
if (!rootNode) {
  throw new Error("Root container not found in index.html!");
}

const root = createRoot(rootNode);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
