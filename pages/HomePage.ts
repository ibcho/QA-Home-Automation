import { Locator, Page } from "@playwright/test";

export default class HomePage {
  readonly page: Page;

  readonly toolsqaLogo: Locator;
  readonly menuItems: { [key: string]: Locator };

  constructor(page: Page) {
    this.page = page;
    this.toolsqaLogo = page.locator('a[href="https://demoqa.com"] img[src="/images/Toolsqa.jpg"]');
    this.menuItems = {
      elements: page.getByRole('heading', { name: 'Elements' }),
      forms: page.locator("//div[contains(text(),'Forms')]"),
      alertsFrameWindows: page.locator("//div[contains(text(),'Alerts, Frame & Windows')]"),
      widgets: page.locator("//div[contains(text(),'Widgets')]"),
      interactions: page.locator("//div[contains(text(),'Interactions')]"),
      bookStoreApplication: page.locator("//div[contains(text(),'Book Store Application')]"),
    };
  }

  // Navigation method
  async navigateToHomePage() {
    await this.page.goto("https://demoqa.com/");
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
  async gotoElements() {
    await this.navigateTo('elements');
  }

  async gotoForms() {
    await this.navigateTo('forms');
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

  // Visibility check method
  async isToolsQALogoVisible(): Promise<boolean> {
    return await this.toolsqaLogo.isVisible();
  }
}