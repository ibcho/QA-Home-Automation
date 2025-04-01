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
    await alertsFrameWindows.navigateToAlerts();

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
      
      await alerts.clickAlertButton5seconds();
      const dialog = await page.waitForEvent('dialog', { timeout: 6000 });
      console.log(`Dialog message: ${dialog.message()}`); 
      expect(dialog.message()).toBe('This alert appeared after 5 seconds'); 
      await dialog.accept();
  });

    test('Test Dialog Button "OK"', async () => {
 
      // Listen for the confirmation dialog
      page.once('dialog', async (dialog) => {
          console.log(`Dialog message: ${dialog.message()}`); 
          expect(dialog.message()).toBe('Do you confirm action?'); 
          await dialog.accept(); // Click "OK"
      });

      await alerts.clickAlertConfirmButton();
      const confirmResult = page.locator('#confirmResult');
      await expect(confirmResult).toHaveText('You selected Ok');
  });

  test('Test Dialog Button "Cancel"', async () => {

    // Listen for the confirmation dialog
    page.once('dialog', async (dialog) => {
        console.log(`Dialog message: ${dialog.message()}`); 
        expect(dialog.message()).toBe('Do you confirm action?'); 
        await dialog.dismiss(); 
    });

    await alerts.clickAlertConfirmButton();
    const confirmResult = page.locator('#confirmResult');
    await expect(confirmResult).toHaveText('You selected Cancel');
});

test('Test Dialog Button "Enter Free Text"', async () => {

  const name = 'Ibrahim Gavazov';  

  // Listen for the prompt dialog
  page.once('dialog', async (dialog) => {
      console.log(`Dialog message: ${dialog.message()}`); 
      expect(dialog.message()).toBe('Please enter your name'); 
      await dialog.accept(name);
  });

  // Trigger the prompt dialog
  await alerts.clickAlertPrompButtonEnterText();

  // Verify the result message
  const promptResult = page.locator('#promptResult');
  await expect(promptResult).toHaveText(`You entered ${name}`); 
});

});