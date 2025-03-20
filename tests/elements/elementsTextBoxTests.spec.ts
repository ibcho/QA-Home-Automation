import { test, expect, chromium, Browser, Page } from '@playwright/test';
import ElementsTextBoxPage from '../../pages/Elements/ElementsTextBoxPage';
import ElementsPage from '../../pages/Elements/ElementsPage';
import HomePage from '../../pages/HomePage';

let browser: Browser;
let page: Page;
let homePage: HomePage;
let elementsTextBoxPage: ElementsTextBoxPage;
let elementsPage: ElementsPage;

test.describe('Elements TextBox Tests', () => {
  test.beforeEach(async () => {
    browser = await chromium.launch();
    const context = await browser.newContext();
    page = await context.newPage();

    homePage = new HomePage(page);
    elementsTextBoxPage = new ElementsTextBoxPage(page);
    elementsPage = new ElementsPage(page);

    // Navigate to the home page
    await homePage.navigateToHomePage();
    // Navigate to the elements page
    await homePage.gotoElements();

    // Go to elements
    await elementsPage.navigateToTextBox();
    
    // Select the text box menu item
    await elementsTextBoxPage.selectTextBox();
    expect(await elementsTextBoxPage.isTextBoxHeaderVisible()).toBe(true);
  });

  test.afterEach(async () => {
    await page.close();
    await browser.close();
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