import { Locator, Page } from '@playwright/test';

export default class Progressbar {
    private progressBar: Locator;
    private startAndStopButton: Locator;

    constructor(page: Page) {
        this.progressBar = page.locator('div[role="progressbar"]');
        this.startAndStopButton = page.locator('#startStopButton');
    }

    async start() {
        await this.startAndStopButton.click();
    }

    async stop() {
        await this.startAndStopButton.click();
    }

    async getValue(): Promise<number> {
        const value = await this.progressBar.getAttribute('aria-valuenow');
        return value ? parseInt(value, 10) : 0;
    }
}