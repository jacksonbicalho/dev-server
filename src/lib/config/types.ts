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
