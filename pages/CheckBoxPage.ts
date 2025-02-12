import { Locator, Page } from "@playwright/test";

// filepath: /c:/Users/IbrahimGavazov/Projects/QA-Home-Automation/pages/CheckBoxPage.ts
export default class CheckBoxPage {
  readonly page: Page;
  readonly checkBoxTitle: Locator;
  readonly checkBoxHome: Locator;
  readonly checkBoxIconChecked: Locator;
  readonly checkBoxIconUnchecked: Locator;
  readonly toggleButtonHome: Locator;
  readonly collapsedCheckBoxHome: Locator;
  readonly expandedCheckBoxHome: Locator;
  readonly selectedHomeCheckBoxResult: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkBoxTitle = page.locator('span.rct-title', { hasText: 'Home' });
    this.checkBoxHome = page.locator('label[for="tree-node-home"]');
    this.checkBoxIconChecked = page.locator('label[for="tree-node-home"] svg.rct-icon.rct-icon-check');
    this.checkBoxIconUnchecked = page.locator('label[for="tree-node-home"] svg.rct-icon.rct-icon-uncheck');
    this.toggleButtonHome = page.getByRole('button', { name: 'Toggle' }).first()
    this.collapsedCheckBoxHome = page.locator('li.rct-node.rct-node-parent.rct-node-collapsed:has(span.rct-title:has-text("Home"))');
    this.expandedCheckBoxHome = page.locator('li.rct-node.rct-node-parent.rct-node-expanded:has(span.rct-title:has-text("Home"))');
    this.selectedHomeCheckBoxResult = page.locator('#result .text-success');
  }

  async toggleCheckBox() {
    await this.checkBoxHome.click();
  }

  async expandCheckBoxHome() {
    await this.toggleButtonHome.click();
  }

  async closeCheckBoxHome() {
    await this.toggleButtonHome.click();
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

  async isCheckBoxHomeCollapsed(): Promise<boolean> {
    return await this.collapsedCheckBoxHome.isVisible();
  }

  async isCheckBoxHomeExpanded(): Promise<boolean> {
    return await this.expandedCheckBoxHome.isVisible();
  }

  async validateSelectedElements(expectedElements: string[]): Promise<boolean>{
    const elements = await this.selectedHomeCheckBoxResult.allTextContents();
    return expectedElements.every(element => elements.includes(element));
  }
}