#!/usr/bin/env node

import {program} from "commander";
import base64 from "base-64";
import md5 from "md5";
import sha256 from "sha256";

program
    .version("1.0.0")
    .description("A command line tool for quickly encrypting and decrypting text for bug bounties");


program
    .option("-b, --binary-decode <binary-encode-string>", "decode binary encoded input")
    .option("-B, --binary-encode <binary-decode-string>", "binary encode input")
    .option("-H, --hash <hash-string>", "hash input")
    .option("-e, --equal <equal-string>", "highlight output(s) matching string", false)
    .action((str, options, command) => {
        if (options.debug) {
            console.error(`Called ${command.name()} with options ${options}`);
        }
        if (str.binaryEncode) {
            console.log(`Binary Encode - ${str.binaryEncode}`);
            console.log("-------------");

            const str_base64 = base64.encode(str.binaryEncode);
            logToConsole("Base64", str_base64, str.equal);

            console.log("-------------");
            console.log("");
        }
        if (str.binaryDecode) {
            console.log(`Binary Decode - ${str.binaryDecode}`);
            console.log("-------------");

            const str_base64 = base64.decode(str.binaryDecode);
            logToConsole("Base64", str_base64, str.equal);

            console.log("-------------");
            console.log("");
        }
        if (str.hash) {
            console.log(`Hash - ${str.hash}`);

            console.log("-------------");

            const str_md5 = md5(str.hash);
            logToConsole("MD5", str_md5, str.equal);
            const str_sha256 = sha256(str.hash);
            logToConsole("SHA256", str_sha256, str.equal);
            const str_sha256x2 = sha256.x2(str.hash);
            logToConsole("SHA256 (double-hashing)", str_sha256x2, str.equal);

            console.log("-------------");
            console.log("");
        }
    });

const logToConsole = (name, string, equalCompare = false) => {
    if (!equalCompare) {
        console.log(`${name}: ${string}`);
        return;
    }
    if (string != equalCompare) {
        console.log(`${name}: ${string}`);
        return;
    }
    console.log(`>>>> ${name}: ${string} <<<<`);
}

program.parse(process.argv);
