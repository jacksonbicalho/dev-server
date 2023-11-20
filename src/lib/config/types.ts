interface IConfigType {
  rootApp?: string;
  fileType?: 'json' | 'js' | undefined;
  fileName: 'https.config.js' | 'https.config.json' | string;
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

declare module '@config' {
  export type ConfigType = IConfigType;
  export type ConfirmSetupType = IConfirmSetupType;
}
