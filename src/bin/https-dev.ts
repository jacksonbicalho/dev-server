// #!/usr/bin/env node

// import { stderr, stdout } from "process";
// import { options as optionProgram  } from "../";
// const path = require("path");
// const fs = require("fs");

// /**
//  * @param {string} command process to run
//  * @param {string[]} args command line arguments
//  * @returns {Promise<void>} promise
// */
// const runCommand = (command: string, args: []) => {
//   const cp = require("child_process");
//   return new Promise((resolve, reject) => {
//     const executedCommand = cp.spawn(command, args, {
//       stdio: "inherit",
//       shell: true,
//     });
//     executedCommand.on("error", (error: any) => {
//       reject(error);
//     });
//     executedCommand.on("exit", (code: number) => {
//       if (code === 0) {

//         resolve(stdout? stdout : stderr);
//       }
//       else {
//         reject();
//       }
//     });
//   });
// };

// const getPath = () => {
//   const dir = path.resolve(process.cwd());
//   const nodeModulesDir = path.join(dir, "node_modules");
//   const packageDir = path.resolve(nodeModulesDir, '@jacksonbicalho/https-dev');
//   const packageJson = path.join(packageDir, "package.json");
//   const data = {
//     dir: dir,
//     nodeModulesDir: nodeModulesDir,
//     packageDir: packageDir,
//     packageJson: packageJson,
//     scripts: JSON.parse(fs.readFileSync(`${packageJson}`, {
//       encoding: "utf8",
//       flag: 'r',
//     })).scripts
//   }

//   return data;
// };


// const data = getPath();
// const args: string[] = process.argv.slice(2);
// const binName: string | undefined = args.shift();
// if (!binName || data.scripts[binName] == undefined) {
//   optionProgram.parse(process.argv);
//   process.exit(1);
// }
// const [programE, moduleLib] = data.scripts[binName].split(' ');
// const packageDirLib: string = path.join(data.packageDir, moduleLib);
// const options: string = args.join(' ');
// runCommand(programE, [packageDirLib, options] as never)
