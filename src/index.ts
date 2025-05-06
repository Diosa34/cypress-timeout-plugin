import {parseLocators} from "./loc_parser";
import {MainLocators} from "../cypress/spec/mainPage";
import {Locator, SpecItem} from "./types/locators";
import {codeScanner} from "./code_scanner";
import {generateReport} from "./loc_logger";

function main()  {
    const codeFile = 'C:/Users/Diosa/IdeaProjects/cypress-timeout-plugin/cypress/e2e/custom-log-tests.ts';
    const specList: SpecItem[] = parseLocators(MainLocators, 'MLLoc.');
    const locUsages: Locator[] = codeScanner(codeFile, specList);
    generateReport(locUsages);
}

main();
