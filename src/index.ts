import {parseLocators} from "./loc_parser";
import {Locator, SpecItem} from "./types/locators";
import {codeScanner} from "./code_scanner";
import {generateReport} from "./loc_logger";
import * as fs from "fs";
import * as path from "path";
import {getExportedConstName, getLocatorByName, getLocFilePath} from "./utils/main.js";
import dotenv from 'dotenv';

dotenv.config();

export async function runPlugin()  {
    const testsFiles = fs.readdirSync(process.env.TESTS_DIRECTORY_PATH as string);

    for (const filename of testsFiles) {
        const fullTestPath = path.join(process.env.TESTS_DIRECTORY_PATH as string, filename);
        const locFilePath = getLocFilePath(filename);

        if (fs.existsSync(locFilePath)) {
            const locStructureName: string = getExportedConstName(locFilePath);
            await getLocatorByName(filename, locStructureName).then(structure => {
                const specList: SpecItem[] = parseLocators(structure);
                const locUsages: Locator[] = codeScanner(fullTestPath, specList);
                generateReport(locUsages);
            });
        }
    }
}


runPlugin();
