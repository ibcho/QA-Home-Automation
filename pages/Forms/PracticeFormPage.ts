import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export default class PracticeFormPage extends BasePage {
    // Form input fields
    private readonly firstName: Locator;
    private readonly lastName: Locator;
    private readonly userEmail: Locator;
    private readonly mobile: Locator;
    private readonly dateOfBirth: Locator;
    private readonly subjects: Locator;
    private readonly picture: Locator;
    private readonly currentAddress: Locator;
    private readonly submitButton: Locator;

    // Gender radio buttons
    private readonly genderMale: Locator;
    private readonly genderFemale: Locator;
    private readonly genderOther: Locator;

    // Dropdown selectors
    private readonly state: Locator;
    private readonly city: Locator;

    // Hobbies checkboxes
    private readonly hobbies: Locator;

    constructor(page: Page) {
        super(page);
        
        // Initialize form fields
        this.firstName = page.locator('#firstName');
        this.lastName = page.locator('#lastName');
        this.userEmail = page.locator('#userEmail');
        this.mobile = page.locator('#userNumber');
        this.dateOfBirth = page.locator('#dateOfBirthInput');
        this.subjects = page.locator('#subjectsInput');
        this.picture = page.locator('#uploadPicture');
        this.currentAddress = page.locator('#currentAddress');
        this.submitButton = page.locator('#submit');

        // Initialize gender radio buttons
        this.genderMale = page.locator('input[name="gender"][value="Male"]');
        this.genderFemale = page.locator('input[name="gender"][value="Female"]');
        this.genderOther = page.locator('input[name="gender"][value="Other"]');

        // Initialize dropdown selectors
        this.state = page.locator('#state svg');
        this.city = page.locator('#city svg');

        // Initialize hobbies
        this.hobbies = page.locator('.custom-checkbox');
    }

    /**
     * Navigate to Practice Form section
     */
    async selectPracticeForm(): Promise<void> {
        await this.safeClick(this.page.locator('text=Practice Form'));
    }

    /**
     * Fill first name field
     */
    async fillFirstName(firstName: string): Promise<void> {
        await this.safeFill(this.firstName, firstName);
    }

    /**
     * Fill last name field
     */
    async fillLastName(lastName: string): Promise<void> {
        await this.safeFill(this.lastName, lastName);
    }

    /**
     * Fill email field
     */
    async fillUserEmail(userEmail: string): Promise<void> {
        await this.safeFill(this.userEmail, userEmail);
    }

    /**
     * Select gender with improved error handling
     */
    async selectGender(gender: 'Male' | 'Female' | 'Other'): Promise<void> {
        const genderMap = {
            'Male': 1,
            'Female': 2,
            'Other': 3
        };
        
        const labelLocator = this.page.locator(`label[for="gender-radio-${genderMap[gender]}"]`);
        await this.safeClick(labelLocator);
    }

    /**
     * Fill mobile number field
     */
    async fillMobile(mobile: string): Promise<void> {
        await this.safeFill(this.mobile, mobile);
    }

    /**
     * Fill date of birth with improved error handling
     */
    async fillDateOfBirth(month: string, year: string, day: string): Promise<void> {
        await this.safeClick(this.dateOfBirth);

        const monthDropdown = this.page.locator('.react-datepicker__month-select');
        await monthDropdown.selectOption({ label: month });

        const yearDropdown = this.page.locator('.react-datepicker__year-select');
        await yearDropdown.selectOption({ label: year });

        const dayLocator = this.page.locator(`.react-datepicker__day--0${day}`).first();
        await this.safeClick(dayLocator);
    }

    /**
     * Fill subjects field with improved error handling
     */
    async fillSubjects(subjects: string): Promise<void> {
        try {
            await this.safeFill(this.subjects, subjects);
            await this.subjects.press('Enter');
        } catch (error) {
            console.log(`Error filling subjects, trying alternative approach: ${error}`);
            // Alternative approach: click and type
            await this.safeClick(this.subjects);
            await this.page.keyboard.type(subjects);
            await this.page.keyboard.press('Enter');
        }
    }

    /**
     * Select hobbies with improved error handling
     */
    async selectHobbies(hobbies: string[]): Promise<void> {
        for (const hobby of hobbies) {
            const hobbyLocator = this.page.locator(`.custom-checkbox label[for="${hobby}"]`);
            await this.safeClick(hobbyLocator);
        }
    }

    /**
     * Upload picture file
     */
    async uploadPicture(picturePath: string): Promise<void> {
        await this.waitForElement(this.picture);
        await this.picture.setInputFiles(picturePath);
    }

    /**
     * Fill current address field
     */
    async fillCurrentAddress(currentAddress: string): Promise<void> {
        await this.safeFill(this.currentAddress, currentAddress);
    }

    /**
     * Select state from dropdown
     */
    async selectState(state: string): Promise<void> {
        await this.safeClick(this.state);
        const stateOption = this.page.getByText(state, { exact: true });
        await this.safeClick(stateOption);
    }

    /**
     * Select city from dropdown
     */
    async selectCity(city: string): Promise<void> {
        await this.safeClick(this.city);
        const cityOption = this.page.getByText(city, { exact: true });
        await this.safeClick(cityOption);
    }

    /**
     * Click submit button
     */
    async clickSubmitButton(): Promise<void> {
        await this.safeClick(this.submitButton);
    }

    /**
     * Verify form submission success (FIXED: was "vefyFormSubmission")
     */
    async verifyFormSubmission(): Promise<void> {
        const successMessage = this.page.locator('#example-modal-sizes-title-lg');
        await this.verifyText(successMessage, 'Thanks for submitting the form');
    }

    /**
     * Fill complete form with all required data
     */
    async fillCompleteForm(formData: {
        firstName: string;
        lastName: string;
        email: string;
        gender: 'Male' | 'Female' | 'Other';
        mobile: string;
        dob: { month: string; year: string; day: string };
        subjects: string;
        hobbies: string[];
        picturePath: string;
        address: string;
        state: string;
        city: string;
    }): Promise<void> {
        await this.fillFirstName(formData.firstName);
        await this.fillLastName(formData.lastName);
        await this.fillUserEmail(formData.email);
        await this.selectGender(formData.gender);
        await this.fillMobile(formData.mobile);
        await this.fillDateOfBirth(formData.dob.month, formData.dob.year, formData.dob.day);
        await this.fillSubjects(formData.subjects);
        await this.selectHobbies(formData.hobbies);
        await this.uploadPicture(formData.picturePath);
        await this.fillCurrentAddress(formData.address);
        await this.selectState(formData.state);
        await this.selectCity(formData.city);
    }

    // Validation element getters for testing
    getFirstNameValidation() {
        return this.page.locator('#firstName:invalid');
    }

    getLastNameValidation() {
        return this.page.locator('#lastName:invalid');
    }

    getMobileValidation() {
        return this.page.locator('#userNumber:invalid');
    }

    getGenderValidation() {
        return this.page.locator('input[name="gender"]:invalid');
    }

    getModalContent() {
        return this.page.locator('.modal-content');
    }
}