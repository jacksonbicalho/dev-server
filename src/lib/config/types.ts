type ConfigType = {
  rootApp?: string;
  fileType?: 'json' | 'js' | undefined;
  fileName: 'https.config.js' | 'https.config.json' | string;
  publicDomain: string;
  contenPublic: string;
  webPort: string | number;
  keysPath: string;
  renderSingle?: boolean | undefined;
  cleanUrls?: boolean | string[];
  rewrites: { source: string, destination: string }[],
};

type confirmSetupType = {
  createConfig: boolean;
};

declare module '@config/type' {
  export type config = ConfigType;
  export type createConfig = confirmSetupType;
}
