import { Locator, Page } from "@playwright/test";

// filepath: /c:/Users/IbrahimGavazov/Projects/QA-Home-Automation/pages/RadioButtonsPage.ts
export default class RadioButtonsPage {
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

    async isRadioButtonsTitleVisible(): Promise<boolean> {
        return await this.radioButtonsTitle.isVisible();
    }

    async selectRadioButton(value: string) {
        switch (value.toLowerCase()) {
            case 'yes':
                await this.yesRadioButtonLabel.click();
                break;
            case 'impressive':
                await this.impressiveRadioButtonLabel.click();
                break;
            case 'no':
                if (await this.noRadioButtonLabel.isDisabled()) {
                    throw new Error('The "No" radio button is disabled');
                }
                await this.noRadioButtonLabel.click();
                break;
            default:
                throw new Error('Invalid radio button value');
        }
    }

    async isRadioButtonSelected(value: string): Promise<boolean> {
        switch (value.toLowerCase()) {
            case 'yes':
                return await this.page.locator('input#yesRadio').isChecked();
            case 'impressive':
                return await this.page.locator('input#impressiveRadio').isChecked();
            case 'no':
                return await this.page.locator('input#noRadio').isChecked();
            default:
                throw new Error('Invalid radio button value lable');
        }
    }

    async isRadioButtonDisabled(value: string): Promise<boolean> {
        switch (value.toLowerCase()) {
            case 'yes':
                return await this.page.locator('input#yesRadio').isDisabled();
            case 'impressive':
                return await this.page.locator('input#impressiveRadio').isDisabled();
            case 'no':
                return await this.page.locator('input#noRadio').isDisabled();
            default:
                throw new Error('Invalid radio button value');
        }
    }
    
    async getSelectedRadioButtonText(): Promise<string> {
        return await this.selectedRadioButtonText.innerText();
    }
}