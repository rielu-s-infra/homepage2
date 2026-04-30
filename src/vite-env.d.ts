// src/vite-env.d.ts
interface ImportMetaEnv {
  readonly VITE_GITHUB_USERNAME: string;
  readonly VITE_KUMA_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}