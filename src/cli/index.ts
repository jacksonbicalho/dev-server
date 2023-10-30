import path from "path";
import ReadEnv from "../utils/read-env";

const { program } = require("@commander-js/extra-typings");
const { execFile } = require("child_process");
ReadEnv();

const publicDomain = process.env.PUBLIC_DOMAIN;
export const options = program
.option("-d, --domain <string>", "specified domain", publicDomain)
.option("-p, --path <string>", "specified path", "ssl")
.parse()
.opts();

const Cli = () => {
  const newcert = path.resolve(__dirname, 'newcert.sh');
  execFile(
    `${newcert}`,
    [options.domain, options.path],
    // @ts-ignore: Unreachable code error
    (error, stdout, stderr) => {
      if (error) {
        throw error;
      }
      if (stderr) {
        console.warn(stderr);
      }
      console.log(stdout);
    }
  );
};
module.exports = Cli();
