/* eslint-disable @typescript-eslint/no-floating-promises */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="cypress" />

import {MainLocators as MLLoc} from "../locators/mainPage.ts";

describe('Suite to showcase cy.colorLog() command', { defaultCommandTimeout: 5000 }, () => {
    beforeEach(() => {
        cy.visit(Cypress.env('CURRENT_STAND'))
    })
    it('Простое получение доступа к элементам страницы', { defaultCommandTimeout: 6000 }, () => {
        cy.wait(2000);
        cy.get(MLLoc.elem.task, {timeout: 2000}).eq(1).should('have.text', 'Задания');
        cy.get(MLLoc.elem.table).eq(1).should('have.text', 'Журнал');
    })
});

describe('Ещё один набор тестов',  () => {
    beforeEach(() => {
        cy.visit(Cypress.env('CURRENT_STAND'))
    })
    it('Простое получение доступа к элементам страницы', { defaultCommandTimeout: 6000 }, () => {
        cy.get(MLLoc.elem.task).eq(1).should('have.text', 'Задания');
        cy.wait(2000);
        cy.get(MLLoc.elem.table).eq(1).should('have.text', 'Журнал');
    });

    it('Простое получение доступа к элементам страницы', { defaultCommandTimeout: 3000 }, () => {
        cy.get(MLLoc.elem.task).eq(1).should('have.text', 'Задания');
        cy.get(MLLoc.elem.table).eq(1).should('have.text', 'Журнал');
    })
});

describe('Проверка получения доступа', { defaultCommandTimeout: 5000 }, () => {
    beforeEach(() => {
        cy.visit(Cypress.env('CURRENT_STAND'))
    })
    it('Простое получение доступа к элементам страницы', { defaultCommandTimeout: 6000 }, () => {
        cy.get(MLLoc.elem.task, { timeout: 2000} ).eq(1).should('have.text', 'Задания');
    })
});

describe('Четвёртый набор тестов',  () => {
    beforeEach(() => {
        cy.visit(Cypress.env('CURRENT_STAND'))
    })
    it('Простое получение доступа к элементам страницы', { defaultCommandTimeout: 6000 }, () => {
        cy.get(MLLoc.elem.task, { timeout: 2000}).eq(1).should('have.text', 'Задания');
        cy.wait(2000);
        cy.get(MLLoc.elem.table).eq(1).should('have.text', 'Журнал', { timeout: 2000});
    });

    it('Отправление запроса с промежуточным таймаутом', { defaultCommandTimeout: 3000 }, () => {
        cy.intercept("GET", "**/import/**").as("import1");
        cy.get(MLLoc.elem.table).eq(1).should('have.text', 'Журнал', { timeout: 2000});
        cy.wait(2000);
        cy.wait("@import1");
    })

    it('Отправление запроса с локальным таймаутом', () => {
        cy.intercept("GET", "**/import/**", {timeout: 1000}).as("import2");
        cy.get(MLLoc.elem.table).eq(1).should('have.text', 'Журнал', { timeout: 2000});
        cy.wait(2000);
        cy.wait("@import2", {timeout: 2000});
    })

    it('Отправление запроса с локальным и промежуточным таймаутом', { defaultCommandTimeout: 3000 }, () => {
        cy.intercept("GET", "**/import/**").as("import3");
        cy.get(MLLoc.elem.table).eq(1).should('have.text', 'Журнал', { timeout: 2000});
        cy.wait(2000);
        cy.wait("@import3", {timeout: 2000});
    })

    it('Отправление запроса без таймаутов', () => {
        cy.intercept("GET", "**/import/**").as("import4");
        cy.get(MLLoc.elem.table).eq(1).should('have.text', 'Журнал', { timeout: 2000});
        cy.wait(2000);
        cy.wait("@import4", {timeout: 5000});
    })
});

describe('Отправление запросов без таймаутов', { defaultCommandTimeout: 5000 }, () => {
    beforeEach(() => {
        cy.visit(Cypress.env('CURRENT_STAND'))
    })
    it('Отправление запроса с промежуточным таймаутом и добавлением глобального', { defaultCommandTimeout: 3000 }, () => {
        cy.intercept("GET", "**/import/**").as("import5");
        cy.get(MLLoc.elem.table).eq(1).should('have.text', 'Журнал', { timeout: 2000});
        cy.wait(2000);
        cy.wait("@import5");
    })

    it('Отправление запроса с локальным таймаутом и добавлением глобального', () => {
        cy.intercept("GET", "**/import/**").as("import6");
        cy.get(MLLoc.elem.table).eq(1).should('have.text', 'Журнал', { timeout: 2000});
        cy.wait(2000);
        cy.wait("@import6", {timeout: 2000});
    })

    it('Отправление запроса с локальным и промежуточным таймаутом и добавлением глобального', { defaultCommandTimeout: 3000 }, () => {
        cy.intercept("GET", "**/import/**").as("import7");
        cy.get(MLLoc.elem.table).eq(1).should('have.text', 'Журнал', { timeout: 2000});
        cy.wait(2000);
        cy.wait("@import7", {timeout: 2000});
    })

    it('Отправление запроса без таймаутов и добавлением глобального', () => {
        cy.intercept("GET", "**/import/**").as("import8");
        cy.get(MLLoc.elem.table).eq(1).should('have.text', 'Журнал', { timeout: 2000});
        cy.wait(2000);
        cy.wait("@import8");
    })
});
