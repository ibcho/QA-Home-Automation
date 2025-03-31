import { test, expect, BrowserContext, Page } from '@playwright/test';
import HomePage from '../../pages/HomePage';
import AlertsFrameWindows from '../../pages/AlertsFrameWindows/AlersFrameWindows';
import Alerts from '../../pages/AlertsFrameWindows/Alerts';

let homePage: HomePage;
let context: BrowserContext;
let page: Page;
let alertsFrameWindows: AlertsFrameWindows;
let alerts: Alerts;


test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();

    alertsFrameWindows = new AlertsFrameWindows(page);
    homePage = new HomePage(page);
    alerts = new Alerts(page);


    await homePage.loadHomePage();
    await homePage.gotoAlertsFrameWindows();
    await alertsFrameWindows.clickAlerts();

});

// test.afterAll(async () => {
//     await context.close();
// });

test.describe('Testing Alerts', () => { 
    test('Test Alert', async () => {
        page.once('dialog', dialog => {
          console.log(`Dialog message: ${dialog.message()}`);
          dialog.dismiss().catch(() => {});
        });
        await alerts.clickAlertButton();
    });

    test('Test Alert with delay of 5 seconds', async () => {
        page.once('dialog', dialog => {
          console.log(`Dialog message: ${dialog.message()}`);
          dialog.dismiss().catch(() => {});
        });
        await alerts.clickAlertButton5seconds();
    });

    // test('Test Confirm', async () => {
    //     await alertsFrameWindows.clickConfirmButton();
    //     await expect(alertsFrameWindows.getAlertMessage()).toBe('Press a button!');
    //     await alertsFrameWindows.clickAlertButton();
    //     await expect(alertsFrameWindows.getAlertMessage()).toBe('You pressed OK!');
    // });

    // test('Test Prompt', async () => {
    //     await alertsFrameWindows.clickPromptButton();
    //     await expect(alertsFrameWindows.getAlertMessage()).toBe('Please enter your name');
    //     await alertsFrameWindows.setAlertPromptText('John Doe');
    //     await alertsFrameWindows.clickAlertButton();
    //     await expect(alertsFrameWindows.getAlertMessage()).toBe('Hello John Doe! How are you today?');
    // });
});