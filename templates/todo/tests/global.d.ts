export {};

declare global {
  namespace PlaywrightTest {
    interface Matchers<R> {
      toBeOpen(): R;
    }
  }
}
