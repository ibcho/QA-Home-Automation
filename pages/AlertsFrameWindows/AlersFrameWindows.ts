import { Locator, Page } from "@playwright/test";

export default class AlertsFrameWindows {
    readonly page: Page;

    // Locators for navigation links
    readonly browserWindows: Locator;
    readonly alerts: Locator;
    readonly frames: Locator;
    readonly nestedFrames: Locator;
    readonly modalDialogs: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators
        this.browserWindows = page.getByText('Browser Windows');
        this.alerts = page.getByText('Alerts').nth(1);
        this.frames = page.getByText('Frames').nth(0);
        this.nestedFrames = page.getByText('Nested Frames');
        this.modalDialogs = page.getByText('Modal Dialogs');
    }

    // Generic method to navigate to a section
    private async navigateToSection(locator: Locator, sectionName: string) {
        try {
            console.log(`Navigating to ${sectionName}...`);
            await locator.click();
        } catch (error) {
            console.error(`Failed to navigate to ${sectionName}:`, error);
            throw error;
        }
    }

    // Navigate to Browser Windows
    async navigateToBrowserWindows() {
        await this.navigateToSection(this.browserWindows, 'Browser Windows');
    }

    // Navigate to Alerts
    async navigateToAlerts() {
        await this.navigateToSection(this.alerts, 'Alerts');
    }

    // Navigate to Frames
    async navigateToFrames() {
        await this.navigateToSection(this.frames, 'Frames');
    }

    // Navigate to Nested Frames
    async navigateToNestedFrames() {
        await this.navigateToSection(this.nestedFrames, 'Nested Frames');
    }

    // Navigate to Modal Dialogs
    async navigateToModalDialogs() {
        await this.navigateToSection(this.modalDialogs, 'Modal Dialogs');
    }
}