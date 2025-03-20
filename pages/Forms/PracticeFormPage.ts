import { expect, Locator, Page } from "@playwright/test";

export default class PracticeFormPage {
    readonly page: Page;

    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly userEmail: Locator;
    readonly genderMale: Locator;
    readonly genderFemale: Locator;
    readonly genderOther: Locator;
    readonly mobile: Locator;
    readonly dateOfBirth: Locator;
    readonly subjects: Locator;
    readonly hobbies: Locator;
    readonly picture: Locator;
    readonly currentAddress: Locator;
    readonly state: Locator;
    readonly city: Locator;
    readonly submitButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstName = page.locator('#firstName');
        this.lastName = page.locator('#lastName');
        this.userEmail = page.locator('#userEmail');

        this.genderMale = page.locator('input[name="gender"][value="Male"]');
        this.genderFemale = page.locator('input[name="gender"][value="Female"]');
        this.genderOther = page.locator('input[name="gender"][value="Other"]');

        this.mobile = page.locator('#userNumber');
        this.dateOfBirth = page.locator('#dateOfBirthInput');
        this.subjects = page.locator('#subjectsInput');
        this.hobbies = page.locator('.custom-checkbox');
        this.picture = page.locator('#uploadPicture');
        this.currentAddress = page.locator('#currentAddress');
        this.state = page.locator('#state');
        this.city = page.locator('#city');
        this.submitButton = page.locator('#submit');
    }

    async selectPracticeForm(){
        await this.page.click('text=Practice Form');
    }

    async fillFirstName(firstName: string) {
        await this.firstName.fill(firstName);
    }

    async fillLastName(lastName: string) {
        await this.lastName.fill(lastName);
    }

    async fillUserEmail(userEmail: string) {
        await this.userEmail.fill(userEmail);
    }

    // Method to select a gender
    async selectGender(gender: 'Male' | 'Female' | 'Other') {
        const labelLocator = this.page.locator(`label[for="gender-radio-${gender === 'Male' ? 1 : gender === 'Female' ? 2 : 3}"]`);
        await labelLocator.waitFor({ state: 'visible' }); // Wait for the label to be visible
        await labelLocator.click(); // Click the label
    }

    async fillMobile(mobile: string) {
        await this.mobile.fill(mobile);
    }

    async fillDateOfBirth(month: string, year: string, day: string) {
        await this.dateOfBirth.click();

        const monthDropdown = this.page.locator('.react-datepicker__month-select');
        await monthDropdown.selectOption({ label: month });

        // Select the year
        const yearDropdown = this.page.locator('.react-datepicker__year-select');
        await yearDropdown.selectOption({ label: year });

        // Select the day
        const dayLocator = this.page.locator(`.react-datepicker__day--0${day}`).first();
        await dayLocator.click();
    }

    async fillSubjects(subjects: string) {
        await this.subjects.fill(subjects); 
        await this.subjects.press('Enter'); 
    }

    async selectHobbies(hobbies: string[]) {
        for (const hobby of hobbies) {
            const hobbyLocator = this.page.locator(`.custom-checkbox label[for="${hobby}"]`);
            await hobbyLocator.click({ force: true });
        }
    }

    async uploadPicture(picturePath: string) {
        await this.picture.setInputFiles(picturePath);
    }

    async fillCurrentAddress(currentAddress: string) {
        await this.currentAddress.fill(currentAddress);
    }

    async selectState(state: string) {
        await this.state.click()
        const stateOption = this.page.getByText(`${state}`, { exact: true });
        await stateOption.click();
    }

    async selectCity(city: string) {
        await this.city.click();
        const cityOption = this.page.getByText(`${city}`, { exact: true });
        await cityOption.click();
    }

    async clickSubmitButton() {
        await this.submitButton.click();
    }

    async vefyFormSubmission() {
        const successMessage = this.page.locator('#example-modal-sizes-title-lg');
        await expect(successMessage).toHaveText('Thanks for submitting the form');  
    } 
}