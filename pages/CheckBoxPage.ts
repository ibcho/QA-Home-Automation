import { Locator, Page } from "@playwright/test";

// filepath: /c:/Users/IbrahimGavazov/Projects/QA-Home-Automation/pages/CheckBoxPage.ts
export default class CheckBoxPage {
  readonly page: Page;
  readonly checkBoxTitle: Locator;
  readonly checkBoxHome: Locator;
  readonly checkBoxIconChecked: Locator;
  readonly checkBoxIconUnchecked: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkBoxTitle = page.locator('span.rct-title', { hasText: 'Home' });
    this.checkBoxHome = page.locator('label[for="tree-node-home"]');
    this.checkBoxIconChecked = page.locator('label[for="tree-node-home"] svg.rct-icon.rct-icon-check');
    this.checkBoxIconUnchecked = page.locator('label[for="tree-node-home"] svg.rct-icon.rct-icon-uncheck');
  }

  async toggleCheckBox() {
    await this.checkBoxHome.click();
  }

  async isCheckBoxTitleVisible(): Promise<boolean> {
    return await this.checkBoxTitle.isVisible();
  }

  async isCheckBoxChecked(): Promise<boolean> {
    return await this.checkBoxIconChecked.isVisible();
  }

  async isCheckBoxUnchecked(): Promise<boolean> {
    return await this.checkBoxIconUnchecked.isVisible();
  }

  async isCheckBoxTitleContainsHome(): Promise<boolean> {
    const textContent = await this.checkBoxTitle.textContent();
    return textContent?.includes('Home') ?? false;
  }
}