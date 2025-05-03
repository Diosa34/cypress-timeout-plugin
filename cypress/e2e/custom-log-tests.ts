/* eslint-disable @typescript-eslint/no-floating-promises */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="cypress" />

import {MainLocators as MLLoc} from "../locators/mainPage.ts";

describe('Suite to showcase cy.colorLog() command', { defaultCommandTimeout: 5000 }, () => {
    it('Простое получение доступа к элементам страницы', { defaultCommandTimeout: 6000 }, () => {
        cy.wait(2000);
        cy.get(MLLoc.elem.task).eq(1).should('have.text', 'Задания');
        cy.get(MLLoc.elem.table).eq(1).should('have.text', 'Журнал');
    })
});

describe('Ещё один набор тестов',  () => {
    it('Простое получение доступа к элементам страницы', { defaultCommandTimeout: 6000 }, () => {
        cy.get(MLLoc.elem.task).eq(1).should('have.text', 'Задания');
        cy.get(MLLoc.elem.table).eq(1).should('have.text', 'Журнал');
    });

    it('Простое получение доступа к элементам страницы', { defaultCommandTimeout: 3000 }, () => {
        cy.get(MLLoc.elem.task).eq(1).should('have.text', 'Задания');
        cy.get(MLLoc.elem.table).eq(1).should('have.text', 'Журнал');
    })
});