import { test, expect } from '@playwright/test';
import HomePage from '../pages/HomePage';
import ElementsTextBoxPage from '../pages/ElementsTextBoxPage';

test.describe('Elements TextBox Tests', () => {
  let homePage: HomePage;
  let elementsTextBoxPage: ElementsTextBoxPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    elementsTextBoxPage = new ElementsTextBoxPage(page);

    // Navigate to the home page
    await homePage.navigateToHomePage();
    // Navigate to the elements page
    await homePage.gotoElements();
    // Select the text box menu item
    await elementsTextBoxPage.selectTextBox();
    expect(await elementsTextBoxPage.isTextBoxHeaderVisible()).toBe(true);
  });

  test('Fill all textbox fields in Elements page and submit', async () => {
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
  });
});