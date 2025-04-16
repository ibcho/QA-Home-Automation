import { test } from '@playwright/test';
import HomePage from '../../pages/HomePage';
import BrowserWindows from '../../pages/AlertsFrameWindows/BrowserWindows';
import AlertsFrameWindows from '../../pages/AlertsFrameWindows/AlersFrameWindows';

let homePage: HomePage;
let browserWindows: BrowserWindows;
let alertsFrameWindows: AlertsFrameWindows;

test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    browserWindows = new BrowserWindows(page);
    alertsFrameWindows = new AlertsFrameWindows(page);
    
    // Navigate to the home page
    await homePage.loadHomePage();

    // Navigate to the Forms section
    await homePage.gotoAlertsFrameWindows();
    await alertsFrameWindows.navigateToBrowserWindows();

});

test.afterEach(async ({ context }) => {
    // Close all additional tabs or windows except the main one
    const pages = context.pages();
    for (const page of pages.slice(1)) {
        await page.close();
    }
});


test.describe('Browser Windows Tests', () => {     

    test('Verify new tab content', async () => {
        await browserWindows.clickNewTabButton();
        await browserWindows.verifyNewTabOpened();
    });

    test('Verify new window button functionality', async () => {
        await browserWindows.clickNewWindowButton();
        await browserWindows.verifyNewWindowOpened();
        await browserWindows.clickNewWindowMessage();
    });
});