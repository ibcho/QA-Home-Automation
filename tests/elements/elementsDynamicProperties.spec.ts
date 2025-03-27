import { test, expect, BrowserContext, Page } from '@playwright/test';
import ElementsDynamicProperties from '../../pages/Elements/ElementsDynamicProperties';
import HomePage from '../../pages/HomePage';
import ElementsPage from '../../pages/Elements/ElementsPage';

let elementsDynamicProperties: ElementsDynamicProperties;
let homePage: HomePage;
let elementsPage: ElementsPage;
let context: BrowserContext;
let page: Page;

test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();

    homePage = new HomePage(page);
    elementsPage = new ElementsPage(page);
    elementsDynamicProperties = new ElementsDynamicProperties(page);

    await homePage.loadHomePage();
    await homePage.gotoElements();
    await elementsPage.navigateToDynamicProperties();
});

test.afterAll(async () => {
    await context.close();
});

test.describe('Dynamic Properties tests', () => {
    test('verify text with random ID is visible', async () => {
        await elementsDynamicProperties.verifyTextWithRandomIdVisible();
    });

    test('verify button is enabled after five seconds', async () => {
        await elementsDynamicProperties.verifyButtonEnabledAfterFiveSeconds();
    });
    
    test('verify button color changes to text-danger after five seconds', async () => {
        await elementsDynamicProperties.verifyButtonColorChange();
    });

    test('verify button is visible after five seconds', async () => {
        await elementsDynamicProperties.verifyButtonVisibleAfterFiveSeconds();
    });
});