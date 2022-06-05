import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './containers/App';
import './styles/vendor.scss';

const element: HTMLElement | null = document.getElementById('app');

if (element) {
  const root = createRoot(element);

  root.render(<App />);
}

console.error('DOM element not found.');
