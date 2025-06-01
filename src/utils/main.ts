import path from "path";
import fs from "fs";
import {pathToFileURL} from "url";

export function getLocFilePath(testFileName: string): string {
    const baseName: string = path.basename(testFileName, '.cy.ts');
    const locFileName: string = `${baseName}.ts`;
    return path.join(process.env.LOC_DIRECTORY_PATH as string, locFileName);
}

export function getExportedConstName(filePath: string): string {
    const content = fs.readFileSync(filePath, 'utf-8');
    const match = content.match(/export\s+const\s+(\w+)\s*:/);
    if (!match) {
        throw new Error(`Не удалось найти константу в файле: ${filePath}`);
    }
    return match[1];
}

export async function getLocatorByName(specFilename: string, structureName: string): Promise<any> {
        const modulePath = pathToFileURL(`C:/Users/Diosa/IdeaProjects/cypress-timeout-plugin/cypress/spec/${specFilename.replace('cy.ts', 'js')}`).href;
        const module = await import(modulePath);

        if (module[structureName]) {
            return module[structureName];
        } else {
            throw new Error(`Модуль ${modulePath} не содержит экспорт ${structureName}`);
        }
}