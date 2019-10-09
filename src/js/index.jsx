// Import SCSS so they get compiled
import '../scss/styles.scss';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

// Check for Web Accessibility issues in development mode
if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line global-require, import/no-extraneous-dependencies
    const axe = require('react-axe');
    // Check the console for any accessibility issues
    axe(React, ReactDOM, 1000);
}

ReactDOM.render(<App />, document.getElementById('app'));

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js');
    });
}