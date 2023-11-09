
type MergeConfigType = {
  [key: string]: unknown
  name: string
}

type ConfigType = {
  fileType: 'json' | 'js' | undefined
  fileName: 'https.config.js' | 'https.config.json' | string
  rootApp:string
  publicDomain:string
  contenPublic:string
  webPort:string | number
  keysPath:string
}

declare module 'ConfigType' {
  export const ConfigType
}


