
type MergeConfigType = {
  [key: string]: unknown
  name: string
}

type ConfigType = Partial<MergeConfigType> & {
  filePathConfig: string
  domain: string
  keysPath: string
  contenPublic: string
}

declare module 'ConfigType' {
  export const ConfigType
}


