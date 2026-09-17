/// <reference types="vite/client" />

// Google Analytics 4 gtag.js, loaded via the snippet in index.html.
interface Window {
  dataLayer: unknown[];
  gtag: (...args: unknown[]) => void;
}

declare module "*.mp4" {
  const src: string;
  export default src;
}

declare module "*.MP4" {
  const src: string;
  export default src;
}

declare module "*.webm" {
  const src: string;
  export default src;
}

declare module "*.ogg" {
  const src: string;
  export default src;
}

declare module "*.mov" {
  const src: string;
  export default src;
}

declare module "*.MOV" {
  const src: string;
  export default src;
}
