import { test, expect } from '@playwright/test';
import WebTablesPage from '../../pages/Elements/ElementsWebTablesPage';
import HomePage from '../../pages/HomePage';
import ElementsPage from '../../pages/Elements/ElementsPage';

test('Verify all web table functionalities', async ({ page }) => {
    const homePage = new HomePage(page);
    const elementsPage = new ElementsPage(page);
    const webTablesPage = new WebTablesPage(page);

    // Navigate to the Web Tables section
    await homePage.loadHomePage();
    await homePage.gotoElements();
    await elementsPage.navigateToWebTables();
    expect(await webTablesPage.isWebTablesTitleVisible()).toBe(true);

    // Verify form labels
    await webTablesPage.addButton.click();
    await webTablesPage.verifyRegistrationFormLabels();
    await webTablesPage.verifyFieldMaxLengths();
    await webTablesPage.verifyEmailPatternValidation();
    await webTablesPage.verifyAgePatternValidation();
    await webTablesPage.submitEmptyRegistrationForm();
    await webTablesPage.verifyInvalidFieldBorderColor();

    // Verify valid fields after entering data
    await webTablesPage.fillRegistrationForm('Ibrahim', 'Gavazov', 'ibrahim@example.com', '30', '50000', 'Engineering');
    await webTablesPage.verifyValidFieldBorderColor();

    // Create a new person and verify
    const firstName = 'John';
    const lastName = 'Doe';
    const email = 'john.doe@example.com';
    const age = '25';
    const salary = '60000';
    const department = 'IT';
    await webTablesPage.createNewPersonAndVerify(firstName, lastName, email, age, salary, department);

    // Delete a person and verify
    const deleteFirstName = 'Cierra';
    await webTablesPage.deletePersonAndVerify(deleteFirstName);

    // Edit a person and verify
    const oldFirstName = 'Alden';
    const newFirstName = 'Jane';
    const newLastName = 'Smith';
    const newEmail = 'jane.smith@example.com';
    const newAge = '30';
    const newSalary = '70000';
    const newDepartment = 'HR';
    await webTablesPage.editPersonAndVerifyTheChanges(oldFirstName, newFirstName, newLastName, newEmail, newAge, newSalary, newDepartment);
});