#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const msgs_1 = require("./msgs");
const helpers_1 = require("./helpers");
let loadInterval;
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
    makeSrc: 'mkdir src',
    createSampleIndex: 'cd src && touch index.ts'
};
child_process_1.exec(finalCmd(), (err, stdout, stderr) => {
    clearInterval(loadInterval);
    if (err) {
        console.error(err);
        process.exit();
    }
    loadInterval = msgs_1.loader('creating build tasks');
    helpers_1.setupBuildTasks(helpers_1.repoName(process.argv))
        .then(() => {
        clearInterval(loadInterval);
        if (!helpers_1.hasArg('--no-tslint')) {
            loadInterval = msgs_1.loader('creating tslint file');
            helpers_1.addTslint(helpers_1.repoName(process.argv))
                .then(() => {
                clearInterval(loadInterval);
            })
                .catch(console.error);
        }
        if (!helpers_1.hasArg('--no-gitignore')) {
            let loadInt = msgs_1.loader('creating gitignore file');
            helpers_1.createGitIgnore(helpers_1.repoName(process.argv))
                .then(() => {
                clearInterval(loadInt);
            })
                .catch(console.error);
        }
    })
        .catch(console.error);
});
function finalCmd() {
    loadInterval = msgs_1.loader('initiating package.json');
    const cmdArr = [
        `mkdir ${helpers_1.repoName(process.argv)}`,
        `cd ${helpers_1.repoName(process.argv)}`,
        `${commands.npmInit}`,
        `${commands.installDevPackages}`
    ];
    return cmdArr.join(' && ');
}
