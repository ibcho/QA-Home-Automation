import { Page, Locator } from '@playwright/test';

export default class HomePage {
  readonly page: Page;
  readonly menuItems: { [key: string]: Locator };

  constructor(page: Page) {
      this.page = page;
      this.menuItems = {
          elements: page.getByRole('heading', { name: 'Elements' }),
          forms: page.locator("//div[@class='card mt-4 top-card']//h5[text()='Forms']"),
          alertsFrameWindows: page.locator("//div[contains(text(),'Alerts, Frame & Windows')]"),
          widgets: page.locator("//div[contains(text(),'Widgets')]"),
          interactions: page.locator("//div[contains(text(),'Interactions')]"),
          bookStoreApplication: page.locator("//div[contains(text(),'Book Store Application')]"),
      };
  }

  async navigateToHomePage() {
      await this.page.goto("https://demoqa.com/");
  }

  async navigateTo(menuItem: string) {
      const locator = this.menuItems[menuItem];
      if (locator) {
          await locator.waitFor({ state: 'visible' });  
          await locator.click();  
      } else {
          throw new Error(`Menu item ${menuItem} not found`);
      }
  }

  async gotoForms() {
      await this.navigateTo('forms');
  }

  async gotoElements() {
      await this.navigateTo('elements');
  }

  async gotoAlertsFrameWindows() {
      await this.navigateTo('alertsFrameWindows');
  }

  async gotoWidgets() {
      await this.navigateTo('widgets');
  }

  async gotoInteractions() {
      await this.navigateTo('interactions');
  }

  async gotoBookStoreApplication() {
      await this.navigateTo('bookStoreApplication');
  }
  
}