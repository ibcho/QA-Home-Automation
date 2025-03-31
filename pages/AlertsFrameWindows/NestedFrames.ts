import { expect, FrameLocator, Locator, Page } from "@playwright/test";

export default class NestedFramesPage {
    readonly page: Page;
    readonly parentIframe: FrameLocator;
    readonly parentFrameText: Locator;
    readonly childIframe: FrameLocator;
    readonly childFrameText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.parentIframe = page.frameLocator("#frame1");
        this.parentFrameText = this.parentIframe.locator("body").getByText("Parent frame");
        
        this.childIframe = this.parentIframe.frameLocator("iframe[srcdoc]");
        this.childFrameText = this.childIframe.locator("p");
    }
    async verifyParentFrameText(expectedText: string) {
        await expect(this.parentFrameText).toHaveText(expectedText);
    }

    async verifyChildFrameText(expectedText: string) {
        await expect(this.childFrameText).toHaveText(expectedText);
    }
}