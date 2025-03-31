import { Locator, Page } from "@playwright/test";

export default class Alerts { 
    readonly page: Page;

    readonly alertButton: Locator;
    readonly alerButton5seconds: Locator;
    readonly alertButtonPrompt: Locator;
    readonly alertButtonEnterText: Locator;


    constructor(page: Page) {
        this.page = page;

        this.alertButton = page.locator('#alertButton');
        this.alerButton5seconds = page.locator('button#timerAlertButton');
        this.alertButtonPrompt = page.locator('button#confirmButton');
        this.alertButtonEnterText = page.locator('button#promptButton');
    }

    async clickAlertButton() {
        await this.alertButton.click();
    }

    async clickAlertButton5seconds() {
        await this.alerButton5seconds.click();
    }

    async clickAlertButtonPrompt() {
        await this.alertButtonPrompt.click();
    }

    async clickAlertButtonEnterText() {
        await this.alertButtonEnterText.click();
    }
}