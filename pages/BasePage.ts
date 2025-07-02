import { Page, Locator, expect } from '@playwright/test';

export abstract class BasePage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Wait for element to be visible with configurable timeout
     */
    protected async waitForElement(locator: Locator, timeout: number = 5000): Promise<void> {
        try {
            await locator.waitFor({ state: 'visible', timeout });
        } catch (error) {
            // Check if page is closed
            if (this.page.isClosed()) {
                throw new Error('Page has been closed during element wait');
            }
            throw error;
        }
    }

    /**
     * Safe click with retry mechanism
     */
    protected async safeClick(locator: Locator, retries: number = 3): Promise<void> {
        for (let i = 0; i < retries; i++) {
            try {
                await this.waitForElement(locator);
                await locator.click();
                return;
            } catch (error) {
                if (i === retries - 1) throw error;
                await this.page.waitForTimeout(500);
            }
        }
    }

    /**
     * Safe fill with validation and retry mechanism
     */
    protected async safeFill(locator: Locator, value: string, retries: number = 3): Promise<void> {
        for (let i = 0; i < retries; i++) {
            try {
                await this.waitForElement(locator);
                await locator.clear();
                await locator.fill(value);
                return;
            } catch (error) {
                if (i === retries - 1) {
                    console.error(`Failed to fill element after ${retries} attempts:`, error);
                    throw error;
                }
                console.log(`Retry ${i + 1}/${retries} for fill operation`);
                await this.page.waitForTimeout(1000);
            }
        }
    }

    /**
     * Verify element text with timeout
     */
    protected async verifyText(locator: Locator, expectedText: string, timeout: number = 5000): Promise<void> {
        await this.waitForElement(locator, timeout);
        await expect(locator).toHaveText(expectedText);
    }

    /**
     * Verify element is visible
     */
    protected async verifyVisible(locator: Locator, timeout: number = 5000): Promise<void> {
        await this.waitForElement(locator, timeout);
        await expect(locator).toBeVisible();
    }

    /**
     * Get element text safely
     */
    protected async getText(locator: Locator): Promise<string> {
        await this.waitForElement(locator);
        return await locator.textContent() || '';
    }

    /**
     * Check if element is visible
     */
    protected async isVisible(locator: Locator): Promise<boolean> {
        try {
            return await locator.isVisible();
        } catch {
            return false;
        }
    }

    /**
     * Wait for page to load with error handling
     */
    protected async waitForPageLoad(): Promise<void> {
        try {
            await this.page.waitForLoadState('networkidle', { timeout: 10000 });
        } catch (error) {
            // If networkidle times out, try domcontentloaded as fallback
            try {
                await this.page.waitForLoadState('domcontentloaded', { timeout: 5000 });
            } catch (fallbackError) {
                console.log('Page load timeout, continuing anyway...');
            }
        }
    }

    /**
     * Check if page is still active
     */
    protected isPageActive(): boolean {
        return !this.page.isClosed();
    }
} 