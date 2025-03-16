import '../../src/custom-log.js'
import {CarListLocators} from "../locators/mainPage";

const CLLoc = CarListLocators;

describe('Suite to showcase cy.colorLog() command', () => {
    it.only('Test cy.colorLog() with different colors', () => {
        cy.colorLog('You have crossed the wrong line!', '#FF0000', // Red
            { displayName: "⛔ - YOU MESSED UP:", data: { toDo: 'If I were you, I would start running away right now.' } }
        )

        cy.colorLog('Are you sure you want to go that route?', '#FFFF00', // Yellow
            { displayName: "⚠️ - BRACE YOURSELF:", data: { toDo: 'If I were you, I would think twice.' } }
        )

        cy.colorLog('We are in the clear... for now.', '#00FF00', // Green
            { displayName: "✔️ - WE ARE COOL:", data: { toDo: 'Turn around and enjoy the peace while it lasts.' } }
        )
    });

    it('Простое получение доступа к элементам страницы', () => {
        cy.get(CLLoc.elem.task).eq(1).should('have.text', 'Задания')
        cy.get(CLLoc.elem.table).eq(1).should('have.text', 'Журнал')
    })
});