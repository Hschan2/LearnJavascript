/// <reference types="vite/client" />

declare global {
  interface Window {
    Kakao: typeof import("kakao-js-sdk");
  }
}