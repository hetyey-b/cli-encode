#!/usr/bin/env node

import {program} from "commander";
import base64 from "base-64";

program
    .version("1.0.0")
    .description("A command line tool for quickly encrypting and decrypting text for bug bounties");

program
    .option("-b, --binary-decode", "decode binary encoded input")
    .argument("<string>", "string to decode")
    .action((str, options, command)  => {
        if (options.debug) {
            console.error(`Called ${command.name()} with options ${options}`);
        }
        console.log(`Base64: ${base64.decode(str)}`)
    });

program.parse(process.argv);
