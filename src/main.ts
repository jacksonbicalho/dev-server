import { server } from "./server";
import fs from "fs";
import path from "path";
import ReadEnv from "./utils/read-env";
const initCwd: string[] = process.env.INIT_CWD?.split("/") ?? [path.resolve(__dirname, "..")];
const DIR_ROOT = path.resolve(`${initCwd}`, "..");
ReadEnv();

const publicDomain = process.env.PUBLIC_DOMAIN;
const contenPublic = process.env.CONTEN_PUBLIC;
const webPort = process.env.WEB_PORT;
const keys = process.env.keys;

const files: { key: string; cert: string } = {
  key: path.join(DIR_ROOT, `${keys}`, `${publicDomain}.key.pem`),
  cert: path.join(DIR_ROOT, `${keys}`, `${publicDomain}.cert.pem`),
};

Object.entries(files).map((file) => {
  if (!fs.existsSync(file[1])) {
    console.error(`\nfile not found!\n${file[0]}: ${file[1]}`);
    console.warn("\nrun the command:\nyarn newcert -p [directory] -d [domain]");
    process.exit();
  }
});

const options = {
  key: fs.readFileSync(files.key),
  cert: fs.readFileSync(files.cert),
};

const config: any = {
  contenPublic: path.join(DIR_ROOT, `${contenPublic}`),
};

const bootstrap = server(options, config);
bootstrap.listen(webPort, () => {
  console.log(`Running at https://${publicDomain}:${webPort}`);
});
