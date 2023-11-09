import {envConfig} from './env.config'

export const getDefaultConfig = (config?: ConfigType): ConfigType => {
  if (config) {
    return mergeConfig(config)
  }
  return mergeConfig()
}

const DefaultConfig: ConfigType = envConfig;

function mergeConfig(config?: ConfigType): ConfigType {
  return { ...DefaultConfig, ...config } as ConfigType
}
