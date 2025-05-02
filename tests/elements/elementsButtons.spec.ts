import { test, expect } from '@playwright/test';
import ButtonsPage from '../../pages/Elements/ElementsButtonsPage';
import ElementsPage from '../../pages/Elements/ElementsPage';
import HomePage from '../../pages/HomePage';

test('Verify button actions and messages', async ({ page }) => {
    const homePage = new HomePage(page);
    const elementsPage = new ElementsPage(page);
    const buttonsPage = new ButtonsPage(page);

    // Navigate to the Buttons section
    await homePage.loadHomePage();
    await homePage.gotoElements();
    await elementsPage.navigateToButtons();

    // Verify double click message
    await buttonsPage.performDoubleClick();
    await buttonsPage.verifyDoubleClickMessage('You have done a double click');

    // Verify right click message 
    await buttonsPage.performRightClick();
    await buttonsPage.verifyRightClickMessage('You have done a right click');

    // Verify click me message
    await buttonsPage.performClickMe();
    await buttonsPage.verifyClickMeMessage('You have done a dynamic click');
});