import { Locator, Page, expect } from "@playwright/test";

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
        this.alertButtonEnterText = page.locator('#promtButton')
        
    }

    async clickAlertButton() {
        await this.alertButton.dblclick();
    }

    async clickAlertButton5seconds() {
        await this.alerButton5seconds.click();
    }

    async clickAlertConfirmButton() {
        await this.alertButtonPrompt.click();
    }

    async clickAlertPrompButtonEnterText() {
        await this.alertButtonEnterText.click();
    }

    async handleDialog(action: 'accept' | 'dismiss', expectedMessage?: string, inputText?: string) {
        this.page.once('dialog', async (dialog) => {
            if (expectedMessage) {
                expect(dialog.message()).toBe(expectedMessage);
            }
            if (action === 'accept') {
                await dialog.accept(inputText);
            } else {
                await dialog.dismiss();
            }
        });
    }

}