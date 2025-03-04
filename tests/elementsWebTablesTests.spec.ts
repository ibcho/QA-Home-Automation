import { test, expect, BrowserContext, Page } from '@playwright/test';
import WebTablesPage from '../pages/ElementsWebTablesPage';
import HomePage from '../pages/HomePage';
import ElementsPage from '../pages/ElementsPage';

test.describe('Add button / Registration form tests', () => {
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

    // test.afterAll(async () => {
    //     await context.close();
    // });

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

test.describe('Create and Delete Person Tests', () => {
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
    });

    test('create new person and verify', async () => {
        await webTablesPage.addButton.click();
        const firstName = 'John';
        const lastName = 'Doe';
        const email = 'john.doe@example.com';
        const age = '25';
        const salary = '60000';
        const department = 'IT';

        // Create a new person and verify
        await webTablesPage.createNewPersonAndVerify(firstName, lastName, email, age, salary, department);
    });

    test('Delete a person and verify', async () => {
        const firstName = 'Cierra';
        // Delete the new person and verify
        await webTablesPage.deletePersonAndVerify(firstName);
    });

    test('Edit person and verify', async () => {
        const oldFirstName = 'Alden';

        const newFirstName = 'Jane';
        const newLastName = 'Smith';
        const newEmail = 'jane.smith@example.com';
        const newAge = '30';
        const newSalary = '70000';
        const newDepartment = 'HR';

        // Edit the person and verify the changes
        await webTablesPage.editPersonAndVerifyTheChanges(oldFirstName, newFirstName, newLastName, newEmail, newAge, newSalary, newDepartment);
    });
});

test.describe('Web Table Search Tests', () => {
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
    });

    test('Search for a person and Verify that it is visible', async () => {
        await webTablesPage.searchForPerson('Cierra');
        await webTablesPage.verifyPersonIsVisible('Cierra');
        await webTablesPage.searchForPerson('Alden');
        await webTablesPage.verifyPersonIsVisible('Alden');
        await webTablesPage.searchForPerson('Kierra');
        await webTablesPage.verifyPersonIsVisible('Kierra');
    });
});