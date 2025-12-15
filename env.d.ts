/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  // adicione outras variáveis de ambiente se houver
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
