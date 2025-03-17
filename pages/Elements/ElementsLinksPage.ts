import { expect, Locator, Page } from "@playwright/test";

export default class ElementsLinksPage {
    readonly page: Page;
    readonly staticlinkHome: Locator;
    readonly dynamicHomeLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.staticlinkHome = page.locator('#simpleLink');
        this.dynamicHomeLink = page.locator('#dynamicLink');
    }

    // Method to click the static "Home" link and handle the new tab
    async clickStaticLinkHomeAndVerify() {
        // Wait for the new tab to open and click the "Home" link
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'), // Wait for the new tab to open
            this.staticlinkHome.click(), 
        ]);
        await newPage.waitForLoadState();
        await expect(newPage).toHaveURL('https://demoqa.com/');
    }

    async clickDynamicLinkHomeAndVerify() {
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.dynamicHomeLink.click(), 
        ]);

        await newPage.waitForLoadState();
        await expect(newPage).toHaveURL('https://demoqa.com/');
    }
}