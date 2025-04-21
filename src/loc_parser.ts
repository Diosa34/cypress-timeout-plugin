import { MainLocators } from "../cypress/spec/mainPage";
import {SpecItem} from "./types/locators";

/*
Функция принимает структуру с перечнем локаторов
и возвращает список объектов, где каждый объект содержит путь к локатору и значение его таймаута, описанное в спецификации.
*/

function parseLocators(obj: any): SpecItem[] {
    const result: SpecItem[] = [];
    const stack: [any, string][] = [[obj, '']];

    while (stack.length > 0) {
        const [currentObj, parentKey] = stack.pop()!;

        for (const key in currentObj) {
            if (currentObj.hasOwnProperty(key)) {
                const value = currentObj[key];
                const newKey = parentKey ? `${parentKey}.${key}` : key;

                if (typeof value === 'object' && value !== null) {
                    stack.push([value, newKey]);
                } else {
                    result.push({ path: newKey, value });
                }
            }
        }
    }

    return result;
}

const result = parseLocators(MainLocators);
console.log(result);