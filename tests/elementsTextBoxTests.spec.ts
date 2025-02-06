import {test, expect} from '@playwright/test';
import HomePage from '../pages/HomePage';
import ElementsTextBoxPage from '../pages/ElementsTextBoxPage';

test('Fill all textbox fields in Elements page and submit', async ({page}) => {
    const homePage = new HomePage(page);
    const elementsTextBoxPage = new ElementsTextBoxPage(page);

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
    await elementsTextBoxPage.selectTextBox();
    expect(await elementsTextBoxPage.isTextBoxHeaderVisible()).toBe(true);

    // Fill the text box form
    await elementsTextBoxPage.fillAllTextBoxFormPage(fullName, email, currentAddress, permanentAddress);
    await elementsTextBoxPage.submitForm();
    
    // Verify
    await elementsTextBoxPage.expectFormSubmissionResults(fullName, email, currentAddress, permanentAddress);

});