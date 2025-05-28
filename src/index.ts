import yargs from "yargs";
import prng from "./prng";
import cipher from "./cipher";
import decipher from "./decipher";

const input = {
  alias: "i",
  type: "string",
  demandOption: true,
} as const;

const output = {
  alias: "o",
  type: "string",
  demandOption: true,
} as const;

const { argv } = yargs
    .options({})
    .command({
        command: 'prng',
        describe: 'Generar un número aleatorio',
        handler: ({ type, size, min, max, encoding }) => {
            console.log(prng(type, size, min, max, encoding))
        },
        builder: {
            type: {
                choices: ["bytes", "int", "uuid"] as const,
                description: '',
                demandOption: true
            },
            size: {
                alias: 's',
                description: 'Tamaño de la aleatoriedad',
                default: 16
            },
            max: {
                type: "number",
                default: 100,
            },
            min: {
                type: "number",
                default: 0,
            },
            encoding: {
                alias: 'enc',
                choices: ["ascii", "utf-8", "utf8", "utf16le", "utf-16le", "ucs2", "ucs-2", "base64", "base64url", "latin1", "binary", "hex"] as const,
            }
        }
    })
    .command({
    command: "cipher",
    describe: "Encrypt a file",
    handler: ({ password, salt, size, input, output }) => {
      cipher(password, salt, size, input, output);
    },
    builder: {
      password: {
        alias: "p",
        description: "The password to encrypt the file with",
        type: "string",
      },
      salt: {
        description: "The salt to encrypt the file with",
        type: "string",
      },
      size: {
        choices: [128, 192, 256] as const,
        description: "The size of the key",
        default: 128,
      },
      input: {
        ...input,
        description: "The file to encrypt",
      },
      output: {
        ...output,
        description: "The file to output the encrypted file to",
      },
    },
  })
  .command({
    command: "decipher",
    describe: "Decrypt a file",
    handler: ({ password, salt, size, input, output }) => {
      decipher(password, salt, size, input, output);
    },
    builder: {
      password: {
        alias: "p",
        description: "The password to decrypt the file with",
        type: "string",
      },
      salt: {
        description: "The salt to decrypt the file with",
        type: "string",
      },
      size: {
        choices: [128, 192, 256] as const,
        description: "The size of the key",
        default: 128,
      },
      input: {
        ...input,
        description: "The file to decrypt",
      },
      output: {
        ...output,
        description: "The file to output the decrypted file to",
      },
    },
  })

    .demandCommand(1, "You need at least one command before moving on")
    .help();