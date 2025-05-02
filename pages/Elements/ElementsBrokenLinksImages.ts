import { expect, Locator, Page } from "@playwright/test";

export default class ElementsBrokenLinksImages {
    readonly page: Page;

    // Elements on Broken Links Images Page
    readonly validImage: Locator;
    readonly brokenImage: Locator;
    readonly validLink: Locator;
    readonly brokenLink: Locator;

    constructor(page: Page) {
        this.page = page;

        this.validImage = page.locator('img[src="/images/Toolsqa.jpg"]').nth(1);
        this.brokenImage = page.locator('img[src="/images/Toolsqa_1.jpg"]');
        this.validLink = page.locator('a[href="https://demoqa.com"]');
        this.brokenLink = page.locator("[href='http://the-internet.herokuapp.com/status_codes/500']");
        
    }

    // Method to verify the valid image is visible
    async verifyValidImageVisible() {
        await expect(this.validImage).toBeVisible();
    }

    // Method to verify the broken image is not visible
    async verifyBrokenImageNotVisible() {
        await expect(this.brokenImage).toBeVisible();
    }

    // Method to click the valid link and verify the URL
    async clickValidLinkAndVerify() {
        await this.validLink.click();
        await expect(this.page).toHaveURL('https://demoqa.com/');
    }

    // Method to click the broken link and verify the URL
    async clickBrokenLink() {
        await this.brokenLink.click();
    }
}