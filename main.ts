import {ConfigType, server} from "./src/server";
import fs from "fs";
import path from "path";
import ReadEnv from "./src/utils/read-env";
const DIR_ROOT = path.resolve(__dirname);
ReadEnv();

const publicDomain = process.env.PUBLIC_DOMAIN;
const webPort = process.env.WEB_PORT;
const keys = process.env.keys;


const options = {
  key: fs.readFileSync(path.join(DIR_ROOT, `${keys}`, `${publicDomain}.key.pem`)),
  cert: fs.readFileSync(path.join(DIR_ROOT, `${keys}`, `${publicDomain}.cert.pem`)),
};

const config: ConfigType = {
    contenPublic: path.join(DIR_ROOT, 'public'),
};

const bootstrap = server(options, config);

bootstrap.listen(webPort, () => {
    console.log(`Running at https://${publicDomain}:${webPort}`);
});
