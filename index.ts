#!/usr/bin/env node

import { exec } from "child_process";
import { loader } from './msgs';

import {
  createGitIgnore,
  repoName,
  setupBuildTasks,
  addTslint,
  hasArg
} from './helpers';

let loadInterval: any;

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
  clearInterval(loadInterval);

  if (err) {
    console.error(err);
    process.exit();
  }

  loadInterval = loader('creating build tasks');
  setupBuildTasks(repoName(process.argv) as string)
  .then(() => {
    clearInterval(loadInterval);

    if (!hasArg('--no-tslint')) {
      loadInterval = loader('creating tslint file');
      addTslint(repoName(process.argv) as string)
      .then(() => {
        clearInterval(loadInterval);

      })
      .catch(console.error);
    }
  
    if (!hasArg('--no-gitignore')) {
      let loadInt = loader('creating gitignore file');
      createGitIgnore(repoName(process.argv) as string)
      .then(() => {
        clearInterval(loadInt);

      })
      .catch(console.error);
    }
  })
  .catch(console.error);

});

function finalCmd() {
  loadInterval = loader('initiating package.json');

  const cmdArr = [
  `mkdir ${repoName(process.argv)}`,
  `cd ${repoName(process.argv)}`,
  `${commands.npmInit}`,
  `${commands.installDevPackages}`
  ]

  return cmdArr.join(' && ')
}