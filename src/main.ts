import { server } from './server';
import fs from 'fs';
import path from 'path';
import { defaultConfig } from './lib/config';

const appConfig = defaultConfig.getAppConfig();
console.log('[2023-11-14 10:10:41] >>>>> appConfig: ', appConfig);

const DIR_ROOT = path.join(`${appConfig.rootApp?.split('/')}`);

const publicDomain = appConfig.publicDomain;
const webPort = appConfig.webPort;
const keys = appConfig.keysPath;

const files: { key: string; cert: string } = {
  key: path.join(DIR_ROOT, `${keys}`, `${publicDomain}.key.pem`),
  cert: path.join(DIR_ROOT, `${keys}`, `${publicDomain}.cert.pem`)
};

Object.entries(files).map((file) => {
  if (!fs.existsSync(file[1])) {
    console.error(`\nfile not found!\n${file[0]}: ${file[1]}`);
    console.warn('\nrun the command:\nyarn newcert -p [directory] -d [domain]');
    process.exit();
  }
});

const options = {
  key: fs.readFileSync(files.key),
  cert: fs.readFileSync(files.cert)
};

const bootstrap = server(options, appConfig);
bootstrap.listen(webPort, () => {
  console.log(`Running at https://${publicDomain}:${webPort}`);
});
