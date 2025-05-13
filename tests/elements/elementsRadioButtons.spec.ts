import { test, expect } from '@playwright/test';
import ElementsRadioButtonsPage from '../../pages/Elements/ElementsRadioButtonsPage';
import ElementsPage from '../../pages/Elements/ElementsPage';
import HomePage from '../../pages/HomePage';

test('Verify all radio button functionalities', async ({ page }) => {
    const homePage = new HomePage(page);
    const elementsPage = new ElementsPage(page);
    const radioButtonsPage = new ElementsRadioButtonsPage(page);

    // Navigate to the Radio Buttons section
    await homePage.loadHomePage();
    await homePage.gotoElements();
    await elementsPage.navigateToRadioButton();

    // Verify the radio buttons title is visible
    expect(await radioButtonsPage.isRadioButtonsTitleVisible()).toBeTruthy();

    // Test: Select "yes" radio button
    await radioButtonsPage.selectRadioButton('yes');
    expect(await radioButtonsPage.isRadioButtonSelected('yes')).toBeTruthy();
    expect(await radioButtonsPage.getSelectedRadioButtonText()).toBe('Yes');

    // Test: Select "impressive" radio button
    await radioButtonsPage.selectRadioButton('impressive');
    expect(await radioButtonsPage.isRadioButtonSelected('impressive')).toBeTruthy();
    expect(await radioButtonsPage.getSelectedRadioButtonText()).toBe('Impressive');

    // Test: Ensure "yes" is not selected when "impressive" is selected
    expect(await radioButtonsPage.isRadioButtonSelected('yes')).toBeFalsy();

    // Test: Ensure "impressive" is not selected when "yes" is selected
    await radioButtonsPage.selectRadioButton('yes');
    expect(await radioButtonsPage.isRadioButtonSelected('impressive')).toBeFalsy();
    expect(await radioButtonsPage.isRadioButtonDisabled('no')).toBeTruthy();
});