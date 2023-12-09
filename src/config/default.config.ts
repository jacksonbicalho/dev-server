import { fileExists, path } from '../utils';

interface IConfigType {
  rootApp?: string;
  fileType?: 'json' | 'js' | undefined;
  fileName: 'https.config.js' | 'https.config.json';
  publicDomain: string;
  contenPublic: string;
  webPort: string | number;
  keysPath: string;
  renderSingle?: boolean | undefined;
  cleanUrls?: boolean | string[];
  rewrites: { source: string; destination: string }[];
}

interface IConfirmSetupType {
  createConfig: boolean;
}

export type ConfigType = IConfigType;
export type ConfirmSetupType = IConfirmSetupType;

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
  fileType: 'js' || 'json',
  fileName: 'https.config.js' || 'https.config.json',
  rootApp: process.env.PWD || __dirname,
  publicDomain: 'localhost',
  contenPublic: 'public',
  webPort: 8888,
  keysPath: 'ssl',
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

    let appConfig = JSON.parse(JSON.stringify(defaultConfigBase));

    if (fileExists(appFile)) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      appConfig = require(appFile);
    }
    appConfig = JSON.parse(JSON.stringify(this.getDefaultConfig(appConfig)));

    return typeof appConfig == 'object'
      ? appConfig
      : JSON.parse(JSON.stringify(appConfig));
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
