import { expect, Locator, Page } from "@playwright/test";
import ElementsPage from '../pages/ElementsPage';

export default class ElementsTextBoxPage extends ElementsPage {
  readonly page: Page;
  readonly textBoxHeader: Locator;
  readonly textBoxMenuItem: Locator;
  readonly fullName: Locator;
  readonly email: Locator;
  readonly currentAddress: Locator;
  readonly permanentAddress: Locator;
  readonly submit: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.textBoxHeader = page.locator('h1.text-center', { hasText: 'Text Box' });
    this.textBoxMenuItem = page.locator('li.btn.btn-light', { hasText: 'Text Box' });
    this.fullName = page.locator('input[placeholder="Full Name"]');
    this.email = page.locator('input[type="email"]');
    this.currentAddress = page.locator('textarea[placeholder="Current Address"][rows="5"]');
    this.permanentAddress = page.locator("#permanentAddress");
    this.submit = page.locator("#submit");
  }

  // Navigation method
  async selectTextBox() {
    await this.textBoxMenuItem.click();
  }

  // Visibility check method
  async isTextBoxHeaderVisible(): Promise<boolean> {
    return await this.textBoxHeader.isVisible();
  }

  // Form filling method
  async fillAllTextBoxFormPage(fullName: string, email: string, currentAddress: string, permanentAddress: string) {
    await this.fullName.fill(fullName);
    await this.email.fill(email);
    await this.currentAddress.fill(currentAddress);
    await this.permanentAddress.fill(permanentAddress);
  }

  // Form submission method
  async submitForm() {
    await this.submit.click();
  }

  // Form submission result validation method
  async expectFormSubmissionResults(fullName: string, email: string, currentAddress: string, permanentAddress: string) {
    const nameResult = this.page.locator('#name');
    const emailResult = this.page.locator('#email');
    const currentAddressResult = this.page.locator('#currentAddress').nth(1);
    const permanentAddressResult = this.page.locator('#permanentAddress').nth(1);

    await expect(nameResult).toBeVisible();
    await expect(nameResult).toHaveText(`Name:${fullName}`);
    await expect(emailResult).toBeVisible();
    await expect(emailResult).toHaveText(`Email:${email}`);
    await expect(currentAddressResult).toBeVisible();
    await expect(currentAddressResult).toHaveText(`Current Address :${currentAddress}`);
    await expect(permanentAddressResult).toBeVisible();
    await expect(permanentAddressResult).toHaveText(`Permananet Address :${permanentAddress}`);
  }
}