// #!/usr/bin/env node
// import { exec } from 'child_process';
// import fs from 'fs';

// import { createGitIgnore } from './helpers';

// const devPackages = [
//   "typescript",
//   "@babel/core",
//   "@babel/cli",
//   "@babel/plugin-proposal-class-properties",
//   "@babel/plugin-proposal-object-rest-spread",
//   "@babel/preset-env",
//   "@babel/preset-typescript",
//   "@babel/polyfill"
// ];

// const commands = {
//   npmInit: 'npm init -y',
//   installDevPackages: `npm i -D ${devPackages.join(' ')} `,
//   tsInit: 'tsc --init --declaration --allowSyntheticDefaultImports --target esnext --outDir dist',
// }

// const finalCmd = `
//   mkdir ${getArg('--name')} &&
//   cd ${getArg('--name')} &&
//   ${commands.npmInit} && 
//   ${commands.installDevPackages}
// `;

// exec(finalCmd , (err, stdout, stderr) => {
//   setupBuildTasks(getArg('--name') as string);
//   createGitIgnore('amirali');
  
//   console.log(err)
//   console.log(stdout)
//   console.log(stderr)
// });

// function getArg(argName: string): string|Error {
//   const argNameInd: number = process.argv.indexOf(argName);
//   if (argNameInd > -1 && process.argv[argNameInd + 1]) {
//     return process.argv[argNameInd + 1];
//   }

//   throw new Error('--name argument must be provided.');
// }

// function setupBuildTasks(foldername: string): void {
//   const path = `./${foldername}/package.json`;
//   let tasks = require(path);
//   let scripts = tasks.scripts;
//   const newScripts = Object.assign(scripts, {
//     "type-check": "tsc --noEmit",
//     "type-check:watch": "npm run type-check -- --watch",
//     "build": "npm run build:types && npm run build:js",
//     "build:w": "npm run build:types && npm run build:jsw",
//     "build:types": "tsc --emitDeclarationOnly",
//     "build:js": "babel src --out-dir dist --extensions \".ts,.tsx\" --source-maps inline",
//     "build:jsw": "babel src --out-dir dist --extensions \".ts,.tsx\" --source-maps inline --watch",
//   });
//   tasks.scripts = newScripts;

//   fs.writeFile(path, JSON.stringify(tasks, null, 4), 'utf8', (err: any) => {
//     if (err) {
//       console.log(err);
//     }
//   })
// }