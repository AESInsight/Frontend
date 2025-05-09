import '@testing-library/jest-dom';

// Mock TextEncoder and TextDecoder
class TextEncoderMock {
  encode(str: string): Uint8Array {
    return new Uint8Array([...str].map(c => c.charCodeAt(0)));
  }
}

class TextDecoderMock {
  decode(bytes: Uint8Array): string {
    return String.fromCharCode(...bytes);
  }
}

// Add TextEncoder and TextDecoder to global object
global.TextEncoder = TextEncoderMock as any;
global.TextDecoder = TextDecoderMock as any;

// Mock ResizeObserver
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.ResizeObserver = ResizeObserverMock; 