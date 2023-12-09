![Coverage Badge](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/jacksonbicalho/1c329f62b9eedff81b4a2dbe31958c3d/raw/ssldev__heads_main.json)


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
