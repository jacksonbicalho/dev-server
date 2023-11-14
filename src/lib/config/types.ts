type mergeConfigType = {
  [key: string]: unknown;
  name: string;
};

type configType = {
  rootApp?: string;
  fileType?: 'json' | 'js' | undefined;
  fileName: 'https.config.js' | 'https.config.json' | string;
  publicDomain: string;
  contenPublic: string;
  webPort: string | number;
  keysPath: string;
};

type confirmSetupType = {
  createConfig: boolean;
};

declare module '@config/type' {
  export type config = configType;
  export type createConfig = confirmSetupType;
}
