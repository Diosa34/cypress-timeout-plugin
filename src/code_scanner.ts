import {Locator, LocEntry, SpecItem} from "./types/locators";

const fs = require('fs');
const filePath = '../cypress/e2e/custom-log-tests.ts';

/*
Функция читает файл кода тестов и сохраняет содержимое как список строк,
затем проходит по списку и ищет вхождение каждого из локаторов в каждой строке.
Функция поддерживает несколько вхождений локатора в одну строку.
*/
function codeScanner(locatorsSpec: SpecItem[]): Locator[]  {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        const lines = data.split('\n');
        const occurrences: Locator[] = [];
        let currentTimeout = 4000;
        let waitTime = 0;

        lines.forEach((line, index) => {
            if (line.trim().startsWith('describe(')) {
                const match = line.match(/defaultCommandTimeout:\s*(\d+)/);
                if (match) {
                    currentTimeout = parseInt(match[1], 10);
                }
            }

            if (line.trim().startsWith('it(')) {
                const match = line.match(/defaultCommandTimeout:\s*(\d+)/);
                if (match) {
                    currentTimeout = parseInt(match[1], 10);
                }
            }

            const waitMatch = line.match(/cy\.wait\((\d+)\)/);
            if (waitMatch) {
                waitTime += parseInt(waitMatch[1], 10);
            }

            locatorsSpec.forEach(spec => {
                let position = line.indexOf(spec.path);
                while (position !== -1) {
                    const effectiveTimeout = currentTimeout + waitTime;
                    waitTime = 0;
                    const entry: LocEntry = {
                        line: index + 1,
                        position: position + 1,
                        realTimeout: effectiveTimeout,
                        specTimeout: spec.value,
                    }

                    const existingLocator = occurrences.find(loc => loc.name === spec.path)
                    if (existingLocator) {
                        existingLocator.entries.push(entry);
                    } else {
                        occurrences.push({
                            name: spec.path,
                            entries: [entry],})
                    }
                }
            });
        });

        return occurrences;
    } catch (error) {
        console.error(`Ошибка при чтении файла: ${error.message}`);
    }
}
