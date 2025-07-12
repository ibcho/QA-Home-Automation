import { test, expect } from '@playwright/test';
import HomePage from '../../pages/HomePage';
import Widgets from '../../pages/Widgets/Widgets';
import SelectMenu from '../../pages/Widgets/SelectMenu';

test('All SelectMenu actions in one test', async ({ page }) => {
    const homePage = new HomePage(page);
    const widgets = new Widgets(page);
    const selectMenu = new SelectMenu(page);

    // Navigate to Select Menu page
    await homePage.loadHomePage();
    await homePage.gotoWidgets();
    await widgets.navigateToSelectMenu();

    // 1. Select value from Select Menu
    await selectMenu.selectValueFromSelectMenu('Group 1, option 1');
    const selected1 = await page.locator('#withOptGroup .css-1uccc91-singleValue').textContent();
    expect(selected1).toBe('Group 1, option 1');

    // 2. Select value from Select One
    await selectMenu.selectValueFromSelectOne('Mr.');
    const selected2 = await page.locator('#selectOne .css-1uccc91-singleValue').textContent();
    expect(selected2).toBe('Mr.');

    // 3. Select value from Old Style Select
    await selectMenu.selectValueFromOldStyleSelectByText('Blue');
    const selected3 = await page.locator('#oldSelectMenu').inputValue();
    expect(selected3).toBe('1'); // Adjust if needed

    // 4. Select multiple values from Multiselect Dropdown
    await selectMenu.selectValueFromMultiselectDropDown('Blue', 'Green', 'Black', 'Red');
    for (const color of ['Blue', 'Green', 'Black', 'Red']) {
        await expect(page.locator('.css-12jo7m5', { hasText: color })).toBeVisible();
    }

    // 5. Select multiple values from Standard Multi Select
    await selectMenu.selectValueFromStandardMultiSelect('Saab', 'Opel', 'Audi');
    for (const car of ['Saab', 'Opel', 'Audi']) {
        const option = page.locator('#cars option', { hasText: car });
        const isSelected = await option.evaluate(el => (el as HTMLOptionElement).selected);
        expect(isSelected).toBe(true);
    }
});