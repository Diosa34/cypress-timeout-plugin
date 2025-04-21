import {Locator} from "./types/locators";
import * as fs from "fs";

/*
Функция записывает в файл результаты валидации таймаутов в коде тестов.
@data — список локаторов с метаинформацией
*/
function generateReport(data: Locator[]): void {
    const fileStream = fs.createWriteStream('output.txt');

    for (const loc of data) {
        fileStream.write(`Локатор "${loc.name}" встречается: \n`);
        loc.entries.forEach(entry => {
            fileStream.write(` - Номер строки: ${entry.line}, 
                    Позиция начала: ${entry.position}, Таймаут спецификации: ${entry.specTimeout}ms, Таймаут в коде: ${entry.realTimeout} \n`);
        });
    }
}