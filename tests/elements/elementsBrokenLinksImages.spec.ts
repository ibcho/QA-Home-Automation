import { test, expect, BrowserContext, Page } from '@playwright/test';
import ElementsBrokenLinksImages from '../../pages/Elements/ElementsBrokenLinksImages';
import ElementsPage from '../../pages/Elements/ElementsPage';
import HomePage from '../../pages/HomePage';

let elementsBrokenLinksImages: ElementsBrokenLinksImages;
let homePage: HomePage;
let elementsPage: ElementsPage;
let context: BrowserContext;
let page: Page;

test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();

    homePage = new HomePage(page);
    elementsPage = new ElementsPage(page);
    elementsBrokenLinksImages = new ElementsBrokenLinksImages(page);

    await homePage.loadHomePage();
    await homePage.gotoElements();
    await elementsPage.navigateToBrokenLinksImages();
});

test.afterAll(async () => {
    await context.close();
});

test.describe('Broken Links & Images tests', () => {
    test('verify valid image is visible', async () => {
        await elementsBrokenLinksImages.verifyValidImageVisible();
    });

    test('verify broken image is not visible', async () => {
        await elementsBrokenLinksImages.verifyBrokenImageNotVisible();
    });

    test('verify valid link redirects to correct URL', async () => {
        await elementsBrokenLinksImages.clickValidLinkAndVerify();
    });

test.describe('redirect to broken link', () => {
    test.beforeEach(async () => {
        await homePage.loadHomePage();
        await homePage.gotoElements();
        await elementsPage.navigateToBrokenLinksImages();
    });

    test('verify broken link redirects to correct URL and displays correct content', async () => {
        await elementsBrokenLinksImages.clickBrokenLink();
        await page.waitForLoadState('domcontentloaded');
        
        const statusCodeDiv = page.locator('.example');
        await expect(statusCodeDiv).toContainText('This page returned a 500 status code.');
        await expect(statusCodeDiv).toContainText('For a definition and common list of HTTP status codes, go');
    });

    });
});