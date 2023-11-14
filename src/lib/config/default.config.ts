import path from 'path';

const defaultConfigBase: ConfigType = {
  fileType: 'js' || 'json' || undefined,
  fileName: 'https.config.js' || 'https.config.json' || 'string',
  rootApp: process.env.PWD || __dirname,
  publicDomain: process.env.PUBLIC_DOMAIN || 'localhost',
  contenPublic: process.env.CONTEN_PUBLIC || 'public',
  webPort: process.env.WEB_PORT || 8888,
  keysPath: process.env.KEYS_PATH || 'ssl',
  renderSingle: false,
  cleanUrls: [
    "/**",
  ],
  rewrites: [
    { source: "app/**", destination: "/index.html" },
  ],
};

class DefaultConfig {
  private readonly wrappedConfig: ConfigType;

  public constructor(config?: ConfigType) {
    this.wrappedConfig = config ?? defaultConfigBase;
  }

  public to_JSON(): JSON {
    const config = JSON.stringify(this.wrappedConfig, null, 2);
    return JSON.parse(config);
  }

  public to_Array(): ConfigType {
    return Object.entries(this.wrappedConfig) as never;
  }

  private mergeConfig(config?: ConfigType): ConfigType {
    return { ...defaultConfigBase, ...config };
  }

  public getDefaultConfig(config?: ConfigType): ConfigType {
    if (config) {
      return this.mergeConfig(config);
    }
    return this.mergeConfig();
  }

  public getAppConfig(): ConfigType {
    const appConfiguration = this.getDefaultConfig(this.wrappedConfig);
    const appFile = path.resolve(
      `${appConfiguration.rootApp}`,
      appConfiguration.fileName
    );
    return require(appFile);
  }
}

export const defaultConfig = new DefaultConfig(defaultConfigBase);
