import { test, BrowserContext, Page, expect } from '@playwright/test';
import HomePage from '../../pages/HomePage';
import Widgets from '../../pages/Widgets/Widgets';
import Menu from '../../pages/Widgets/Menu';

let context: BrowserContext;
let page: Page;

let homePage: HomePage;
let widgets: Widgets;
let menu: Menu;

test.beforeAll(async ({ browser }) => {
  context = await browser.newContext();
  page = await context.newPage();
  homePage = new HomePage(page);
  widgets = new Widgets(page);
  menu = new Menu(page);

  await homePage.loadHomePage();
  await homePage.gotoWidgets();
  await widgets.navigateToMenu();
});

test.afterAll(async () => {
  await context.close();
});

test('Verify menu interactions', async ({}) => {
    await menu.hoverOverMainItem1();
    await menu.hoverOverMainItem2_And_SubSubListAndVerifyItems();
    await menu.hoverOverSubSubItem1();
    await menu.hoverOverSubSubItem2();
    await menu.hoverOverMainItem3();
});