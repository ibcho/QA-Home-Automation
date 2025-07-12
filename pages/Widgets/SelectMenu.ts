import { Locator, Page, expect } from '@playwright/test';

export default class SelectMenu {
    private page: Page;
    private selectValue: Locator;
    private selectOne: Locator;
    private oldStyleSelect: Locator;
    private multiselectDropDown: Locator;
    private standardMultiSelect: Locator;

    constructor(page: Page) {
        this.page = page;
        this.selectValue = page.locator('#withOptGroup');
        this.selectOne = page.locator('#selectOne');
        this.oldStyleSelect = page.locator('#oldSelectMenu');
        this.multiselectDropDown = page.locator('div').filter({ hasText: /^Select\.\.\.$/ }).nth(2);
        this.standardMultiSelect = page.locator('#cars');
    }

    async selectValueFromSelectMenu(value: string) {
        await this.selectValue.click();
        await this.page.getByText(value, { exact: true }).click();
    }

    async selectValueFromSelectOne(value: string) {
        await this.selectOne.click();
        await this.page.getByText(value, { exact: true }).click();
    }

    async selectValueFromOldStyleSelectByText(color: string) {
        await this.oldStyleSelect.selectOption({ label: color });
    }

    async selectValueFromMultiselectDropDown(...colors: string[]) {
        await this.multiselectDropDown.click();
        for (const color of colors) {
            const option = this.page.locator(`div[id^="react-select-4-option"]`, { hasText: color });
            await option.hover();
            await option.click();
            const selectedOption = this.page.locator('.css-12jo7m5', { hasText: color });
            await expect(selectedOption).toBeVisible();
        }
        await this.page.keyboard.press('Escape');
    }

    async selectValueFromStandardMultiSelect(...cars: string[]) {
        await this.standardMultiSelect.selectOption(cars);
        for (const car of cars) {
            const selectedOption = this.page.locator('option', { hasText: car });
            const backgroundColor = await selectedOption.evaluate((el) =>
                window.getComputedStyle(el).getPropertyValue('background-color')
            );
            expect(backgroundColor).toBe('rgb(206, 206, 206)');
        }
    }
}