import { test, expect, BrowserContext, Page } from '@playwright/test';
import HomePage from '../../pages/HomePage';
import AlertsFrameWindows from '../../pages/AlertsFrameWindows/AlersFrameWindows';
import Alerts from '../../pages/AlertsFrameWindows/Alerts';

let homePage: HomePage;
let context: BrowserContext;
let page: Page;
let alertsFrameWindows: AlertsFrameWindows;
let alerts: Alerts;

const ALERT_MESSAGE = 'You clicked a button';
const ALERT_MESSAGE_DELAY = 'This alert appeared after 5 seconds';
const CONFIRM_MESSAGE = 'Do you confirm action?';
const PROMPT_MESSAGE = 'Please enter your name'; 

test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();

    alertsFrameWindows = new AlertsFrameWindows(page);
    homePage = new HomePage(page);
    alerts = new Alerts(page);


    await homePage.loadHomePage();
    await homePage.gotoAlertsFrameWindows();
    await alertsFrameWindows.navigateToAlerts();

});

// test.afterAll(async () => {
//     await context.close();
// });

test.describe('Testing Alerts', () => { 
  test('Test Alert', async () => {
    await alerts.handleDialog('accept', ALERT_MESSAGE);
    await alerts.clickAlertButton();
  });

    test('Test Alert with delay of 5 seconds', async () => {
      
      await alerts.clickAlertButton5seconds();
      const dialog = await page.waitForEvent('dialog', { timeout: 6500 });
      console.log(`Dialog message: ${dialog.message()}`); 
      expect(dialog.message()).toBe(ALERT_MESSAGE_DELAY); 
      await dialog.accept();
  });

  test('Test Dialog Button "OK"', async () => {
    await alerts.handleDialog('accept', CONFIRM_MESSAGE);
    await alerts.clickAlertConfirmButton();

    const confirmResult = page.locator('#confirmResult');
    await expect(confirmResult).toHaveText('You selected Ok');
  });

  test('Test Dialog Button "Cancel"', async () => {
    await alerts.handleDialog('dismiss', CONFIRM_MESSAGE);
    await alerts.clickAlertConfirmButton();

    const confirmResult = page.locator('#confirmResult');
    await expect(confirmResult).toHaveText('You selected Cancel');
  });

  test('Test Dialog Button "Enter Free Text"', async () => {
    const name = 'Ibrahim Gavazov';
    
    await alerts.handleDialog('accept', PROMPT_MESSAGE, name);
    await alerts.clickAlertPrompButtonEnterText();

    const promptResult = page.locator('#promptResult');
    await expect(promptResult).toHaveText(`You entered ${name}`);
  });
});