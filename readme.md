# create-tsproj
## easily start a typescript project using command line

### Installation
`sudo npm install -g create-tsproj`

### Create New Project
Run this command to create a new project:  
`create-tsproj PROJECT_NAME`  
You can pass your project name as the first argument after create-tsproj, or you can use `--name` flag:  
`create-tsproj --name PROJECT_NAME`  

This command creates a new folder, adds `package.json` and installs devDependencies for new typescript project.
This command also creates `tslint.json`, `tsconfig.json` and `.gitignore` files, to disable this feature, run the command with `--no-tslint` to disable tslint and `--no-gitignore` to disable creating gitignore file.

`create-tsproj PROJECT_NAME --no-tslint`  
`create-tsproj PROJECT_NAME --no-gitignore`  

## What's next?
After initiating the project, you can go to the directory of your project and run these commands:

`npm run build`  
To build *.js files out of typescript files. Transpiled files are located in `dist` directory by default. you can change default path for emmited files in `package.json`.  

`npm run build:w`  
This command does every thing that `npm run build` does, except that this runs the compiler in *watch* mode.