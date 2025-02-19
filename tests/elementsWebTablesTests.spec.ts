import { test, expect, BrowserContext, Page } from '@playwright/test';
import WebTablesPage from '../pages/WebTablesPage';
import HomePage from '../pages/HomePage';
import ElementsPage from '../pages/ElementsPage';

test.describe('Web Tables Tests', () => {
    let webTablesPage: WebTablesPage;
    let homePage: HomePage;
    let elementsPage: ElementsPage;
    let context: BrowserContext;
    let page: Page;

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();

        homePage = new HomePage(page);
        elementsPage = new ElementsPage(page);
        webTablesPage = new WebTablesPage(page);

        await homePage.navigateToHomePage();
        await homePage.gotoElements();
        await elementsPage.navigateToWebTables();
        expect(await webTablesPage.isWebTablesTitleVisible()).toBe(true);
        await webTablesPage.addButton.click();
    });

    test.afterAll(async () => {
        await context.close();
    });

    test('verify form labels', async () => {
        await webTablesPage.verifyRegistrationFormLabels();
    });

    test('verify field max lengths', async () => {
        await webTablesPage.verifyFieldMaxLengths();
    });

    test('verify email field patterns', async () => {
        await webTablesPage.verifyEmailPatternValidation();
    });

    test('verify age field patterns', async () => {
        await webTablesPage.verifyAgePatternValidation();
    });

    test('verify validation messages on empty form submission', async () => {
        await webTablesPage.submitEmptyRegistrationForm();
        await webTablesPage.verifyInvalidFieldBorderColor();
    });

    test('verify valid fields after entering data', async () => {
        await webTablesPage.fillRegistrationForm('Ibrahim', 'Gavazov', 'ibrahim@example.com', '30', '50000', 'Engineering');
        await webTablesPage.verifyValidFieldBorderColor();
    });

});