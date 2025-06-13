import { test, expect } from '@playwright/test';
import HomePage from '../../pages/HomePage';
import AlertsFrameWindows from '../../pages/AlertsFrameWindows/AlersFrameWindows';
import Alerts from '../../pages/AlertsFrameWindows/Alerts';

const ALERT_MESSAGE = 'You clicked a button';
const ALERT_MESSAGE_DELAY = 'This alert appeared after 5 seconds';
const CONFIRM_MESSAGE = 'Do you confirm action?';
const PROMPT_MESSAGE = 'Please enter your name';

test.describe('Testing Alerts', () => {
    test('Test Alert', async ({ page }) => {
        const homePage = new HomePage(page);
        const alertsFrameWindows = new AlertsFrameWindows(page);
        const alerts = new Alerts(page);

        // Navigate to Alerts section
        await homePage.loadHomePage();
        await homePage.gotoAlertsFrameWindows();
        await alertsFrameWindows.navigateToAlerts();

        // Handle and verify alert
        await alerts.handleDialog('accept', ALERT_MESSAGE);
        await alerts.clickAlertButton();
    });

    test('Test Alert with delay of 5 seconds', async ({ page }) => {
        const homePage = new HomePage(page);
        const alertsFrameWindows = new AlertsFrameWindows(page);
        const alerts = new Alerts(page);

        // Navigate to Alerts section
        await homePage.loadHomePage();
        await homePage.gotoAlertsFrameWindows();
        await alertsFrameWindows.navigateToAlerts();

        // Handle and verify delayed alert
        await alerts.clickAlertButton5seconds();
        const dialog = await page.waitForEvent('dialog', { timeout: 6500 });
        console.log(`Dialog message: ${dialog.message()}`);
        expect(dialog.message()).toBe(ALERT_MESSAGE_DELAY);
        await dialog.accept();
    });

    test('Test Dialog Button "OK"', async ({ page }) => {
        const homePage = new HomePage(page);
        const alertsFrameWindows = new AlertsFrameWindows(page);
        const alerts = new Alerts(page);

        // Navigate to Alerts section
        await homePage.loadHomePage();
        await homePage.gotoAlertsFrameWindows();
        await alertsFrameWindows.navigateToAlerts();

        // Handle and verify confirm dialog
        await alerts.handleDialog('accept', CONFIRM_MESSAGE);
        await alerts.clickAlertConfirmButton();

        const confirmResult = page.locator('#confirmResult');
        await expect(confirmResult).toHaveText('You selected Ok');
    });

    test('Test Dialog Button "Cancel"', async ({ page }) => {
        const homePage = new HomePage(page);
        const alertsFrameWindows = new AlertsFrameWindows(page);
        const alerts = new Alerts(page);

        // Navigate to Alerts section
        await homePage.loadHomePage();
        await homePage.gotoAlertsFrameWindows();
        await alertsFrameWindows.navigateToAlerts();

        // Handle and verify cancel dialog
        await alerts.handleDialog('dismiss', CONFIRM_MESSAGE);
        await alerts.clickAlertConfirmButton();

        const confirmResult = page.locator('#confirmResult');
        await expect(confirmResult).toHaveText('You selected Cancel');
    });

    test('Test Dialog Button "Enter Free Text"', async ({ page }) => {
        const homePage = new HomePage(page);
        const alertsFrameWindows = new AlertsFrameWindows(page);
        const alerts = new Alerts(page);

        const name = 'Ibrahim Gavazov';

        // Navigate to Alerts section
        await homePage.loadHomePage();
        await homePage.gotoAlertsFrameWindows();
        await alertsFrameWindows.navigateToAlerts();

        // Handle and verify prompt dialog
        await alerts.handleDialog('accept', PROMPT_MESSAGE, name);
        await alerts.clickAlertPrompButtonEnterText();

        const promptResult = page.locator('#promptResult');
        await expect(promptResult).toHaveText(`You entered ${name}`);
    });
});