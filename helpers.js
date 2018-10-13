"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const gitIgnoreContent = `node_modules
dist
`;
function createGitIgnore(folderName) {
    fs_1.default.writeFile(`./${folderName}/.gitignore`, gitIgnoreContent, 'utf8', (err) => {
        if (err) {
            throw err;
        }
    });
}
exports.createGitIgnore = createGitIgnore;
function repoName(args) {
    if (args.indexOf('--name') < 0 && !args[2]) {
        throw new Error('--name argument must be provided');
    }
    else if (!args[2].includes('--')) {
        return args[2];
    }
    else if (args.indexOf('--name') > -1) {
        return args[args.indexOf('--name') + 1];
    }
    throw new Error('--name argument must be provided');
}
exports.repoName = repoName;
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
exports.setupBuildTasks = setupBuildTasks;
function getArg(argName) {
    const argNameInd = process.argv.indexOf(argName);
    if (argNameInd > -1 && process.argv[argNameInd + 1]) {
        return process.argv[argNameInd + 1];
    }
    throw new Error('--name argument must be provided.');
}
exports.getArg = getArg;
function hasArg(argName) {
    const argIndex = process.argv.indexOf(argName);
    if (argIndex < 0) {
        return false;
    }
    return true;
}
exports.hasArg = hasArg;
function addTslint(foldername) {
    const tslintfile = require('./tslint.json');
    const tsconfigfile = require('./tsconfig.json');
    return new Promise((resolve, reject) => {
        fs_1.default.writeFile(`./${foldername}/tslint.json`, JSON.stringify(tslintfile, null, 4), 'utf8', (err) => {
            if (err) {
                reject(err);
            }
            fs_1.default.writeFile(`./${foldername}/tsconfig.json`, JSON.stringify(tsconfigfile, null, 4), 'utf8', (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    });
}
exports.addTslint = addTslint;
