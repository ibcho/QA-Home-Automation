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
  readonly expandAllButton: Locator;
  readonly collapseAllButton: Locator;
  readonly expandedDesktopNode: Locator;
  readonly expandedDocumentsNode: Locator;
  readonly expandedOfficeNode: Locator;
  readonly expandedDownloadNode: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkBoxTitle = page.locator('span.rct-title', { hasText: 'Home' });
    this.checkBoxHome = page.locator('label[for="tree-node-home"]');
    this.checkBoxIconChecked = page.locator('label[for="tree-node-home"] svg.rct-icon.rct-icon-check');
    this.checkBoxIconUnchecked = page.locator('label[for="tree-node-home"] svg.rct-icon.rct-icon-uncheck');
    this.toggleButtonHome = page.getByRole('button', { name: 'Toggle' }).first();
    this.collapsedCheckBoxHome = page.locator('li.rct-node.rct-node-parent.rct-node-collapsed:has(span.rct-title:has-text("Home"))');
    this.expandedCheckBoxHome = page.locator('li.rct-node.rct-node-parent.rct-node-expanded:has(span.rct-title:has-text("Home"))');
    this.selectedHomeCheckBoxResult = page.locator('#result .text-success');
    this.expandAllButton = page.locator('button[aria-label="Expand all"][title="Expand all"]');
    this.collapseAllButton = page.locator('button[aria-label="Collapse all"][title="Collapse all"]');
    this.expandedDesktopNode = page.locator('li.rct-node.rct-node-parent.rct-node-expanded:has(span.rct-title:has-text("Desktop")):nth-of-type(1) span.rct-title:has-text("Desktop")');
    this.expandedDocumentsNode = page.locator('li.rct-node.rct-node-parent.rct-node-expanded:has(span.rct-title:has-text("Documents")):nth-of-type(1) span.rct-title:has-text("Documents")');
    this.expandedOfficeNode = page.locator('li.rct-node.rct-node-parent.rct-node-expanded:has(span.rct-title:has-text("Office")):nth-of-type(1) span.rct-title:has-text("Office")');
    this.expandedDownloadNode = page.locator('li.rct-node.rct-node-parent.rct-node-expanded:has(span.rct-title:has-text("Downloads")):nth-of-type(1) span.rct-title:has-text("Downloads")');
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

  async expandAllCheckboxes() {
    await this.expandAllButton.click();
  }

  async collapseAllCheckboxes() {
    await this.collapseAllButton.click();
  }

  async validateSelectedHomeElements(expectedElements: string[]): Promise<boolean> {
    const elements = await this.selectedHomeCheckBoxResult.allTextContents();
    return expectedElements.every(element => elements.includes(element));
  }

  async isExpandedDesktopNodeVisible(): Promise<boolean> {
    return await this.expandedDesktopNode.isVisible();
  }

  async isExpandedDocumentsNodeVisible(): Promise<boolean> {
    return await this.expandedDocumentsNode.isVisible();
  }

  async isExpandedOfficeNodeVisible(): Promise<boolean> {
    return await this.expandedOfficeNode.isVisible();
  }

  async isExpandedDownloadNodeVisible(): Promise<boolean> {
    return await this.expandedDownloadNode.isVisible();
  }

  async isExpandedDesktopNodeNotVisible(): Promise<boolean> {
    return await this.expandedDesktopNode.isHidden();
  }

  async isExpandedDocumentsNodeNotVisible(): Promise<boolean> {
    return await this.expandedDocumentsNode.isHidden();
  }

  async isExpandedOfficeNodeNotVisible(): Promise<boolean> {
    return await this.expandedOfficeNode.isHidden();
  }

  async isExpandedDownloadNodeNotVisible(): Promise<boolean> {
    return await this.expandedDownloadNode.isHidden();
  }
}