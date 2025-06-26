import { expect, Locator, Page } from "@playwright/test";

export default class BrowserWindows {

    readonly page: Page;
    readonly newTabButton: Locator;
    readonly newWindowButton: Locator;
    readonly newWindowMessage: Locator;


    constructor(page: Page) {
        this.page = page;

        this.newTabButton = page.locator('button#tabButton');
        this.newWindowButton = page.locator('button#windowButton');
        this.newWindowMessage = page.locator('button#messageWindowButton');
    }
    
    async clickNewTabButton() {
        await this.newTabButton.click();
    }

    async clickNewWindowButton() {
        await this.newWindowButton.click();
    }

    async clickNewWindowMessage() {
        await this.newWindowMessage.click();
    }


    async verifyNewTabOpened(){
        const [newTab] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.clickNewTabButton()
        ]);

        await newTab.waitForLoadState();

        const heading = newTab.locator('h1#sampleHeading');
        await expect(heading).toHaveText('This is a sample page');
        await newTab.close();
    }

    async verifyNewWindowOpened() {
        
    }

}