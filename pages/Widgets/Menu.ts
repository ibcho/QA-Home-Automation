import { Locator, Page, expect } from '@playwright/test';

export default class Menu {
    private page: Page;

    private mainItem1: Locator;
    private mainItem2: Locator;
    private mainItem3: Locator;

    private subItem: Locator;
    private subItem1: Locator;
    private SubSubList: Locator;
    private subList_subSubitem1: Locator;
    private subList_subSubitem2: Locator;

    constructor(page: Page) {
        this.page = page;
        this.mainItem1 = page.locator('a', { hasText: 'Main Item 1' });
        this.mainItem2 = page.locator('a', { hasText: 'Main Item 2' });
        this.mainItem3 = page.locator('a', { hasText: 'Main Item 3' });

        this.subItem = page.locator('a', { hasText: 'Sub Item' }).nth(0);
        this.subItem1 = page.locator('a', { hasText: 'Sub Item' }).nth(1);
        this.SubSubList = page.locator('a', { hasText: 'SUB SUB LIST »' });
        this.subList_subSubitem1 = page.locator('a', { hasText: 'Sub Sub Item 1' });
        this.subList_subSubitem2 = page.locator('a', { hasText: 'Sub Sub Item 2' });
    }

    async hoverOverMainItem1(){
        await this.mainItem1.hover();
        await expect(this.mainItem1).toBeVisible();
    }

    // Hover over "Main Item 2" and then "Sub Sub List" to reveal nested items
    async hoverOverMainItem2_And_SubSubListAndVerifyItems() {
        // Hover over "Main Item 2"
        await this.mainItem2.hover();
        await expect(this.mainItem2).toBeVisible();


        await this.SubSubList.hover();
        await expect(this.SubSubList).toBeVisible();
        await expect(this.subList_subSubitem1).toBeVisible();
        await expect(this.subList_subSubitem2).toBeVisible();
    }

    async hoverOverSubSubItem1() {
        await this.hoverOverMainItem2_And_SubSubListAndVerifyItems(); // Ensure the sublist is revealed
        await this.subList_subSubitem1.hover();
        await expect(this.subList_subSubitem1).toBeVisible();
    }

    async hoverOverSubSubItem2() {
        await this.hoverOverMainItem2_And_SubSubListAndVerifyItems(); // Ensure the sublist is revealed
        await this.subList_subSubitem2.hover();
        await expect(this.subList_subSubitem2).toBeVisible();
    }


    async hoverOverMainItem3(){
        await this.mainItem3.hover();
        await expect(this.mainItem3).toBeVisible();
    }
}