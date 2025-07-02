import { test, expect } from '@playwright/test';
import PracticeFormPage from '../../pages/Forms/PracticeFormPage';
import HomePage from '../../pages/HomePage';
import path from 'path';

// Simple test data
const TEST_DATA = {
    firstName: 'Ibrahim',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    gender: 'Male' as 'Male' | 'Female' | 'Other',
    mobile: '1234567890',
    dob: { month: 'July', year: '1990', day: '07' },
    //subjects: ['Maths', 'English', 'Physics'],
    hobbies: ['hobbies-checkbox-1', 'hobbies-checkbox-2'],
    picture: path.resolve(__dirname, '../../testingFiles/11.jpg'),
    address: '123 Main Street, Kaimak chalan',
    state: 'NCR',
    city: 'Noida',
    hobbyLabels: ['Sports', 'Reading'], // for assertion
};

test.describe.serial('Practice Form Tests', () => {
    let homePage: HomePage;
    let practiceFormPage: PracticeFormPage;

    test.beforeEach(async ({ page }) => {
        page.on('console', msg => {
            if (msg.type() === 'error') {
                console.log('BROWSER ERROR:', msg.text());
            }
        });
        homePage = new HomePage(page);
        practiceFormPage = new PracticeFormPage(page);
        await homePage.loadHomePage();
        await homePage.gotoForms();
        await practiceFormPage.selectPracticeForm();
    });

    test('Shows validation errors for empty mandatory fields', async () => {
        await practiceFormPage.clickSubmitButton();
        await expect(practiceFormPage.getFirstNameValidation()).toBeVisible();
        await expect(practiceFormPage.getLastNameValidation()).toBeVisible();
        await expect(practiceFormPage.getMobileValidation()).toBeVisible();
        await expect(practiceFormPage.getGenderValidation()).toHaveCount(3);
    });

    test('Submits form with valid data and shows confirmation modal', async () => {

        await practiceFormPage.fillFirstName(TEST_DATA.firstName);
        await practiceFormPage.fillLastName(TEST_DATA.lastName);
        await practiceFormPage.fillUserEmail(TEST_DATA.email);
        await practiceFormPage.fillMobile(TEST_DATA.mobile);
        await practiceFormPage.selectGender(TEST_DATA.gender);
        await practiceFormPage.fillMobile(TEST_DATA.mobile);
        await practiceFormPage.fillDateOfBirth(TEST_DATA.dob.month, TEST_DATA.dob.year, TEST_DATA.dob.day);
        //await practiceFormPage.fillSubjects(TEST_DATA.subjects);
        await practiceFormPage.selectHobbies(TEST_DATA.hobbies);
        await practiceFormPage.uploadPicture(TEST_DATA.picture);
        await practiceFormPage.fillCurrentAddress(TEST_DATA.address);
        await practiceFormPage.selectState(TEST_DATA.state);

    });
});