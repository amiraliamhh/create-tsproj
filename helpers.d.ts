export declare function createGitIgnore(folderName: string): void;
export declare function repoName(args: string[]): string | Error;
export declare function setupBuildTasks(foldername: string): void;
export declare function getArg(argName: string): string | Error;
export declare function hasArg(argName: string): boolean;
export declare function addTslint(foldername: string): Promise<any>;
