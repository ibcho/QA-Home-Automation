import { test, expect } from '@playwright/test';
import HomePage from '../../pages/HomePage';
import AlertsFrameWindows from '../../pages/AlertsFrameWindows/AlertsFrameWindows';
import Alerts from '../../pages/AlertsFrameWindows/Alerts';
import BrowserWindows from '../../pages/AlertsFrameWindows/BrowserWindows';
import ModalDialogs from '../../pages/AlertsFrameWindows/ModalDialogs';
import NestedFramesPage from '../../pages/AlertsFrameWindows/NestedFrames';

const ALERT_MESSAGE = 'You clicked a button';
const ALERT_MESSAGE_DELAY = 'This alert appeared after 5 seconds';
const CONFIRM_MESSAGE = 'Do you confirm action?';
const PROMPT_MESSAGE = 'Please enter your name';
const TEST_NAME = 'Ibrahim Gavazov';

test('Complete Alerts, Frame & Windows Regression Test', async ({ page, context }) => {
    const homePage = new HomePage(page);
    const alertsFrameWindows = new AlertsFrameWindows(page);
    const alerts = new Alerts(page);
    const browserWindows = new BrowserWindows(page);
    const modalDialogs = new ModalDialogs(page);
    const nestedFramesPage = new NestedFramesPage(page);

    await test.step('Navigate to Alerts, Frame & Windows section', async () => {
        await homePage.loadHomePage();
        await homePage.gotoAlertsFrameWindows();
    });

    await test.step('Browser Windows Tests', async () => {
        await alertsFrameWindows.navigateTo('Browser Windows');
        
        // Test new tab functionality
        await browserWindows.clickNewTabButton();
        await browserWindows.verifyNewTabOpened();
        
        // Test new window functionality
        await browserWindows.clickNewWindowButton();
        await browserWindows.verifyNewWindowOpened();
        await browserWindows.clickNewWindowMessage();
        
        // Close additional tabs/windows
        const pages = context.pages();
        for (const additionalPage of pages.slice(1)) {
            await additionalPage.close();
        }
    });

    await test.step('Alerts Tests', async () => {
        await alertsFrameWindows.navigateTo('Alerts');
        
        // Test basic alert
        await alerts.handleDialog('accept', ALERT_MESSAGE);
        await alerts.clickAlertButton();
        
        // Test delayed alert
        await alerts.clickAlertButton5seconds();
        const delayedDialog = await page.waitForEvent('dialog', { timeout: 6500 });
        expect(delayedDialog.message()).toBe(ALERT_MESSAGE_DELAY);
        await delayedDialog.accept();
        
        // Test confirm dialog - OK button
        await alerts.handleDialog('accept', CONFIRM_MESSAGE);
        await alerts.clickAlertConfirmButton();
        const confirmResult = page.locator('#confirmResult');
        await expect(confirmResult).toHaveText('You selected Ok');
        
        // Test confirm dialog - Cancel button
        await alerts.handleDialog('dismiss', CONFIRM_MESSAGE);
        await alerts.clickAlertConfirmButton();
        await expect(confirmResult).toHaveText('You selected Cancel');
        
        // Test prompt dialog with text input
        await alerts.handleDialog('accept', PROMPT_MESSAGE, TEST_NAME);
        await alerts.clickAlertPrompButtonEnterText();
        const promptResult = page.locator('#promptResult');
        await expect(promptResult).toHaveText(`You entered ${TEST_NAME}`);
    });

    await test.step('Modal Dialogs Tests', async () => {
        await alertsFrameWindows.navigateTo('Modal Dialogs');
        
        // Test small modal
        await modalDialogs.clickSmallModal();
        await modalDialogs.verifyModalHeader('Small Modal×Close');
        await modalDialogs.verifyModalBody('This is a small modal. It has very less content');
        await modalDialogs.clickCloseSmallModal();
        
        // Test large modal
        await modalDialogs.clickLargeModal();
        await modalDialogs.verifyModalHeader('Large Modal×Close');
        await modalDialogs.verifyModalBody(
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        );
        await modalDialogs.clickCloseLargeModal();
    });

    await test.step('Nested Frames Tests', async () => {
        await alertsFrameWindows.navigateTo('Nested Frames');
        
        // Verify parent frame content
        await nestedFramesPage.verifyParentFrameText('Parent frame');
        
        // Verify child frame content
        await nestedFramesPage.verifyChildFrameText('Child Iframe');
    });
}); 