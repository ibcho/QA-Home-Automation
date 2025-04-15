import { test, BrowserContext, Page, expect } from '@playwright/test';
import HomePage from '../../pages/HomePage';
import Widgets from '../../pages/Widgets/Widgets';
import Tooltips from '../../pages/Widgets/Tooltips';

let context: BrowserContext;
let page: Page;

let homePage: HomePage;
let widgets: Widgets;
let tooltips: Tooltips;

test.beforeAll(async ({ browser }) => {
  context = await browser.newContext();
  page = await context.newPage();
  homePage = new HomePage(page);
  widgets = new Widgets(page);
  tooltips = new Tooltips(page);

  await homePage.loadHomePage();
  await homePage.gotoWidgets();
  await widgets.navigateToToolTip();
  await page.waitForTimeout(2000); // Wait for the page to load completely
});

test.describe('Testing Tooltips hovers', () => {
  test('Verify tooltip appears on hover for "Hover me to see" button', async () => {
    await tooltips.verifyHoverMeToSeeButtonPopUp();
    await tooltips.verifyHoverMeToSeTextBoxField();
    await tooltips.hoverOverContrary();
    await tooltips.hoveOverSectionNumber();
  });
});
