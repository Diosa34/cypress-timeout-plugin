import { MainLocators } from "../cypress/locators/mainPage";

/*
Функция принимает структуру с перечнем локаторов
и возвращает список объектов, где каждый объект содержит путь к локатору и его значение.
*/
interface LocatorResult {
    path: string;
    value: number;
}

function parseLocators(obj: any): LocatorResult[] {
    const result: LocatorResult[] = [];
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