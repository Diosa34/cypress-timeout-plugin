const fs = require('fs');
const searchStrings = ['CLLoc.elem.task', 'CLLoc.elem.table', 'abs'];
const filePath = 'cypress/e2e/custom-log-tests.js';

function codeScanner() {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        const lines = data.split('\n');
        const occurrences = {};

        searchStrings.forEach(str => occurrences[str] = []);

        lines.forEach((line, index) => {
            searchStrings.forEach(str => {
                let position = line.indexOf(str);
                while (position !== -1) {
                    occurrences[str].push({ lineNumber: index + 1, startPosition: position + 1});

                    position = line.indexOf(str, position + 1);
                }
            });
        });

        for (const str of searchStrings) {
            if (occurrences[str].length > 0) {
                console.log(`Строка "${str}" найдена:`);
                occurrences[str].forEach(occurrence => {
                    console.log(` - Номер строки: ${occurrence.lineNumber}, Позиция начала: ${occurrence.startPosition}`);
                });
            } else {
                console.log(`Строка "${str}" не найдена.`);
            }
        }

    } catch (error) {
        console.error(`Ошибка при чтении файла: ${error.message}`);
    }
}

codeScanner()

