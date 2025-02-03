import { Locator, Page } from "@playwright/test";

export default class HomePage {
  readonly page: Page;

  readonly toolsqaLogo: Locator;
  readonly elementsPage: Locator;
  readonly formsPage: Locator;
  readonly alertsFrameWindowsPage: Locator;
  readonly widgetsPage: Locator;
  readonly interactionsPage: Locator;
  readonly bookStoreApplicationPage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.toolsqaLogo = page.locator('a[href="https://demoqa.com"] img[src="/images/Toolsqa.jpg"]');
    this.elementsPage = page.getByRole('heading', { name: 'Elements' })
    this.formsPage = page.locator("//div[contains(text(),'Forms')]");
    this.alertsFrameWindowsPage = page.locator("//div[contains(text(),'Alerts, Frame & Windows')]");
    this.widgetsPage = page.locator("//div[contains(text(),'Widgets')]");
    this.interactionsPage = page.locator("//div[contains(text(),'Interactions')]");
    this.bookStoreApplicationPage = page.locator("//div[contains(text(),'Book Store Application')]");
  }

  async navigateToHomePage() {
    await this.page.goto("https://demoqa.com/");
  }

  async gotoElements() {
    await this.elementsPage.click();
  }

  async gotoForms() {
    await this.formsPage.click();
  }

  async gotoAlertsFrameWindows() {
    await this.alertsFrameWindowsPage.click();
  }

  async gotoWidgets() {
    await this.widgetsPage.click();
  }

  async gotoInteractions() {
    await this.interactionsPage.click();
  }

  async gotoBookStoreApplication() {
    await this.bookStoreApplicationPage.click();
  }

  async isToolsQALogoVisible(): Promise<boolean>{
    return await this.toolsqaLogo.isVisible();
  }
}