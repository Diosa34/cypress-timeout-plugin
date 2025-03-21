function parseLocators(obj: Locators, parentKey: string = '', result: string[] = []): string[] {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            const newKey = parentKey ? `${parentKey}.${key}` : key;

            if (typeof value === 'object' && value !== null) {
                parseLocators(value, newKey, result);
            } else {
                result.push(newKey);
            }
        }
    }
    return result;
}
