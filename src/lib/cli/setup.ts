#! /usr/bin/env node --harmony

import { defaultConfig, Questions, writeConfigJs } from '../config';
import { prompts, kleur } from '../../utils';

class ConfigTable {
  constructor(
    readonly config: string,
    readonly value: unknown
  ) {
    this.config = config;
    this.value = value;
  }
}

(async () => {
  const questions = await Questions();

  const answers = await prompts(questions, {
    onSubmit(prompt, answer) {
      if (prompt.name == 'createConfig' && answer == false) {
        this.onCancel;
      }
      if (prompt.name == 'custonOrDefault' && answer == 'd') {
        const configs = defaultConfig.getDefaultConfig();
        const { padKey, padValue } = defaultConfig.padConfig();

        const table: [] = [];
        Object.entries(configs).map((conf) => {
          return table.push(
            // @ts-expect-error:next-line
            new ConfigTable(
              conf[0].toString().padStart(0, ' ').padEnd(padKey),
              JSON.stringify(conf[1]).toString().padEnd(padValue)
            )
          );
        });
        console.log(
          kleur
            .bold()
            .italic()
            .red()
            .bgWhite(
              '\t\nConfira a lista de configurações que serão usadas no seu arquivo:\n'
            )
        );
        console.table(table);
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
