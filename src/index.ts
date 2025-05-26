import yargs from "yargs";
import prng from "./prng";

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
    .demandCommand(1, "You need at least one command before moving on")
    .help();