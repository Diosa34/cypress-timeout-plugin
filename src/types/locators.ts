/*
Описание структуры спецификации.
 */
export interface LocSpec {
    [key: string]: number | string;
}

/*
Описание локатора.
 */
export interface Locator {
    name: string;
    entries: LocEntry[];
}

/*
Локатор в контексте спецификации.

@path — путь к локатору
@value — значение его таймаута, описанное в спецификации.
 */
export interface SpecItem {
    path: string;
    value: number;
}

/*
Вхождение локатора в код теста.

@line — строка в файле, в которой найдено вхождение локатора
@position — позиция начала вхождения в строке
@realTimeout — фактический таймаут локатора, подсчитанный в файле
@specTimeout — таймаут локатора, указанный в спецификации
 */
export interface LocEntry {
    line: number;
    position: number;
    realTimeout: number;
    specTimeout: number;
}
