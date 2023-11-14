import path from 'path';
import { PromptObject } from 'prompts';
import { defaultConfig } from './default.config';

const config = defaultConfig.getDefaultConfig();

type DefaultQuestionsType = {
  msg?: string;
} & PromptObject;

export const Questions = async (): Promise<DefaultQuestionsType[]> => [
  {
    type: 'toggle',
    name: 'createConfig',
    initial: 'yes',
    inactive: 'no',
    active: 'yes',
    message:
      'Por padrão precisamos criar um arquivo de configuração,\nVamos continuar? [Y/n]'
  },
  {
    choices: [
      { title: 'java script', value: 'js' },
      { title: 'JSON', value: 'json' }
    ],
    initial: 0,
    message: 'Qual modelo de arquivo deseja criar ?',
    name: 'fileType',
    type: 'select'
  },
  {
    initial: (prev) => `https.config.${prev}`,
    message: 'qual o nomde do arquivo deseja usar ?',
    name: 'fileName',
    type: 'text'
  },
  {
    initial: 'localhost',
    message: 'qual o nomde do domínio deseja usar ?',
    name: 'publicDomain',
    type: 'text'
  },
  {
    name: 'keysPath',
    type: 'text',
    message: 'qual o caminho para armazenar as chaves ssl ?',
    initial: path.join(`${config.rootApp}`, 'ssl')
  },
  {
    initial: '8088',
    message: 'qual porta vamos usar',
    name: 'webPort',
    type: 'text'
  }
];

export const confirm: PromptObject = {
  initial: true,
  message: 'vamos criar o arquivo a configuração? [Y/n]',
  name: 'createConfig',
  type: 'confirm'
};
