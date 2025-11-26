import React from 'react';
import ReactDOM from 'react-dom/client';
import ClinicalNarrativeBuilder from './ClinicalNarrativeBuilder';
import './index.css';

const container = document.getElementById('root');
if (!container) throw new Error('Root element not found');

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <ClinicalNarrativeBuilder />
  </React.StrictMode>
);
