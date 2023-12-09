import { server } from './server';
import fs from 'fs';
import path from 'path';
import { defaultConfig } from './config';

const appConfig = defaultConfig.getAppConfig();

const rootApp = path.resolve(`${appConfig.rootApp}`);
const keysPath = path.resolve(rootApp, appConfig.keysPath);
const publicDomain = appConfig.publicDomain;
const webPort = appConfig.webPort;

const sslFiles: { key: string; cert: string } = {
  key: path.resolve(`${keysPath}`, `${publicDomain}.key.pem`),
  cert: path.resolve(`${keysPath}`, `${publicDomain}.cert.pem`)
};

Object.entries(sslFiles).map((file) => {
  if (!fs.existsSync(file[1])) {
    console.error(`\nfile not found!\n${file[0]}: ${file[1]}`);
    console.warn('\nrun the command:\nyarn mkcert -p [directory] -d [domain]');
    process.exit();
  }
});

const options = {
  key: fs.readFileSync(sslFiles.key),
  cert: fs.readFileSync(sslFiles.cert)
};

const bootstrap = server(options, appConfig);
bootstrap.listen(webPort, () => {
  console.log(`Running at https://${publicDomain}:${webPort}`);
});
