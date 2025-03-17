import { test, expect, BrowserContext, Page } from '@playwright/test';
import WebTablesPage from '../../pages/Elements/ElementsWebTablesPage';
import ElementsPage from '../../pages/Elements/ElementsPage';
import ButtonsPage from '../../pages/Elements/ElementsButtonsPage';
import HomePage from '../../pages/homePage';

let webTablesPage: WebTablesPage;
let homePage: HomePage;
let elementsPage: ElementsPage;
let context: BrowserContext;
let buttonsPage: ButtonsPage;
let page: Page;

test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();

    homePage = new HomePage(page);
    elementsPage = new ElementsPage(page);
    webTablesPage = new WebTablesPage(page);
    buttonsPage = new ButtonsPage(page);

    await homePage.navigateToHomePage();
    await homePage.gotoElements();
    await elementsPage.navigateToButtons();
});

test.afterAll(async () => {
    await context.close();
});

test.describe('Buttons tests', () => {
    test('verify double click message', async () => {
        await buttonsPage.performDoubleClick();
        await buttonsPage.verifyDoubleClickMessage('You have done a double click');
    });

    test('verify right click message', async () => {
        await buttonsPage.performRightClick();
        await buttonsPage.verifyRightClickMessage('You have done a right click');
    });

    test('verify click me message', async () => {
        await buttonsPage.performClickMe();
        await buttonsPage.verifyClickMeMessage('You have done a dynamic click');
    });
});