import { Locator, Page, expect } from '@playwright/test';

export default class SelectMenu {
    private page: Page;
    private selectValue: Locator;
    private selectOne: Locator;
    private oldStyleSelect: Locator;
    private multiselectDropDown: Locator;
    private standardMultiSelect: Locator;
    private multiSelectDropdownColor_Green: Locator;
    private multiSelectDropdownColor_Blue: Locator;
    private multiSelectDropdownColor_Black: Locator;
    private multiSelectDropdownColor_Red: Locator;


    constructor(page: Page) {
        this.page = page;
        this.selectValue = page.locator('#withOptGroup');
        this.selectOne = page.locator('#selectOne');
        this.oldStyleSelect = page.locator('#oldSelectMenu');
        this.multiselectDropDown = page.locator('div').filter({ hasText: /^Select\.\.\.$/ }).nth(2)
        this.standardMultiSelect = page.locator('#cars');
    }

    async selectValueFromSelectMenu(value: string) {
        await this.selectValue.click();
        this.page.getByText(value, { exact: true }).click();
    }

    async selectValueFromSelectOne(value: string) {
        await this.selectOne.click();
        this.page.getByText(value, { exact: true }).click();
    }

    async selectValueFromOldStyleSelectByText(color: string) {
        // Select the option by its visible text
        await this.oldStyleSelect.selectOption({ label: color });
    }

    async selectValueFromMultiselectDropDown(...colors: string[]) {
        await this.multiselectDropDown.click();

        for (const color of colors) {
            const option = this.page.locator(`div[id^="react-select-4-option"]`, { hasText: color });
            await option.hover();
            await option.click();
            
            const selectedOption = this.page.locator('.css-12jo7m5', { hasText: color }); // Adjust the class if necessary
            await expect(selectedOption).toBeVisible();
        }
        await this.page.keyboard.press('Escape');
    }

    async selectValueFromStandardMultiSelect(...cars: string[]) {
        // Select the provided car values
        await this.standardMultiSelect.selectOption(cars);
    
        // Verify that all selected options are displayed and their background color changes
        for (const car of cars) {
            const selectedOption = this.page.locator('option', { hasText: car });

            // Verify the background color of the selected option
            const backgroundColor = await selectedOption.evaluate((el) =>
                window.getComputedStyle(el).getPropertyValue('background-color')
            );
            expect(backgroundColor).toBe('rgb(206, 206, 206)'); // Verify the background color
        }
    }
}