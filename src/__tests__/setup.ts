import { expect } from 'bun:test';

// Create a minimal DOM environment
const div = document.createElement('div');
div.setAttribute('id', 'root');
document.body.appendChild(div);

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: mock.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: mock.fn(),
    removeListener: mock.fn(),
    addEventListener: mock.fn(),
    removeEventListener: mock.fn(),
    dispatchEvent: mock.fn(),
  })),
});

// Make expect available globally
global.expect = expect; 