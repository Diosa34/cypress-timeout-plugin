import {Locator, LocEntry, SpecItem} from "./types/locators";
import * as fs from "fs";
import {Block} from "./types/code_parsing";

/**
 * Функция читает файл кода тестов и сохраняет содержимое как список строк,
 * затем проходит по списку и ищет вхождение каждого из локаторов в каждой строке.
 * Функция поддерживает несколько вхождений локатора в одну строку.
*/
export function codeScanner(filePath: string, locatorsSpec: SpecItem[]): Locator[]  {
    const data = fs.readFileSync(filePath, 'utf-8');
    const lines = data.split('\n');
    const occurrences: Locator[] = [];
    const timeoutStack: Block[] = [{name: 'base', timeout: 4000}];
    let waitTime = 0;

    lines.forEach((line, index) => {
        if (line.trim().startsWith('describe')) {
            while (timeoutStack[timeoutStack.length - 1].name !== 'base') {
                timeoutStack.pop();
            }

            const match = line.match(/defaultCommandTimeout:\s*(\d+)/);
            if (match != null) {
                timeoutStack.push({name: 'describe', timeout: parseInt(match[1], 10)});
            }
        }

        if (line.trim().startsWith('it')) {
            while (timeoutStack[timeoutStack.length - 1].name === 'it') {
                timeoutStack.pop();
            }

            const match = line.match(/defaultCommandTimeout:\s*(\d+)/);
            if (match != null) {
                timeoutStack.push({name: 'it', timeout: parseInt(match[1], 10)});
            }
        }

        const waitMatch = line.match(/cy\.wait\((\d+)\)/);
        if (waitMatch != null) {
            waitTime += parseInt(waitMatch[1], 10);
        }

        locatorsSpec.forEach(spec => {
            let position = line.indexOf(spec.path);
            while (position !== -1) {
                const effectiveTimeout = timeoutStack[timeoutStack.length - 1].timeout + waitTime;
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
                        entries: [entry],
                    })
                }
                position = line.indexOf(spec.path, position + spec.path.length);
            }
        });
    });

    return occurrences;
}
