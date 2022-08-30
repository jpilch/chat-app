interface ImportMetaEnv {
    readonly VITE_SERVER_URL: string,
    readonly VITE_QC_SERVER_URL: string,
    readonly VITE_USER_AUTH_DATA: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}