import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

const gitIgnoreContent =
`node_modules
dist
`

export function createGitIgnore(folderName: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const p = <string>path.resolve(__dirname, folderName, '.gitignore');
    fs.writeFile(p, gitIgnoreContent, 'utf8', (err: Error) => {
      if (err) {
        reject(err)
      }

      resolve();
    })
  })
}

export function repoName(args: string[]): string|Error {
  if (args.indexOf('--name') < 0 && !args[2]) {
    throw new Error('--name argument must be provided');

  } else if (!args[2].includes('--')) {
    return args[2];

  } else if (args.indexOf('--name') > -1) {
    return args[args.indexOf('--name') + 1];

  }

  throw new Error('--name argument must be provided');
}

export function setupBuildTasks(foldername: string): Promise<any> {

  return new Promise((resolve, reject) => {
    const p = <string>path.resolve(process.cwd(), foldername, 'package.json');
    let tasks = require(p);
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
  
    fs.writeFile(p, JSON.stringify(tasks, null, 4), 'utf8', (err: any) => {
      if (err) {
        reject(err)
      }

      resolve();
    })
  })
}

export function getArg(argName: string): string|Error {
  const argNameInd: number = process.argv.indexOf(argName);
  if (argNameInd > -1 && process.argv[argNameInd + 1]) {
    return process.argv[argNameInd + 1];
  }

  throw new Error('--name argument must be provided.');
}

export function hasArg(argName: string): boolean {
  const argIndex: number = process.argv.indexOf(argName);
  if (argIndex < 0) {
    return false;
  }

  return true;
}

export function addTslint(foldername: string): Promise<any> {
  const tslintfile = require('./tslint.json');
  return new Promise((resolve, reject) => {
    const p = <string>path.resolve(process.cwd(), foldername, 'tslint.json');
    fs.writeFile(p, JSON.stringify(tslintfile, null, 4), 'utf8', (err: Error) => {
      if (err) {
        reject(err);
      }

      const tsConfP = <string>path.resolve(__dirname, 'tsconfig.json');
      fs.readFile(tsConfP, (err: Error, data: any) => {
        if (err) {
          console.error(err);
        }

        const tsConfCP = path.resolve(process.cwd(), foldername, 'tsconfig.json');
        fs.writeFile(tsConfCP, data, 'utf8', (err: Error) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        })
      })
    })
  })
}
