import path from "path";

const { program } = require("@commander-js/extra-typings");
const { execFile } = require("child_process");

const publicDomain = process.env.PUBLIC_DOMAIN;
export const options = program
.option("-d, --domain <string>", "specified domain", publicDomain)
.option("-p, --path <string>", "specified path", "ssl")
.parse()
.opts();

const mkcert = () => {
  const mkcertSh = path.resolve(__dirname, 'newcert.sh');
  execFile(
    `${mkcertSh}`,
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
module.exports = mkcert();
