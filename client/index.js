import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import '../public/index.scss';

const container = document.getElementById('app');
console.log(container);
const root = createRoot(container);
root.render(
<BrowserRouter><App /></BrowserRouter>
);
