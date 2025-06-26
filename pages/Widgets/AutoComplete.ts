import {Locator, Page} from '@playwright/test';

export default class AutoCompletePage {
    private autoCompleteInput: Locator;

    constructor(page: Page) {
        this.autoCompleteInput = page.locator('#autoCompleteSingleContainer input');  
    }

    async enterTextInAutoCompleteInput(text: string) {
        await this.autoCompleteInput.fill(text);
    }

    async getAutoCompleteResultText() {
        return await this.autoCompleteInput.inputValue();
    }
}