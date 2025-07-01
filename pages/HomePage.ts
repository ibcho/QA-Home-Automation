import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export default class HomePage extends BasePage {
    private readonly menuItems: { [key: string]: Locator };

    constructor(page: Page) {
        super(page);
        this.menuItems = {
            elements: page.getByRole('heading', { name: 'Elements' }),
            forms: page.locator("//div[@class='card mt-4 top-card']//h5[text()='Forms']"),
            alertsFrameWindows: page.locator('div').filter({ hasText: /^Alerts, Frame & Windows$/ }).nth(1),
            widgets: page.locator('div').filter({ hasText: /^Widgets$/ }).first(),
            interactions: page.locator("//div[contains(text(),'Interactions')]"),
            bookStoreApplication: page.locator("//div[contains(text(),'Book Store Application')]"),
        };
    }

    /**
     * Load the home page and wait for it to be ready
     */
    async loadHomePage(): Promise<void> {
        await this.page.goto("https://demoqa.com/");
        await this.waitForPageLoad();
    }

    /**
     * Navigate to a specific menu item with error handling
     */
    async navigateTo(menuItem: string): Promise<void> {
        const locator = this.menuItems[menuItem];
        if (!locator) {
            throw new Error(`Menu item "${menuItem}" not found. Available items: ${Object.keys(this.menuItems).join(', ')}`);
        }
        
        await this.safeClick(locator);
    }

    /**
     * Navigate to Forms section
     */
    async gotoForms(): Promise<void> {
        await this.navigateTo('forms');
    }

    /**
     * Navigate to Elements section
     */
    async gotoElements(): Promise<void> {
        await this.navigateTo('elements');
    }

    /**
     * Navigate to Alerts, Frame & Windows section
     */
    async gotoAlertsFrameWindows(): Promise<void> {
        await this.navigateTo('alertsFrameWindows');
    }

    /**
     * Navigate to Widgets section
     */
    async gotoWidgets(): Promise<void> {
        await this.navigateTo('widgets');
    }

    /**
     * Navigate to Interactions section
     */
    async gotoInteractions(): Promise<void> {
        await this.navigateTo('interactions');
    }

    /**
     * Navigate to Book Store Application section
     */
    async gotoBookStoreApplication(): Promise<void> {
        await this.navigateTo('bookStoreApplication');
    }

    /**
     * Get all available menu items
     */
    getAvailableMenuItems(): string[] {
        return Object.keys(this.menuItems);
    }
}