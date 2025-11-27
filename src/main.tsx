import React from 'react';
import ReactDOM from 'react-dom/client';
import ClassicNarrativeBuilder from './ClassicNarrativeBuilder';
import './index.css';
import './classic-theme.css';

const container = document.getElementById('root');
if (!container) throw new Error('Root element not found');

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <ClassicNarrativeBuilder />
  </React.StrictMode>
);
