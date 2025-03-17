import { test, expect, BrowserContext, Page } from '@playwright/test';
import ElementsLinksPage from '../../pages/Elements/ElementsLinksPage';
import HomePage from '../../pages/homePage';
import ElementsPage from '../../pages/Elements/ElementsPage';

let elementsLinksPage: ElementsLinksPage;
let homePage: HomePage;
let elementsPage: ElementsPage;
let context: BrowserContext;
let page: Page;

test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();

    homePage = new HomePage(page);
    elementsPage = new ElementsPage(page);
    elementsLinksPage = new ElementsLinksPage(page);

    await homePage.navigateToHomePage();
    await homePage.gotoElements();
    await elementsPage.navigateToLinks();
});

test.afterAll(async () => {
    await context.close();
});

test.describe('Links tests', () => {
    test('verify static home link redirects to homepage', async () => {
        // Click the "Home" link and verify the new tab's URL
        await elementsLinksPage.clickStaticLinkHomeAndVerify();
    });

    test('verify dynaic home link redirects to homepage', async () => {
        // Click the "Home" link and verify the new tab's URL
        await elementsLinksPage.clickDynamicLinkHomeAndVerify();
    });
});


