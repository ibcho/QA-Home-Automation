import {test, expect} from '@playwright/test';
import ElementsPage from '../pages/ElementsPage';
import HomePage from '../pages/HomePage';

test('Fill all textbox fields in Elements page and submit', async ({page}) => {
    const elementsPage = new ElementsPage(page);
    const homePage = new HomePage(page);

    //enter fields info
    const fullName = 'ibrata gavaza';
    const email = 'ibragavaza@abv.bg'
    const currentAddress = 'Sofia, Bulgaria';
    const permanentAddress = 'Svishtov, Bulgaria';


    // Navigate to the home page
    await homePage.navigateToHomePage();
    // Navigate to the elements page
    await homePage.gotoElements();
    // Select the text box menu item
    await elementsPage.selectTextBox();
    expect(await elementsPage.isTextBoxHeaderVisible()).toBe(true);

    // Fill the text box form
    await elementsPage.fillAllTextBoxFormPage(fullName, email, currentAddress, permanentAddress);
    await elementsPage.submitForm();
    
    // Verify
    await elementsPage.expectFormSubmissionResults(fullName, email, currentAddress, permanentAddress);

});