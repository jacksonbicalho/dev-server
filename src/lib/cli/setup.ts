#! /usr/bin/env node --harmony

import { defaultConfig, Questions } from '../config';
import prompts from 'prompts';
import { writeConfigJs } from '../config/write-file.config';

(async () => {
  const questions = await Questions();
  const answers = await prompts(questions, {
    onSubmit(prompt, answer) {
      if (prompt.name == 'createConfig' && answer == false) {
        this.onCancel;
      }
    },
    onCancel: () => console.warn('Bye!')
  });

  const config = defaultConfig.getDefaultConfig(Object.assign(answers));
  if (config.fileType == 'js') {
    writeConfigJs(config);
  }
})();

// // export const writeConfigJson = (answers: prompts.Answers<string>) => {
// //   delete answers.fileType;
// //   const answersJson = JSON.stringify(answers, null, 2);
// //   const file = path.resolve(`${answers.keysPath}`, answers.fileName);
// //   let fileContent = `const config = ${JSON.stringify(answers, null, 2)};\nmodule.exports = config;`
// //   Object.keys(answers).map((key) => {
// //     fileContent = fileContent.replace(`"${key}"`, key)
// //   });
// //   console.log('[2023-11-11 21:49:35] >>>>> fileContent: ', fileContent);
// //   // writeFile(`${file}`, `${answersJson}`);
// // };

// const setup = async () => {
//   const questions = await Questions();
//   const answers = await prompts(questions);
//   const template = `
//   import {getDefaultConfig} from './src/lib/config';
//   export default async function () {
//   const config = getDefaultConfig(#DATA#)
//     return config
//   }
// `;
//   const file = path.resolve(`${config.rootApp}`, answers.fileName);
//   if (answers.fileType == 'js') {
//     let fileContent = template.replace(
//       '#DATA#',
//       `${JSON.stringify(answers, null, 4)}`
//     );
//     Object.keys(answers).map((key) => {
//       fileContent = fileContent.replace(`"${key}"`, key);
//     });
//     writeFile(`${file}`, `${fileContent}`);
//     runCommand('prettier', ['--config .prettierrc', `${file}`, '--write'] as never);
//   }
// };

// setup();
