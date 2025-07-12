import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from '../BasePage';

export default class Menu extends BasePage {
    // Main menu items
    private readonly mainItem1: Locator;
    private readonly mainItem2: Locator;
    private readonly mainItem3: Locator;

    // Sub menu items
    private readonly subItem: Locator;
    private readonly subItem1: Locator;
    private readonly subSubList: Locator;
    private readonly subListSubSubItem1: Locator;
    private readonly subListSubSubItem2: Locator;

    constructor(page: Page) {
        super(page);
        
        // Initialize main menu items
        this.mainItem1 = page.locator('a', { hasText: 'Main Item 1' });
        this.mainItem2 = page.locator('a', { hasText: 'Main Item 2' });
        this.mainItem3 = page.locator('a', { hasText: 'Main Item 3' });

        // Initialize sub menu items
        this.subItem = page.locator('a', { hasText: 'Sub Item' }).nth(0);
        this.subItem1 = page.locator('a', { hasText: 'Sub Item' }).nth(1);
        this.subSubList = page.locator('a', { hasText: 'SUB SUB LIST »' });
        this.subListSubSubItem1 = page.locator('a', { hasText: 'Sub Sub Item 1' });
        this.subListSubSubItem2 = page.locator('a', { hasText: 'Sub Sub Item 2' });
    }

    /**
     * Hover over Main Item 1 and verify it's visible
     */
    async hoverOverMainItem1(): Promise<void> {
        await this.mainItem1.hover();
        await this.verifyVisible(this.mainItem1);
    }

    /**
     * Hover over Main Item 2 and verify it's visible
     */
    async hoverOverMainItem2(): Promise<void> {
        await this.mainItem2.hover();
        await this.verifyVisible(this.mainItem2);
    }

    /**
     * Hover over Main Item 3 and verify it's visible
     */
    async hoverOverMainItem3(): Promise<void> {
        await this.mainItem3.hover();
        await this.verifyVisible(this.mainItem3);
    }

    /**
     * Hover over Sub Item and verify it's visible
     */
    async hoverOverSubItem(): Promise<void> {
        await this.subItem.hover();
        await this.verifyVisible(this.subItem);
    }

    /**
     * Hover over Sub Item 1 and verify it's visible
     */
    async hoverOverSubItem1(): Promise<void> {
        await this.subItem1.hover();
        await this.verifyVisible(this.subItem1);
    }

    /**
     * Hover over Sub Sub List and verify it's visible with retry mechanism
     */
    async hoverOverSubSubList(): Promise<void> {
        await this.safeHover(this.subSubList);
        await this.verifyVisible(this.subSubList);
    }

    /**
     * Hover over Main Item 2, then Sub Sub List, and verify nested items are visible
     */
    async hoverOverMainItem2AndSubSubList(): Promise<void> {
        // Hover over "Main Item 2"
        await this.hoverOverMainItem2();

        // Wait a moment for submenu to appear
        await this.page.waitForTimeout(500);

        // Hover over "Sub Sub List"
        await this.hoverOverSubSubList();
        
        // Wait for nested items to appear
        await this.page.waitForTimeout(500);
        
        // Verify nested items are visible
        await this.verifyVisible(this.subListSubSubItem1);
        await this.verifyVisible(this.subListSubSubItem2);
    }

    /**
     * Hover over Sub Sub Item 1 and verify it's visible
     */
    async hoverOverSubSubItem1(): Promise<void> {
        // Ensure the sublist is revealed first
        await this.hoverOverMainItem2AndSubSubList();
        
        // Wait a moment for stability
        await this.page.waitForTimeout(300);
        
        // Hover over Sub Sub Item 1
        await this.safeHover(this.subListSubSubItem1);
        await this.verifyVisible(this.subListSubSubItem1);
    }

    /**
     * Hover over Sub Sub Item 2 and verify it's visible
     */
    async hoverOverSubSubItem2(): Promise<void> {
        // Ensure the sublist is revealed first
        await this.hoverOverMainItem2AndSubSubList();
        
        // Wait a moment for stability
        await this.page.waitForTimeout(300);
        
        // Hover over Sub Sub Item 2
        await this.safeHover(this.subListSubSubItem2);
        await this.verifyVisible(this.subListSubSubItem2);
    }

    /**
     * Verify all main menu items are visible
     */
    async verifyAllMainItemsVisible(): Promise<void> {
        await this.verifyVisible(this.mainItem1);
        await this.verifyVisible(this.mainItem2);
        await this.verifyVisible(this.mainItem3);
    }

    /**
     * Verify all sub menu items are visible after hovering over Main Item 2
     */
    async verifySubMenuItemsVisible(): Promise<void> {
        await this.hoverOverMainItem2();
        await this.verifyVisible(this.subItem);
        await this.verifyVisible(this.subItem1);
        await this.verifyVisible(this.subSubList);
    }

    /**
     * Verify all nested sub menu items are visible
     */
    async verifyNestedSubMenuItemsVisible(): Promise<void> {
        await this.hoverOverMainItem2AndSubSubList();
        await this.verifyVisible(this.subListSubSubItem1);
        await this.verifyVisible(this.subListSubSubItem2);
    }

    /**
     * Get text content of all main menu items
     */
    async getMainMenuItemsText(): Promise<string[]> {
        const mainItems = [this.mainItem1, this.mainItem2, this.mainItem3];
        const texts: string[] = [];
        
        for (const item of mainItems) {
            const text = await this.getText(item);
            texts.push(text);
        }
        
        return texts;
    }

    /**
     * Check if a specific menu item is hoverable
     */
    async isMenuItemHoverable(locator: Locator): Promise<boolean> {
        try {
            await locator.hover();
            await this.page.waitForTimeout(100); // Brief wait to see if hover works
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Test complete menu navigation flow
     */
    async testCompleteMenuNavigation(): Promise<void> {
        // Test main items
        await this.verifyAllMainItemsVisible();
        
        // Test sub items
        await this.verifySubMenuItemsVisible();
        
        // Test nested items
        await this.verifyNestedSubMenuItemsVisible();
        
        // Test individual hover actions
        await this.hoverOverMainItem1();
        await this.hoverOverMainItem3();
        await this.hoverOverSubSubItem1();
        await this.hoverOverSubSubItem2();
    }

    /**
     * Safe hover method with retry mechanism and iframe handling
     */
    private async safeHover(locator: Locator, retries: number = 3): Promise<void> {
        for (let i = 0; i < retries; i++) {
            try {
                // Check if page is still active
                if (this.page.isClosed()) {
                    throw new Error('Page has been closed');
                }

                // Wait for element to be visible
                await this.waitForElement(locator, 3000);
                
                // Try to hover
                await locator.hover({ timeout: 5000 });
                return;
            } catch (error) {
                if (i === retries - 1) {
                    console.error(`Failed to hover over element after ${retries} attempts:`, error);
                    throw error;
                }
                console.log(`Retry ${i + 1}/${retries} for hover operation`);
                await this.page.waitForTimeout(1000);
            }
        }
    }
}