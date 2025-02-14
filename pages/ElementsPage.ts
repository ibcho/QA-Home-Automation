import { Locator, Page } from "@playwright/test";
// filepath: /c:/Users/IbrahimGavazov/Projects/QA-Home-Automation/pages/elementsPage.ts


export default class ElementsPage {
  readonly page: Page;

  readonly textBoxMenuItem: Locator;
  readonly checkBoxMenuItem: Locator;
  readonly radioButtonMenuItem: Locator;
  readonly webTablesMenuItem: Locator;
  readonly buttonsMenuItem: Locator;
  readonly linksMenuItem: Locator;
  readonly brokenLinksImagesMenuItem: Locator;
  readonly uploadDownloadMenuItem: Locator;
  readonly dynamicPropertiesMenuItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.textBoxMenuItem = page.locator('li.btn.btn-light', { hasText: 'Text Box' });
    this.checkBoxMenuItem = page.locator('li.btn.btn-light', { hasText: 'Check Box' });
    this.radioButtonMenuItem = page.locator('li.btn.btn-light', { hasText: 'Radio Button' });
    this.webTablesMenuItem = page.locator('li.btn.btn-light', { hasText: 'Web Tables' });
    this.buttonsMenuItem = page.locator('li.btn.btn-light', { hasText: 'Buttons' });
    this.linksMenuItem = page.locator('li.btn.btn-light', { hasText: 'Links' });
    this.brokenLinksImagesMenuItem = page.locator('li.btn.btn-light', { hasText: 'Broken Links - Images' });
    this.uploadDownloadMenuItem = page.locator('li.btn.btn-light', { hasText: 'Upload and Download' });
    this.dynamicPropertiesMenuItem = page.locator('li.btn.btn-light', { hasText: 'Dynamic Properties' });
  }

  async navigateToTextBox() {
    await this.textBoxMenuItem.click();
  }

  async navigateToCheckBox() {
    await this.checkBoxMenuItem.click();
  }

  async navigateToRadioButton() {
    await this.radioButtonMenuItem.click();
  }

  async navigateToWebTables() {
    await this.webTablesMenuItem.click();
  }

  async navigateToButtons() {
    await this.buttonsMenuItem.click();
  }

  async navigateToLinks() {
    await this.linksMenuItem.click();
  }

  async navigateToBrokenLinksImages() {
    await this.brokenLinksImagesMenuItem.click();
  }

  async navigateToUploadDownload() {
    await this.uploadDownloadMenuItem.click();
  }

  async navigateToDynamicProperties() {
    await this.dynamicPropertiesMenuItem.click();
  }
}