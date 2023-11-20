import { ConfigType } from '@config';
import { path } from '../../utils';

type isObjectArrayType =
  | string
  | number
  | boolean
  | string[]
  | {
      source: string;
      destination: string;
    }[];

const defaultConfigBase: ConfigType = {
  fileType: 'js' || 'json' || undefined,
  fileName: 'https.config.js' || 'https.config.json' || 'string',
  rootApp: process.env.PWD || __dirname,
  publicDomain: process.env.PUBLIC_DOMAIN || 'localhost',
  contenPublic: process.env.CONTEN_PUBLIC || 'public',
  webPort: process.env.WEB_PORT || 8888,
  keysPath: process.env.KEYS_PATH || 'ssl',
  renderSingle: false,
  cleanUrls: ['/**'],
  rewrites: [{ source: 'app/**', destination: '/index.html' }]
};

class DefaultConfig {
  private readonly wrappedConfig: ConfigType;

  public constructor(config?: ConfigType) {
    this.wrappedConfig = config ?? defaultConfigBase;
  }

  public toJSON(): JSON {
    const config = JSON.stringify(this.wrappedConfig, null, 2);
    return JSON.parse(config);
  }

  public toArray(): ConfigType {
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

  public isObjectArray = (str: isObjectArrayType): string | string[] => {
    const strConvert: string[] = [''];
    if (Array.isArray(str)) {
      const isObjectArray =
        str.length > 0 && str.every((value) => typeof value === 'object');
      if (isObjectArray) {
        str.map((o) => strConvert.push(JSON.stringify(o)));
        return strConvert;
      }
    }

    return str.toString();
  };

  public padConfig(): { padKey: number; padValue: number } {
    const config = this.getDefaultConfig();

    const key = Object.entries(config)
      .map((conf) => conf[0].length)
      .sort()
      .shift();

    const value = Object.values(this.toArray())
      .reduce((longest, currentWord) => {
        longest = this.isObjectArray(longest);
        currentWord = this.isObjectArray(currentWord);
        return currentWord.length > longest.length ? currentWord : longest;
      }, '')
      .toString().length;

    return {
      padKey: key ?? 0,
      padValue: value
    };
  }
}

export const defaultConfig = new DefaultConfig(defaultConfigBase);
