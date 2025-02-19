import { Locator, Page } from "@playwright/test";

export default class ElementsPage {
  readonly page: Page;

  readonly menuItems: { [key: string]: Locator };

  constructor(page: Page) {
    this.page = page;
    this.menuItems = {
      textBox: page.locator('li.btn.btn-light', { hasText: 'Text Box' }),
      checkBox: page.locator('li.btn.btn-light', { hasText: 'Check Box' }),
      radioButton: page.locator('li.btn.btn-light', { hasText: 'Radio Button' }),
      webTables: page.locator('li.btn.btn-light', { hasText: 'Web Tables' }),
      buttons: page.locator('li.btn.btn-light', { hasText: 'Buttons' }),
      links: page.locator('li.btn.btn-light', { hasText: 'Links' }),
      brokenLinksImages: page.locator('li.btn.btn-light', { hasText: 'Broken Links - Images' }),
      uploadDownload: page.locator('li.btn.btn-light', { hasText: 'Upload and Download' }),
      dynamicProperties: page.locator('li.btn.btn-light', { hasText: 'Dynamic Properties' }),
    };
  }

  // Helper method to navigate to a menu item
  async navigateTo(menuItem: string) {
    const locator = this.menuItems[menuItem];
    if (locator) {
      await locator.click();
    } else {
      throw new Error(`Menu item ${menuItem} not found`);
    }
  }

  // Specific navigation methods
  async navigateToTextBox() {
    await this.navigateTo('textBox');
  }

  async navigateToCheckBox() {
    await this.navigateTo('checkBox');
  }

  async navigateToRadioButton() {
    await this.navigateTo('radioButton');
  }

  async navigateToWebTables() {
    await this.navigateTo('webTables');
  }

  async navigateToButtons() {
    await this.navigateTo('buttons');
  }

  async navigateToLinks() {
    await this.navigateTo('links');
  }

  async navigateToBrokenLinksImages() {
    await this.navigateTo('brokenLinksImages');
  }

  async navigateToUploadDownload() {
    await this.navigateTo('uploadDownload');
  }

  async navigateToDynamicProperties() {
    await this.navigateTo('dynamicProperties');
  }
}