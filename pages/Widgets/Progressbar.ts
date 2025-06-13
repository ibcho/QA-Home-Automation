import { Locator, Page } from '@playwright/test';

export default class Progressbar {
    // Progress Bar Locators
    private progressBar: Locator;
    private startAndStopButton: Locator;

    constructor(page: Page) {
        // Progress Bar Locators
        this.progressBar = page.locator('div[role="progressbar"]');
        this.startAndStopButton = page.locator('#startStopButton');
    }

    async startAndStopProgressBar() {
        await this.startAndStopButton.click();
    }

    // Method to get the progress bar value from the aria-valuenow attribute
    async getProgressBarValue(): Promise<number> {
        const value = await this.progressBar.getAttribute('aria-valuenow');
        if (!value) throw new Error('Progress bar value is not available');
        return parseInt(value, 10); // Convert the value to a number
    }
    
    // Method to get the visible text content of the progress bar
    async getProgressBarText(): Promise<string> {
        return await this.progressBar.textContent() || '';
    }
}