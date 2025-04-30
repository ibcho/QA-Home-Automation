import { Locator, Page, expect } from '@playwright/test';

export default class Tabs {
    private tabs: Locator;

    constructor(page: Page) {
        // Locate all tabs within the tab list
        this.tabs = page.locator('.nav.nav-tabs[role="tablist"] a[role="tab"]');
    }

    // Method to verify that each tab has the "active" class when selected
    async verifyTabsActiveClass(): Promise<void> {
        const tabCount = await this.tabs.count();

        for (let i = 0; i < 3; i++) {
            const tab = this.tabs.nth(i);

            // Click on the tab
            await tab.click();

            // Verify the tab has the "active" class
            const classAttribute = await tab.getAttribute('class');
            expect(classAttribute).toContain('active');

            console.log(`Tab ${i + 1} is active and has the class: ${classAttribute}`);
        }
    }

    // Method to verify that the last tab is disabled
    async verifyLastTabIsDisabled(): Promise<void> {
        const lastTab = this.tabs.last(); // Locate the last tab
        const isDisabled = await lastTab.getAttribute('aria-disabled');
        expect(isDisabled).toBe('true'); // Verify the aria-disabled attribute is "true"

        console.log('The last tab is disabled.');
    }
}