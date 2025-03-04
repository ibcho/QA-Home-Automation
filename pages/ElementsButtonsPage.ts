import { expect, Locator, Page } from "@playwright/test";

export default class Buttons {
    readonly page: Page;

    // Elements on Buttons Page
    readonly doubleClick: Locator;
    readonly rightClick: Locator;
    readonly clickMe: Locator;

    // Results of text after clicking the buttons
    readonly doubleClickMessage: Locator;
    readonly rightClickMessage: Locator;
    readonly clickMeMessage: Locator;

    constructor(page: Page) {
        this.page = page;

        this.doubleClick = page.locator('#doubleClickBtn')
        this.rightClick = page.locator('#rightClickBtn')
        this.clickMe = page.locator('button', { hasText: 'Click Me' });

        this.doubleClickMessage = page.locator('#doubleClickMessage')
        this.rightClickMessage = page.locator('#rightClickMessage')
        this.clickMeMessage = page.locator('#dynamicClickMessage')
    }

    async performDoubleClick(): Promise<void> {
        await this.doubleClick.click({ clickCount: 2 });
    }

    async performRightClick(): Promise<void> {
        await this.rightClick.click({ button: 'right' });
    }

    async performClickMe(): Promise<void> {
        await this.clickMe.click();
    }


    // Verify the text after clicking the buttons
    async verifyDoubleClickMessage(expectedMessage: string): Promise<void> {
        await expect(this.doubleClickMessage).toHaveText(expectedMessage);
    }

    async verifyRightClickMessage(expectedMessage: string): Promise<void> {
        await expect(this.rightClickMessage).toHaveText(expectedMessage);
    }

    async verifyClickMeMessage(expectedMessage: string): Promise<void> {
        await expect(this.clickMeMessage).toHaveText(expectedMessage);
    }
}