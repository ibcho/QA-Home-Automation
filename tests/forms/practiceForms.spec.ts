// import { test, expect } from '@playwright/test';
// import PracticeFormPage from '../../pages/Forms/PracticeFormPage';
// import HomePage from '../../pages/HomePage';
// import path from 'path';

// let homePage: HomePage;
// let practiceFormPage: PracticeFormPage;

// test.beforeAll(async ({ page }) => {
//     homePage = new HomePage(page);
//     practiceFormPage = new PracticeFormPage(page);

//     // Navigate to the home page
//     await homePage.loadHomePage();

//     // Navigate to the Forms section
//     await homePage.gotoForms();
//     await practiceFormPage.selectPracticeForm();
// });

// test('Verify mandatory fields validation and form submission with valid data', async () => {
//     // Step 1: Verify mandatory fields validation
//     await practiceFormPage.clickSubmitButton();

//     // Verify validation messages
//     const firstNameValidation = practiceFormPage.page.locator('#firstName:invalid');
//     const lastNameValidation = practiceFormPage.page.locator('#lastName:invalid');
//     const mobileValidation = practiceFormPage.page.locator('#userNumber:invalid');
//     const genderValidation = practiceFormPage.page.locator('input[name="gender"]:invalid');

//     await expect(firstNameValidation).toBeVisible();
//     await expect(mobileValidation).toBeVisible();
//     await expect(lastNameValidation).toBeVisible();
//     await expect(genderValidation).toHaveCount(3); // All radio buttons should be invalid

//     // Step 2: Fill the form with valid data and submit
//     // Fill in personal details
//     await practiceFormPage.fillFirstName('Ibrahim');
//     await practiceFormPage.fillLastName('Doe');
//     await practiceFormPage.fillUserEmail('john.doe@example.com');
//     await practiceFormPage.selectGender('Male');
//     await practiceFormPage.fillMobile('1234567890');
//     await practiceFormPage.fillDateOfBirth('July', '1990', '07');
//     await practiceFormPage.fillSubjects('Maths');
//     await practiceFormPage.selectHobbies(['hobbies-checkbox-1', 'hobbies-checkbox-2']); // Replace with actual IDs or labels

//     const picturePath = path.resolve(__dirname, '../../testingFiles/11.jpg');
//     await practiceFormPage.uploadPicture(picturePath);

//     // Fill current address
//     await practiceFormPage.fillCurrentAddress('123 Main Street, Kaimak chalan');

//     // Select state and city
//     await practiceFormPage.selectState('NCR');
//     await practiceFormPage.selectCity('Noida');

//     // Verify form submission
//     await practiceFormPage.clickSubmitButton();
//     await practiceFormPage.vefyFormSubmission();
// });