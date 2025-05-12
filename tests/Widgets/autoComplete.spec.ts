import { test, BrowserContext, Page, expect } from '@playwright/test';
import HomePage from '../../pages/HomePage';
import Widgets from '../../pages/Widgets/Widgets';
import AutoComplete from '../../pages/Widgets/AutoComplete';

let context: BrowserContext;
let page: Page;

let homePage: HomePage;
let widgets: Widgets;
let autoComplete: AutoComplete;

test.beforeAll(async ({ browser }) => {
  context = await browser.newContext();
  page = await context.newPage();
  homePage = new HomePage(page);
  widgets = new Widgets(page);
  autoComplete = new AutoComplete(page);

  await homePage.loadHomePage();
  await homePage.gotoWidgets();
  await widgets.navigateToAutoComplete();
});

test.afterAll(async () => {
    // Close the browser context
    await context.close();
});


test('Verify AutoComplete input and result', async () => {
  const inputText = 'a';
  const colors = ['Magenta', 'Black', 'Aqua']; // Array of colors, could be added more in the future

  await autoComplete.enterTextInAutoCompleteInput(inputText);

  //verify each color is visible
  for (const color of colors) {
    await expect(page.getByText(color, { exact: true })).toBeVisible();
  }

  console.log('Following colors are visible:', colors);
});