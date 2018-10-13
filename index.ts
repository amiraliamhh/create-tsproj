#!/usr/bin/env node

import { exec } from "child_process";

import {
  createGitIgnore,
  repoName,
  setupBuildTasks,
  addTslint,
  hasArg
} from './helpers';

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
}

exec(finalCmd() , (err, stdout, stderr) => {
  setupBuildTasks(repoName(process.argv) as string);

  if (!hasArg('--no-tslint')) {
    addTslint(repoName(process.argv) as string);
  }

  if (!hasArg('--no-gitignore')) {
    createGitIgnore(repoName(process.argv) as string);
  }

  if (err) {
    console.error(err);
  }

});

function finalCmd() {
  const cmdArr = [
  `mkdir ${repoName(process.argv)}`,
  `cd ${repoName(process.argv)}`,
  `${commands.npmInit}`,
  `${commands.installDevPackages}`
  ]

  return cmdArr.join(' && ')
}