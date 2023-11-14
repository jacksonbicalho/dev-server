import { config } from '@config/type';
import path from 'path';

const defaultConfigBase: config = {
  fileType: 'js' || 'json' || undefined,
  fileName: 'https.config.js' || 'https.config.json' || 'string',
  rootApp: process.env.PWD || __dirname,
  publicDomain: process.env.PUBLIC_DOMAIN || 'localhost',
  contenPublic: process.env.CONTEN_PUBLIC || 'public',
  webPort: process.env.WEB_PORT || 8888,
  keysPath: process.env.KEYS_PATH || 'ssl'
};

class DefaultConfig {
  private readonly wrappedConfig: config;

  public constructor(config?: config) {
    this.wrappedConfig = config ?? defaultConfigBase;
  }

  public to_JSON(): JSON {
    const config = JSON.stringify(this.wrappedConfig, null, 2);
    return JSON.parse(config);
  }

  public to_Array(): [string, string | number | undefined][] {
    return Object.entries(this.wrappedConfig);
  }

  private mergeConfig(config?: config): config {
    return { ...defaultConfigBase, ...config };
  }

  public getDefaultConfig(config?: config): config {
    if (config) {
      return this.mergeConfig(config);
    }
    return this.mergeConfig();
  }

  public getAppConfig(): config {
    const appConfiguration = this.getDefaultConfig();
    const appConfig = require(path.resolve(`${appConfiguration.rootApp}`, appConfiguration.fileName))
    return appConfig;
  }
}

export const defaultConfig = new DefaultConfig(defaultConfigBase);
