import { test, expect } from '@playwright/test';
import HomePage from '../../pages/HomePage';
import Widgets from '../../pages/Widgets/Widgets';
import Menu from '../../pages/Widgets/Menu';

test.describe('Menu Widget', () => {
    let homePage: HomePage;
    let widgets: Widgets;
    let menu: Menu;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        widgets = new Widgets(page);
        menu = new Menu(page);

        await homePage.loadHomePage();
        await homePage.gotoWidgets();
        await widgets.navigateToMenu();
    });

    test('Should verify all menu interactions work correctly', async () => {
        await test.step('Test basic menu hover interactions', async () => {
            await menu.hoverOverMainItem1();
            await menu.hoverOverMainItem2();
            await menu.hoverOverMainItem3();
        });

        await test.step('Test nested menu navigation', async () => {
            await menu.hoverOverMainItem2AndSubSubList();
            await menu.hoverOverSubSubItem1();
            await menu.hoverOverSubSubItem2();
        });

        await test.step('Verify all menu items are visible', async () => {
            await menu.verifyAllMainItemsVisible();
            await menu.verifyNestedSubMenuItemsVisible();
        });
    });

    test('Should test complete menu navigation flow', async () => {
        await test.step('Execute complete menu navigation test', async () => {
            await menu.testCompleteMenuNavigation();
        });
    });
});