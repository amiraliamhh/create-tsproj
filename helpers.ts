import fs from 'fs';

const gitIgnoreContent = 
`node_modules
dist
`

export function createGitIgnore(folderName: string) {
  fs.writeFile(`./${folderName}/.gitignore`, gitIgnoreContent, 'utf8', (err: Error) {
    if (err) {
      throw err;
    }
  })
} 