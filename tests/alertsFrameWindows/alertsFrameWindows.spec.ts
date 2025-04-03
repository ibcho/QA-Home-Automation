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

test.describe('Browser Windows Tests', () => {     

    test('Verify new tab content', async () => {
        await browserWindows.clickNewTabButton();
        await browserWindows.verifyNewTabOpened();
    });

    test('Verify new window button functionality', async () => {
        await browserWindows.clickNewWindowButton();
        await browserWindows.verifyNewWindowOpened();
    });

    test('Verify new window message functionality', async () => {
        await browserWindows.clickNewWindowMessage();
       
    });
});