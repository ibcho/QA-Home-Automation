import { test, expect } from '@playwright/test';
import HomePage from '../../pages/HomePage';
import Widgets from '../../pages/Widgets/Widgets';
import Tabs from '../../pages/Widgets/Tabs';

test.beforeEach(async ({ page }) => {
  const homePage = new HomePage(page);
  const widgets = new Widgets(page);
  const tabs = new Tabs(page);

  await homePage.loadHomePage();
  await homePage.gotoWidgets();
  await widgets.navigateToTabs();
});

test('Verify tabs functionality', async ({ page }) => {
  const tabs = new Tabs(page);

  await tabs.verifyTabsActiveClass();
  await tabs.verifyLastTabIsDisabled();
});


