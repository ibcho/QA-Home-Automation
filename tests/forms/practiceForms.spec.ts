import { test, expect} from '@playwright/test';
import PracticeFormPage from '../../pages/Forms/PracticeFormPage';
import HomePage from '../../pages/HomePage';
import path from 'path';

let practiceFormPage: PracticeFormPage;
let homePage: HomePage;
test.setTimeout(60000); 
test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    practiceFormPage = new PracticeFormPage(page);

    // Navigate to the home page
    await homePage.navigateToHomePage();

    // Navigate to the Forms section
    await homePage.gotoForms();
    await practiceFormPage.selectPracticeForm();
});

test.describe('Practice Form Tests', () => {

    test('Verify mandatory fields validation', async () => {
        await practiceFormPage.clickSubmitButton()

        // Verify validation messages
        const firstNameValidation = practiceFormPage.page.locator('#firstName:invalid');
        const lastNameValidation = practiceFormPage.page.locator('#lastName:invalid');
        const mobileValidation = practiceFormPage.page.locator('#userNumber:invalid');
        const genderValidation = practiceFormPage.page.locator('input[name="gender"]:invalid');

        await expect(firstNameValidation).toBeVisible();
        await expect(mobileValidation).toBeVisible();
        await expect(lastNameValidation).toBeVisible();
        await expect(genderValidation).toHaveCount(3); // All radio buttons should be invalid
    });

    test('Fill the form with valid data and submit', async () => {
        // Fill in personal details
        await practiceFormPage.fillFirstName('Ibrahim');
        await practiceFormPage.fillLastName('Doe');
        await practiceFormPage.fillUserEmail('john.doe@example.com');
        await practiceFormPage.selectGender('Male');
        await practiceFormPage.fillMobile('1234567890');
        await practiceFormPage.fillDateOfBirth('July', '1990', '07');
        await practiceFormPage.fillSubjects('Maths');
        await practiceFormPage.selectHobbies(['hobbies-checkbox-1', 'hobbies-checkbox-2']); // Replace with actual IDs or labels

        // Upload picture
        const picturePath = path.join(__dirname, 'C:/Users/IbrahimGavazov/Projects/11.jpg');
      //  const picturePath = 'C:/Users/IbrahimGavazov/Projects/11.jpg'; // path to the picture
        await practiceFormPage.uploadPicture(picturePath);

        // Fill current address
        await practiceFormPage.fillCurrentAddress('123 Main Street, Kaimak chalan');

        // Select state and city
        await practiceFormPage.selectState('NCR');
        await practiceFormPage.selectCity('Noida');

        // Verify form submission
        await practiceFormPage.clickSubmitButton();
        await practiceFormPage.vefyFormSubmission()

        
    });

    test('Fill the form with different gender and hobbies', async () => {
        // Fill in personal details
        await practiceFormPage.fillFirstName('Jane');
        await practiceFormPage.fillLastName('Smith');
        await practiceFormPage.fillUserEmail('jane.smith@example.com');
        await practiceFormPage.selectGender('Female');
        await practiceFormPage.fillMobile('9876543210');

        // Select date of birth
        await practiceFormPage.fillDateOfBirth('December', '1985', '25');

        // Fill subjects
        await practiceFormPage.fillSubjects('Physics');

        // Select hobbies
        await practiceFormPage.selectHobbies(['hobbies-checkbox-3']); // Replace with actual IDs or labels

        // Upload picture
        const picturePath = 'C:/Users/IbrahimGavazov/Projects/11.jpg'; // Replace with the actual path to the picture
        await practiceFormPage.uploadPicture(picturePath);

        // Fill current address
        await practiceFormPage.fillCurrentAddress('456 Elm Street, Gotham');

        // Select state and city
        await practiceFormPage.selectState('Uttar Pradesh');
        await practiceFormPage.selectCity('Lucknow');

        // submit
        await practiceFormPage.clickSubmitButton();
        await practiceFormPage.vefyFormSubmission()
        
        
    });
});