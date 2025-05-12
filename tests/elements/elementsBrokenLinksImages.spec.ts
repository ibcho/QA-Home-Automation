// import { test, expect } from '@playwright/test';
// import ElementsBrokenLinksImages from '../../pages/Elements/ElementsBrokenLinksImages';
// import ElementsPage from '../../pages/Elements/ElementsPage';
// import HomePage from '../../pages/HomePage';

// test.describe('Broken Links & Images tests', () => {
//     test('verify valid image is visible', async ({ page }) => {
//         const homePage = new HomePage(page);
//         const elementsPage = new ElementsPage(page);
//         const elementsBrokenLinksImages = new ElementsBrokenLinksImages(page);

//         // Navigate to Broken Links & Images section
//         await homePage.loadHomePage();
//         await homePage.gotoElements();
//         await elementsPage.navigateToBrokenLinksImages();

//         // Verify valid image is visible
//         await elementsBrokenLinksImages.verifyValidImageVisible();
//     });

//     test('verify broken image is not visible', async ({ page }) => {
//         const homePage = new HomePage(page);
//         const elementsPage = new ElementsPage(page);
//         const elementsBrokenLinksImages = new ElementsBrokenLinksImages(page);

//         // Navigate to Broken Links & Images section
//         await homePage.loadHomePage();
//         await homePage.gotoElements();
//         await elementsPage.navigateToBrokenLinksImages();

//         // Verify broken image is not visible
//         await elementsBrokenLinksImages.verifyBrokenImageNotVisible();
//     });

//     test('verify valid link redirects to correct URL', async ({ page }) => {
//         const homePage = new HomePage(page);
//         const elementsPage = new ElementsPage(page);
//         const elementsBrokenLinksImages = new ElementsBrokenLinksImages(page);

//         // Navigate to Broken Links & Images section
//         await homePage.loadHomePage();
//         await homePage.gotoElements();
//         await elementsPage.navigateToBrokenLinksImages();

//         // Verify valid link redirects to correct URL
//         await elementsBrokenLinksImages.clickValidLinkAndVerify();
//     });

//     test('verify broken link redirects to correct URL and displays correct content', async ({ page }) => {
//         const homePage = new HomePage(page);
//         const elementsPage = new ElementsPage(page);
//         const elementsBrokenLinksImages = new ElementsBrokenLinksImages(page);

//         // Navigate to Broken Links & Images section
//         await homePage.loadHomePage();
//         await homePage.gotoElements();
//         await elementsPage.navigateToBrokenLinksImages();

//         // Verify broken link redirects to correct URL and displays correct content
//         await elementsBrokenLinksImages.clickBrokenLink();
//         await page.waitForLoadState('domcontentloaded');

//         const statusCodeDiv = page.locator('.example');
//         await expect(statusCodeDiv).toContainText('This page returned a 500 status code.', { timeout: 8000 });
//         await expect(statusCodeDiv).toContainText('For a definition and common list of HTTP status codes, go', { timeout: 8000 });
//     });
// });