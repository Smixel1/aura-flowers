/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly SITE_URL?: string;
  readonly SITE_DEV_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
