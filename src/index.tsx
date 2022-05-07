import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '@components/App';
import './styles/vendor.scss';

const element = document.getElementById('app') as HTMLElement;
const root = createRoot(element);

root.render(<App />);
