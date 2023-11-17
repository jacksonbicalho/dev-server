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
      if (prompt.name == 'custonOrDefault' && answer == 'd') {
        const configs = Object.entries(defaultConfig.getDefaultConfig())
        console.log('Confira a lista de configurações padrão:\n');
        configs.map((config) => console.log(`${config[0]}: ${config[1]}\n`))
      }
      if (prompt.name == 'confirmDefault' && answer) {
        if (config.fileType == 'js') {
          writeConfigJs(config);
        }
      }

    },
    onCancel: () => console.warn('Bye!')
  });

  const config = defaultConfig.getDefaultConfig(Object.assign(answers));
  if (config.fileType == 'js') {
    writeConfigJs(config);
  }
})();
