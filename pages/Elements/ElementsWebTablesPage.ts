import { expect, Locator, Page } from "@playwright/test";

export default class WebTablesPage {
    readonly page: Page;

    // Elements on Web Tables Page
    readonly webTablesTitle: Locator;
    readonly addButton: Locator;
    readonly searchInput: Locator;
    readonly editButton: Locator;
    readonly deleteButton: Locator;
    
    // Elements on "Registration Form" / "Add" button
    readonly firstNameField: Locator;
    readonly lastNameField: Locator;
    readonly emailField: Locator;
    readonly ageField: Locator;
    readonly salaryField: Locator;
    readonly departmentField: Locator;

    // Labels on "Registration Form"
    readonly firstNameLabel: Locator;
    readonly lastNameLabel: Locator;
    readonly emailLabel: Locator;
    readonly ageLabel: Locator;
    readonly salaryLabel: Locator;
    readonly departmentLabel: Locator;
    readonly submitButton: Locator;
    readonly userForm: Locator; 

    constructor(page: Page) {
        this.page = page;
        this.webTablesTitle = page.locator('h1', { hasText: 'Web Tables' });
        this.addButton = page.locator('#addNewRecordButton');
        this.searchInput = page.locator('#searchBox');
        this.editButton = page.locator('.action-buttons .edit');
        this.deleteButton = page.locator('.action-buttons .delete');
        
        this.firstNameField = page.locator('#firstName');
        this.lastNameField = page.locator('#lastName');
        this.emailField = page.locator('#userEmail');
        this.ageField = page.locator('#age');
        this.salaryField = page.locator('#salary');
        this.departmentField = page.locator('#department');

        this.firstNameLabel = page.locator('#firstName-label');
        this.lastNameLabel = page.locator('#lastName-label');
        this.emailLabel = page.locator('#userEmail-label');
        this.ageLabel = page.locator('#age-label');
        this.salaryLabel = page.locator('#salary-label');
        this.departmentLabel = page.locator('#department-label');

        this.submitButton = page.locator('#submit');
        this.userForm = page.locator('#userForm');
    }

    // Method to check if the Web Tables title is visible
    async isWebTablesTitleVisible(): Promise<boolean> {
        return await this.webTablesTitle.isVisible();
    }

    // Method to verify the labels on the registration form
    async verifyRegistrationFormLabels(): Promise<void> {
        await expect(this.firstNameLabel).toBeVisible();
        await expect(this.firstNameLabel).toHaveText('First Name');
        await expect(this.lastNameLabel).toBeVisible();
        await expect(this.lastNameLabel).toHaveText('Last Name');
        await expect(this.emailLabel).toBeVisible();
        await expect(this.emailLabel).toHaveText('Email');
        await expect(this.ageLabel).toBeVisible();
        await expect(this.ageLabel).toHaveText('Age');
        await expect(this.salaryLabel).toBeVisible();
        await expect(this.salaryLabel).toHaveText('Salary');
        await expect(this.departmentLabel).toBeVisible();
        await expect(this.departmentLabel).toHaveText('Department');
    }

    // Method to submit the registration form with empty fields
    async submitEmptyRegistrationForm(): Promise<void> {
        await this.submitButton.click();
    }

    // Method to verify validation messages for empty fields
    async verifyInvalidFieldBorderColor(): Promise<void> {
        const invalidBorderColor = 'rgb(220, 53, 69)';
        await expect(this.firstNameField).toHaveCSS('border-color', invalidBorderColor);
        await expect(this.lastNameField).toHaveCSS('border-color', invalidBorderColor);
        await expect(this.emailField).toHaveCSS('border-color', invalidBorderColor);
        await expect(this.ageField).toHaveCSS('border-color', invalidBorderColor);
        await expect(this.salaryField).toHaveCSS('border-color', invalidBorderColor);
        await expect(this.departmentField).toHaveCSS('border-color', invalidBorderColor);
    }

    // Method to fill the registration form with valid data
    async fillRegistrationForm(firstName: string, lastName: string, email: string, age: string, salary: string, department: string): Promise<void> {
        await this.firstNameField.fill(firstName);
        await this.lastNameField.fill(lastName);
        await this.emailField.fill(email);
        await this.ageField.fill(age);
        await this.salaryField.fill(salary);
        await this.departmentField.fill(department);
    }

    // Method to verify that the fields have valid data
    async verifyValidFieldBorderColor(): Promise<void> {
        const validBorderColor = 'rgb(40, 167, 69)';
        await expect(this.firstNameField).toHaveCSS('border-color', validBorderColor);
        await expect(this.lastNameField).toHaveCSS('border-color', validBorderColor);
        await expect(this.emailField).toHaveCSS('border-color', validBorderColor);
        await expect(this.ageField).toHaveCSS('border-color', validBorderColor);
        await expect(this.salaryField).toHaveCSS('border-color', validBorderColor);
        await expect(this.departmentField).toHaveCSS('border-color', validBorderColor);
    }

    // Method to verify the maximum length of the fields
    async verifyFieldMaxLengths(): Promise<void> {
        await expect(this.firstNameField).toHaveAttribute('maxlength', '25');
        await expect(this.lastNameField).toHaveAttribute('maxlength', '25');
        await expect(this.ageField).toHaveAttribute('maxlength', '2');
        await expect(this.salaryField).toHaveAttribute('maxlength', '10');
        await expect(this.departmentField).toHaveAttribute('maxlength', '25');
    }

    // Method to verify email pattern validation
    async verifyEmailPatternValidation(): Promise<void> {
        const emailPattern = '^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$';
        await expect(this.emailField).toHaveAttribute('pattern', emailPattern);
    }

    // Method to verify age pattern validation
    async verifyAgePatternValidation(): Promise<void> {
        const agePattern = '\\d*';
        await expect(this.ageField).toHaveAttribute('pattern', agePattern);
    }

    // Search for a person
    async searchForPerson(firstName: string): Promise<void> {
        await this.searchInput.fill(firstName);
    }

    // Verify that person is visible 
    async verifyPersonIsVisible(firstName: string): Promise<void> {
        const newPersonRow = this.page.locator('div.rt-tr-group', { hasText: firstName });
        await expect(newPersonRow).toBeVisible();
        await expect(newPersonRow).toContainText(firstName);
    }


    // Method to create user with valid data and verify that the user is created
    async createNewPersonAndVerify(firstName: string, lastName: string, email: string, age: string, salary: string, department: string): Promise<void> {
        await this.fillRegistrationForm(firstName, lastName, email, age, salary, department);
        await this.submitForm();
    
        const newPersonRow = this.page.locator('div.rt-tr-group', { hasText: firstName });
        await expect(newPersonRow).toBeVisible();
        await expect(newPersonRow).toContainText(firstName);
        await expect(newPersonRow).toContainText(lastName);
        await expect(newPersonRow).toContainText(email);
        await expect(newPersonRow).toContainText(age);
        await expect(newPersonRow).toContainText(salary);
        await expect(newPersonRow).toContainText(department);
    }

    // Method to delete a person and verify that the person is deleted
    async deletePersonAndVerify(firstName: string): Promise<void> {
        const personRow = this.page.locator('div.rt-tr-group', { hasText: firstName });
        const deleteButton = personRow.locator('span[id^="delete-record-"]');
        await deleteButton.click();
        await expect(personRow).toBeHidden();
    }

    // Edit person and verify the changes
    async editPersonAndVerifyTheChanges(oldFirstName: string, newFirstName: string, newLastName: string, newEmail: string, newAge: string, newSalary: string, newDepartment: string): Promise<void> {
        const personRow = this.page.locator('div.rt-tr-group', { hasText: oldFirstName });
        const editButton = personRow.locator('span[id^="edit-record-"]');
        await editButton.click();
    
        // Fill in the new details
        await this.firstNameField.fill(newFirstName);
        await this.lastNameField.fill(newLastName);
        await this.emailField.fill(newEmail);
        await this.ageField.fill(newAge);
        await this.salaryField.fill(newSalary);
        await this.departmentField.fill(newDepartment);
    
        // Submit the form
        await this.submitForm();

        // Verify the changes
        const updatedPersonRow = this.page.locator('div.rt-tr-group', { hasText: newFirstName });
        await expect(updatedPersonRow).toBeVisible();
        await expect(updatedPersonRow).toContainText(newFirstName);
        await expect(updatedPersonRow).toContainText(newLastName);
        await expect(updatedPersonRow).toContainText(newEmail);
        await expect(updatedPersonRow).toContainText(newAge);
        await expect(updatedPersonRow).toContainText(newSalary);
        await expect(updatedPersonRow).toContainText(newDepartment);

    }

    // Method to submit the form
    async submitForm(): Promise<void> {
        await this.submitButton.click();
    }
}