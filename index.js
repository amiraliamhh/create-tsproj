#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const fs_1 = __importDefault(require("fs"));
const devPackages = [
    "typescript",
    "@babel/core",
    "@babel/cli",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/preset-env",
    "@babel/preset-typescript",
    "@babel/polyfill"
];
const commands = {
    npmInit: 'npm init -y',
    installDevPackages: `npm i -D ${devPackages.join(' ')} `,
    tsInit: 'tsc --init --declaration --allowSyntheticDefaultImports --target esnext --outDir dist',
};
const finalCmd = `
  mkdir ${getArg('--name')} &&
  cd ${getArg('--name')} &&
  ${commands.npmInit} && 
  ${commands.installDevPackages}
`;
child_process_1.exec(finalCmd, (err, stdout, stderr) => {
    setupBuildTasks(getArg('--name'));
    console.log(err);
    console.log(stdout);
    console.log(stderr);
});
function getArg(argName) {
    const argNameInd = process.argv.indexOf(argName);
    if (argNameInd > -1 && process.argv[argNameInd + 1]) {
        return process.argv[argNameInd + 1];
    }
    throw new Error('--name argument must be provided.');
}
function setupBuildTasks(foldername) {
    const path = `./${foldername}/package.json`;
    let tasks = require(path);
    let scripts = tasks.scripts;
    const newScripts = Object.assign(scripts, {
        "type-check": "tsc --noEmit",
        "type-check:watch": "npm run type-check -- --watch",
        "build": "npm run build:types && npm run build:js",
        "build:w": "npm run build:types && npm run build:jsw",
        "build:types": "tsc --emitDeclarationOnly",
        "build:js": "babel src --out-dir dist --extensions \".ts,.tsx\" --source-maps inline",
        "build:jsw": "babel src --out-dir dist --extensions \".ts,.tsx\" --source-maps inline --watch",
    });
    tasks.scripts = newScripts;
    fs_1.default.writeFile(path, JSON.stringify(tasks, null, 4), 'utf8', (err) => {
        if (err) {
            console.log(err);
        }
    });
}
const helpers_1 = require("./helpers");
helpers_1.createGitIgnore('amirali');
