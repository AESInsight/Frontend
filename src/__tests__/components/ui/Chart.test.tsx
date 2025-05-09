
import "@testing-library/jest-dom";


// Mock ResizeObserver
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.ResizeObserver = ResizeObserverMock;

describe("Chart Components", () => {
  // ... rest of the tests
});