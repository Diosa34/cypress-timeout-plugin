import * as fs from "fs";

const codeFile = 'C:/Users/Diosa/IdeaProjects/cypress-timeout-plugin/cypress/e2e/custom-log-tests.ts';

try {
    const data = fs.readFileSync(codeFile, 'utf-8');
    console.log("Файл успешно прочитан.");
    console.log(data);
} catch (error) {
    console.error(`Ошибка при чтении файла: ${error.message}`);
}