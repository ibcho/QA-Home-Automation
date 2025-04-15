import { Locator, Page } from '@playwright/test';

export default class Tabs {
    private tabList: Locator;
    private tabContents: Locator;
    private tabs: Locator;

    constructor(page: Page) {
        this.tabList = page.locator('.tab-list');
        this.tabs = page.locator('.tab-list .tab');

    }

    // Method to click on a specific tab by its index
    async clickTab(index: number) {
        await this.tabs.nth(index).click();
    }

    // Method to verify which tab is active and which are not
    async verifyTabsStatus(): Promise<{ activeTab: string; disabledTabs: string[]; inactiveTabs: string[] }> {
        const activeTab = await this.tabs.locator('[aria-selected="true"]').first();
        const activeTabText = await activeTab.textContent() || '';
    
        const disabledTabs: string[] = [];
        const inactiveTabs: string[] = [];
        const allTabsCount = await this.tabs.count();
    
        for (let i = 0; i < allTabsCount; i++) {
            const tab = this.tabs.nth(i);
            const className = await tab.getAttribute('class') || '';
    
            if (className.includes('disabled')) {
                const tabText = await tab.textContent();
                if (tabText) {
                    disabledTabs.push(tabText);
                }
            } else if (!(await tab.getAttribute('aria-selected') === 'true')) {
                const tabText = await tab.textContent();
                if (tabText) {
                    inactiveTabs.push(tabText);
                }
            }
        }
    
        return { activeTab: activeTabText, disabledTabs, inactiveTabs };
    }

    async verifyTabContent(index: number, expectedContent: string): Promise<void> {
        // Click on the tab
        await this.clickTab(index);
    
        // Get the content of the active tab
        const tabContent = await this.tabContents.textContent();
    
        // Verify the content matches the expected content
        if (tabContent?.trim() !== expectedContent.trim()) {
            throw new Error(`Content mismatch for tab index ${index}. Expected: "${expectedContent}", but got: "${tabContent}"`);
        }
    }
}