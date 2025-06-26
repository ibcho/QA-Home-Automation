import { test } from '@playwright/test';
import AlertsFrameWindows from '../../pages/AlertsFrameWindows/AlersFrameWindows';
import HomePage from '../../pages/HomePage';
import ModalDialogs from '../../pages/AlertsFrameWindows/ModalDialogs';

test.describe('Verify modal dialogs', () => {
    test('Verify that small modal is displayed with the proper text', async ({ page }) => {
        const homePage = new HomePage(page);
        const alertsFrameWindows = new AlertsFrameWindows(page);
        const modalDialogs = new ModalDialogs(page);

        // Navigate to Modal Dialogs section
        await homePage.loadHomePage();
        await homePage.gotoAlertsFrameWindows();
        await alertsFrameWindows.navigateToModalDialogs();

        // Verify the small modal
        await modalDialogs.clickSmallModal();
        await modalDialogs.verifyModalHeader('Small Modal×Close');
        await modalDialogs.verifyModalBody('This is a small modal. It has very less content');
        await modalDialogs.clickCloseSmallModal();
    });

    test('Verify that large modal is displayed with the proper text', async ({ page }) => {
        const homePage = new HomePage(page);
        const alertsFrameWindows = new AlertsFrameWindows(page);
        const modalDialogs = new ModalDialogs(page);

        // Navigate to Modal Dialogs section
        await homePage.loadHomePage();
        await homePage.gotoAlertsFrameWindows();
        await alertsFrameWindows.navigateToModalDialogs();

        // Verify the large modal
        await modalDialogs.clickLargeModal();
        await modalDialogs.verifyModalHeader('Large Modal×Close');
        await modalDialogs.verifyModalBody(
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        );
        await modalDialogs.clickCloseLargeModal();
    });
});