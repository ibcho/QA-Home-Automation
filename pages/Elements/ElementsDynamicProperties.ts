import { expect, Locator, Page } from "@playwright/test";

export default class ElementsDynamicProperties {
    readonly page: Page;

    // locators
    readonly thisTextHasRandomId: Locator;
    readonly buttonEnabledAfterFiveSeconds: Locator;
    readonly buttonColorChange: Locator;
    readonly buttonVisibleAfterFiveSeconds: Locator;

    constructor(page: Page) {
        this.page = page;

        this.thisTextHasRandomId = page.locator('p', { hasText: 'This text has random Id' });
        this.buttonEnabledAfterFiveSeconds = page.locator('#enableAfter');
        this.buttonColorChange = page.locator('#colorChange');
        this.buttonVisibleAfterFiveSeconds = page.locator('#visibleAfter');
    }

    async verifyTextWithRandomIdVisible() {
        await expect(this.thisTextHasRandomId).toBeVisible();
    }

    async verifyButtonEnabledAfterFiveSeconds() {
        await expect(this.buttonEnabledAfterFiveSeconds).toBeDisabled();
        await this.page.waitForTimeout(5500);
        await expect(this.buttonEnabledAfterFiveSeconds).toBeEnabled();
    }

    async clickButtonAferFiveSeconds(){
        await this.page.waitForTimeout(5500);
        if(await this.buttonEnabledAfterFiveSeconds.isEnabled()){
            await this.buttonEnabledAfterFiveSeconds.click();
        }
    }

    async verifyButtonColorChange() {
        await this.page.waitForTimeout(5500);
        await expect(this.buttonColorChange).toHaveClass(/text-danger/);
        await expect(this.buttonColorChange).toHaveCSS('color', 'rgb(220, 53, 69)');
    }

    async verifyButtonVisibleAfterFiveSeconds() {
        await expect(this.buttonVisibleAfterFiveSeconds).toBeVisible({ timeout: 6000 });
        await this.buttonVisibleAfterFiveSeconds.click();
    }

}