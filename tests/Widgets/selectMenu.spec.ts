import { test, BrowserContext, Page, expect } from '@playwright/test';
import HomePage from '../../pages/HomePage';
import Widgets from '../../pages/Widgets/Widgets';
import SelectMenu from '../../pages/Widgets/SelectMenu';

test('Verify menu selections', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    const homePage = new HomePage(page);
    const widgets = new Widgets(page);
    const selectMenu = new SelectMenu(page);

    // Navigate to the Select Menu section
    await homePage.loadHomePage();
    await homePage.gotoWidgets();
    await widgets.navigateToSelectMenu();

    // Perform menu selections
    await selectMenu.selectValueFromSelectMenu('Group 1, option 1');
    await selectMenu.selectValueFromSelectOne('Mr.');
    await selectMenu.selectValueFromOldStyleSelectByText('Blue');
    await selectMenu.selectValueFromMultiselectDropDown('Blue', 'Green', 'Black', 'Red');
    await selectMenu.selectValueFromStandardMultiSelect('Saab', 'Opel', 'Audi');

    //Close the context/browser
    await context.close();

});