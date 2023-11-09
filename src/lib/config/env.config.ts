export const envConfig: ConfigType = {
  fileType: 'json' || 'js' || undefined,
  fileName: 'https.config.js' || 'https.config.json' || 'string',
  rootApp: process.env.PWD || __dirname,
  publicDomain: process.env.PUBLIC_DOMAIN || "localhost",
  contenPublic: process.env.CONTEN_PUBLIC || "public",
  webPort: process.env.WEB_PORT || 8888,
  keysPath: process.env.KEYS_PATH || "ssl",
};
