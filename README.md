<p align="center">
  <a href="https://badge.fury.io/js/ssldev@0.0.32-dev">
    <img src="https://badge.fury.io/js/ssldev.svg" alt="npm version" height="25">
  </a>&nbsp;
  <a href="https://github.com/jacksonbicalho/ssldev/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="ssldev is released under the MIT license." height="25" />
  </a>&nbsp;
  <a href="https://github.com/jacksonbicalho/ssldev/actions/workflows/tests.yml">
    <img src="https://github.com/jacksonbicalho/ssldev/actions/workflows/tests.yml/badge.svg?branch=working" alt="format and tests" height="25" />
  </a>&nbsp;
</p>


# `ssldev` - Servidor https para ser usado durante desenvolvimento

`ssldev` é uma ferramenta simples de ser usada que resolve principalmente as dificuldades de lidar com desenvolvimento de PWAs.

## Instalação

```bash
npm install --save-dev ssldev
```

Ou

```bash
yarn add --dev ssldev
```

## Comandos

Insira em scripts

```json
  "scripts": {
    "ssldev": "npx ssldev"
  },
```

## Comandos

`ssldev` responde aos seguintes comandos:

| **Opções**     | **Descrição**             |
| :------------- | :------------------------ |
| `-v --version` | output the version number |
| `-h --help`    | display help for command  |

| **Comando**        | **Descrição**            |
| :----------------- | :----------------------- |
| `-v --version`     | Shows the help dialog    |
| `setup`            | generate config file     |
| `start`            | start server https       |
| `mkcert` [options] | generate ssl keys        |
| `help` [command]   | display help for command |

## Importante!

Quando você executar `mkcert`, será obrigado a usar uma senha de sudo.


## Tests

### [COVERAGE.md](COVERAGE.md)
