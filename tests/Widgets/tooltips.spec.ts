import { test, expect } from '@playwright/test';
import HomePage from '../../pages/HomePage';
import Widgets from '../../pages/Widgets/Widgets';
import Tooltips from '../../pages/Widgets/Tooltips';

let homePage: HomePage;
let widgets: Widgets;
let tooltips: Tooltips;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  widgets = new Widgets(page);
  tooltips = new Tooltips(page);

  await homePage.loadHomePage();
  await homePage.gotoWidgets();
  await widgets.navigateToToolTip();
});

test('Verify tooltip appears on hover for "Hover me to see" button', async () => {
  await tooltips.verifyButtonTooltip();
  await tooltips.verifyTextFieldTooltip();
  await tooltips.verifyContraryTooltip();
  await tooltips.verifySectionNumberTooltip();
});
