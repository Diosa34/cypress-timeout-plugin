const fs = require('fs');
const searchStrings = ['MLLoc.elem.task', 'MLLoc.elem.table', 'abs'];
const filePath = '../cypress/e2e/custom-log-tests.ts';

/*
Функция читает файл кода тестов и сохраняет содержимое как список строк,
затем проходит по списку и ищет вхождение каждого из локаторов в каждой строке.
Функция поддерживает несколько вхождений локатора в одну строку.
*/
function codeScanner() {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        const lines = data.split('\n');
        const occurrences = {};
        let currentTimeout = 4000;
        let waitTime = 0;
        const locatorsWithMeta = [];

        searchStrings.forEach(str => occurrences[str] = []);

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

            searchStrings.forEach(str => {
                let position = line.indexOf(str);
                while (position !== -1) {
                    console.log("Wait: ", waitTime);
                    const effectiveTimeout = currentTimeout + waitTime;
                    waitTime = 0;
                    occurrences[str].push({ lineNumber: index + 1, startPosition: position + 1, timeout: effectiveTimeout });
                    position = line.indexOf(str, position + 1);
                }
            });
        });

        for (const str of searchStrings) {
            if (occurrences[str].length > 0) {
                console.log(`Строка "${str}" найдена:`);
                occurrences[str].forEach(occurrence => {
                    console.log(` - Номер строки: ${occurrence.lineNumber}, 
                    Позиция начала: ${occurrence.startPosition}, Таймаут: ${occurrence.timeout}ms`);
                });
            } else {
                console.log(`Строка "${str}" не найдена.`);
            }
        }

    } catch (error) {
        console.error(`Ошибка при чтении файла: ${error.message}`);
    }
}

codeScanner();