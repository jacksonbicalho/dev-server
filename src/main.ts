import { server } from './server';
import fs from 'fs';
import path from 'path';
import { defaultConfig } from './lib/config';

const appConfig = defaultConfig.getAppConfig();
const DIR_ROOT = path.resolve(`${appConfig.rootApp}`);

const publicDomain = appConfig.publicDomain;
const contenPublic = appConfig.contenPublic;
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

const config: any = {
  contenPublic: path.join(DIR_ROOT, `${contenPublic}`)
};

const bootstrap = server(options, config);
bootstrap.listen(webPort, () => {
  console.log(`Running at https://${publicDomain}:${webPort}`);
});
