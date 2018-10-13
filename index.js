#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const helpers_1 = require("./helpers");
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
    helpers_1.setupBuildTasks(helpers_1.repoName(process.argv));
    if (!helpers_1.hasArg('--no-tslint')) {
        helpers_1.addTslint(helpers_1.repoName(process.argv));
    }
    if (!helpers_1.hasArg('--no-gitignore')) {
        helpers_1.createGitIgnore(helpers_1.repoName(process.argv));
    }
    if (err) {
        console.error(err);
    }
});
function finalCmd() {
    const cmdArr = [
        `mkdir ${helpers_1.repoName(process.argv)}`,
        `cd ${helpers_1.repoName(process.argv)}`,
        `${commands.npmInit}`,
        `${commands.installDevPackages}`
    ];
    return cmdArr.join(' && ');
}
