import { test, expect } from '@playwright/test';
import PracticeFormPage from '../../pages/Forms/PracticeFormPage';
import HomePage from '../../pages/HomePage';
import path from 'path';

// Centralized test data
const TEST_DATA = {
    firstName: 'Ibrahim',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    gender: 'Male' as 'Male' | 'Female' | 'Other',
    mobile: '1234567890',
    dob: { month: 'July', year: '1990', day: '07' },
    subjects: 'Maths',
    hobbies: ['hobbies-checkbox-1', 'hobbies-checkbox-2'],
    picture: path.resolve(__dirname, '../../testingFiles/11.jpg'),
    address: '123 Main Street, Kaimak chalan',
    state: 'NCR',
    city: 'Noida',
};

let homePage: HomePage;
let practiceFormPage: PracticeFormPage;

test.describe('Practice Form Tests', () => {
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        practiceFormPage = new PracticeFormPage(page);

        await test.step('Navigate to Practice Form', async () => {
            await homePage.loadHomePage();
            await homePage.gotoForms();
            await practiceFormPage.selectPracticeForm();
        });
    });

    test('Should show validation errors for empty mandatory fields', async () => {
        await test.step('Submit empty form and check validation', async () => {
            await practiceFormPage.clickSubmitButton();

            // Check all required fields for validation
            await expect(practiceFormPage.getFirstNameValidation()).toBeVisible();
            await expect(practiceFormPage.getLastNameValidation()).toBeVisible();
            await expect(practiceFormPage.getMobileValidation()).toBeVisible();
            // Gender radio buttons: at least one should be required
            await expect(practiceFormPage.getGenderValidation()).toHaveCount(3);
        });
    });

    test('Should submit form with valid data and show confirmation modal', async () => {
        await test.step('Fill out the form with valid data', async () => {
            await practiceFormPage.fillFirstName(TEST_DATA.firstName);
            await practiceFormPage.fillLastName(TEST_DATA.lastName);
            await practiceFormPage.fillUserEmail(TEST_DATA.email);
            await practiceFormPage.selectGender(TEST_DATA.gender);
            await practiceFormPage.fillMobile(TEST_DATA.mobile);
            await practiceFormPage.fillDateOfBirth(TEST_DATA.dob.month, TEST_DATA.dob.year, TEST_DATA.dob.day);
            await practiceFormPage.fillSubjects(TEST_DATA.subjects);
            await practiceFormPage.selectHobbies(TEST_DATA.hobbies);
            await practiceFormPage.uploadPicture(TEST_DATA.picture);
            await practiceFormPage.fillCurrentAddress(TEST_DATA.address);
            await practiceFormPage.selectState(TEST_DATA.state);
            await practiceFormPage.selectCity(TEST_DATA.city);
        });

        await test.step('Submit the form and verify confirmation modal', async () => {
            await practiceFormPage.clickSubmitButton();
            await practiceFormPage.verifyFormSubmission();

            // Assert that the modal contains submitted data
            const modal = practiceFormPage.getModalContent();
            await expect(modal).toContainText(TEST_DATA.firstName);
            await expect(modal).toContainText(TEST_DATA.lastName);
            await expect(modal).toContainText(TEST_DATA.email);
            await expect(modal).toContainText(TEST_DATA.gender);
            await expect(modal).toContainText(TEST_DATA.mobile);
            await expect(modal).toContainText(TEST_DATA.subjects);
            await expect(modal).toContainText('Sports'); // Assuming hobbies-checkbox-1 is Sports
            await expect(modal).toContainText('Reading'); // Assuming hobbies-checkbox-2 is Reading
            await expect(modal).toContainText('11.jpg');
            await expect(modal).toContainText(TEST_DATA.address);
            await expect(modal).toContainText(TEST_DATA.state);
            await expect(modal).toContainText(TEST_DATA.city);
        });
    });
});