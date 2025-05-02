import { test, expect } from '@playwright/test';
import ElementsDynamicProperties from '../../pages/Elements/ElementsDynamicProperties';
import HomePage from '../../pages/HomePage';
import ElementsPage from '../../pages/Elements/ElementsPage';

test('Verify all dynamic properties functionalities', async ({ page }) => {
    const homePage = new HomePage(page);
    const elementsPage = new ElementsPage(page);
    const elementsDynamicProperties = new ElementsDynamicProperties(page);

    // Navigate to the Dynamic Properties section
    await homePage.loadHomePage();
    await homePage.gotoElements();
    await elementsPage.navigateToDynamicProperties();

    // Verify text with random ID is visible
    await elementsDynamicProperties.verifyTextWithRandomIdVisible();

    // Verify button is enabled after five seconds
    await elementsDynamicProperties.verifyButtonEnabledAfterFiveSeconds();

    // Verify button color changes to text-danger after five seconds
    await elementsDynamicProperties.verifyButtonColorChange();

    // Verify button is visible after five seconds
    await elementsDynamicProperties.verifyButtonVisibleAfterFiveSeconds();
});