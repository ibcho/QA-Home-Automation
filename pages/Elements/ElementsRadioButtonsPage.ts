import { Locator, Page } from "@playwright/test";

export default class ElementsRadioButtonsPage {
    readonly page: Page;

    readonly radioButtonsTitle: Locator;
    readonly yesRadioButtonLabel: Locator;
    readonly impressiveRadioButtonLabel: Locator;
    readonly noRadioButtonLabel: Locator;
    readonly selectedRadioButtonText: Locator;  

    constructor(page: Page) {
        this.page = page;
        this.radioButtonsTitle = page.locator('h1.text-center', { hasText: 'Radio Button' });
        this.yesRadioButtonLabel = page.locator('label[for="yesRadio"]');
        this.impressiveRadioButtonLabel = page.locator('label[for="impressiveRadio"]');
        this.noRadioButtonLabel = page.locator('label[for="noRadio"]');
        this.selectedRadioButtonText = page.locator('p.mt-3 > span.text-success');
    }

    // Visibility check method
    async isRadioButtonsTitleVisible(): Promise<boolean> {
        return await this.radioButtonsTitle.isVisible();
    }

    // Method to select a radio button
    async selectRadioButton(value: string) {
        const radioButtonLabel = this.getRadioButtonLabel(value);
        if (radioButtonLabel) {
            await radioButtonLabel.click();
        } else {
            throw new Error(`Invalid radio button value: ${value}`);
        }
    }

    // Method to check if a radio button is selected
    async isRadioButtonSelected(value: string): Promise<boolean> {
        const radioButton = this.getRadioButton(value);
        if (radioButton) {
            return await radioButton.isChecked();
        } else {
            throw new Error(`Invalid radio button value: ${value}`);
        }
    }

    // Method to check if a radio button is disabled
    async isRadioButtonDisabled(value: string): Promise<boolean> {
        const radioButton = this.getRadioButton(value);
        if (radioButton) {
            return await radioButton.isDisabled();
        } else {
            throw new Error(`Invalid radio button value: ${value}`);
        }
    }

    // Method to get the text of the selected radio button
    async getSelectedRadioButtonText(): Promise<string> {
        return await this.selectedRadioButtonText.innerText();
    }

    // Helper method to get the radio button label locator when it is selected
    private getRadioButtonLabel(value: string): Locator | null {
        switch (value.toLowerCase()) {
            case 'yes':
                return this.yesRadioButtonLabel;
            case 'impressive':
                return this.impressiveRadioButtonLabel;
            case 'no':
                return this.noRadioButtonLabel;
            default:
                return null;
        }
    }

    // Helper method to get the radio button input locator
    private getRadioButton(value: string): Locator | null {
        switch (value.toLowerCase()) {
            case 'yes':
                return this.page.locator('input#yesRadio');
            case 'impressive':
                return this.page.locator('input#impressiveRadio');
            case 'no':
                return this.page.locator('input#noRadio');
            default:
                return null;
        }
    }
}