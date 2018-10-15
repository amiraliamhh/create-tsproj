import fs from 'fs';
import { exec } from 'child_process';

const gitIgnoreContent =
`node_modules
dist
`

export function createGitIgnore(folderName: string) {
  fs.writeFile(`./${folderName}/.gitignore`, gitIgnoreContent, 'utf8', (err: Error) => {
    if (err) {
      throw err;
    }
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

export function setupBuildTasks(foldername: string): void {
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

  fs.writeFile(path, JSON.stringify(tasks, null, 4), 'utf8', (err: any) => {
    if (err) {
      console.log(err);
    }
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
    fs.writeFile(`./${foldername}/tslint.json`, JSON.stringify(tslintfile, null, 4), 'utf8', (err: Error) => {
      if (err) {
        reject(err);
      }
      fs.readFile(`${__dirname}/tsconfig.json`, (err: Error, data: any) => {
        if (err) {
          console.error(err);
        }

        fs.writeFile(`./${foldername}/tsconfig.json`, data, 'utf8', (err: Error) => {
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
