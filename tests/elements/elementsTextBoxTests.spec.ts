import { test, expect, chromium } from '@playwright/test';
import ElementsTextBoxPage from '../../pages/Elements/ElementsTextBoxPage';
import ElementsPage from '../../pages/Elements/ElementsPage';
import HomePage from '../../pages/HomePage';

test('Fill all textbox fields in Elements page and submit', async () => {
    // Launch the browser and create a new page
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    // Initialize page objects
    const homePage = new HomePage(page);
    const elementsTextBoxPage = new ElementsTextBoxPage(page);
    const elementsPage = new ElementsPage(page);

    // Navigate to the home page
    await homePage.loadHomePage();

    // Navigate to the elements page
    await homePage.gotoElements();

    // Go to the TextBox section
    await elementsPage.navigateToTextBox();
    await elementsTextBoxPage.selectTextBox();
    expect(await elementsTextBoxPage.isTextBoxHeaderVisible()).toBe(true);

    // Enter fields info
    const fullName = 'ibrata gavaza';
    const email = 'ibragavaza@abv.bg';
    const currentAddress = 'Sofia, Bulgaria';
    const permanentAddress = 'Svishtov, Bulgaria';

    // Fill the text box form
    await elementsTextBoxPage.fillAllTextBoxFormPage(fullName, email, currentAddress, permanentAddress);
    await elementsTextBoxPage.submitForm();

    // Verify form submission results
    await elementsTextBoxPage.expectFormSubmissionResults(fullName, email, currentAddress, permanentAddress);

    // Close the browser
    await browser.close();
});