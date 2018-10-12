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
