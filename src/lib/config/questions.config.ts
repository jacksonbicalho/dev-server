import path from 'path';
import { PromptObject } from 'prompts';
import { defaultConfig } from './default.config';
import { fileExists } from '../../utils';

const config = defaultConfig.getDefaultConfig();

type DefaultQuestionsType = {
  msg?: string;
} & PromptObject;



const checkConfigFileExist = () => {
  const appDir = process.env.INIT_CWD;
  const configFileName = ['https.config.js', 'https.config.json'];
  const fileExist = configFileName.filter((file) =>
    fileExists(path.resolve(`${appDir}`, file))
  );
  const choices: { title: string; value: number }[] = [{
    title: 'excluir os arquivos e criar nova configuração',
    value: 0
  }];
  fileExist.map(
    (file: string, index) => (
      (choices.push({title: `Manter este arquivo ${file} ?`, value: index+1}))
    )
  )
  return {fileExist, choices};
};

const {fileExist, choices} = checkConfigFileExist();


export const Questions = async (): Promise<DefaultQuestionsType[]> => [
  {
    choices: choices,
    initial: 0,
    message:
      fileExist.length > 0
        ?
`Você já possui arquivos de configuração em sua aplicação'\n
Arquivos encontrados: [${fileExist.join(' | ')}]\n
Para continuar é pnecessário selenar uma das opções:`
        :
        '',
    name: 'checkConfigFileExist',
    type: fileExist.length > 0 ? 'select' : null,
  },

  {
    type: 'toggle',
    name: 'createConfig',
    initial: 'yes',
    inactive: 'no',
    active: 'yes',
    message: `By default we need to create a configuration file.\n
    Let's continue? [Y/n]`
  },
  {
    choices: [
      { title: 'Default', value: 'd' },
      { title: 'Custon', value: 'c' }
    ],
    initial: 0,
    message: 'You can use a default configuration or customize it?',
    name: 'custonOrDefault',
    type: 'select'
  },
  {
    type: (prev) => (prev == 'd' ? 'confirm' : null),
    name: 'confirmDefault',
    initial: true,
    message: () =>
      `Você confirma a criação do arquivo de configuração com os dados acima? [n/Y]?`
  },
  {
    choices: [
      { title: 'java script', value: 'js' },
      { title: 'JSON', value: 'json' }
    ],
    initial: 0,
    message: 'Qual modelo de arquivo deseja criar ?',
    name: 'fileType',
    type: 'select',
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
  message: 'vamos criar o arquivo a configuração? [n/Y]',
  name: 'createConfig',
  type: 'confirm'
};
