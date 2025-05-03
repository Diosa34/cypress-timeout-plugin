import {SpecItem} from "./types/locators";
import {MainLocators} from "../cypress/spec/mainPage";

/*
Функция принимает структуру с перечнем локаторов (т.е. спецификацию)
и возвращает список объектов, где каждый объект содержит путь к локатору и значение его таймаута, описанное в спецификации.
*/
export function parseLocators(spec: any, abbreviation: string): SpecItem[] {
    const result: SpecItem[] = [];
    const stack: [any, string][] = [[spec, '']];

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
