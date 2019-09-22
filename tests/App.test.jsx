import React from 'react';
import { render } from '@testing-library/react';
import App from '../src/js/components/App';

describe('App Component', () => {
    test('Renders without error', () => {
        render(<App />);
    });
});