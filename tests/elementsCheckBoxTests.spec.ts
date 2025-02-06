import { test, expect } from '@playwright/test';
import HomePage from '../pages/HomePage';
import CheckBoxPage from '../pages/CheckBoxPage';
import ElementsPage from '../pages/ElementsPage';

test('Home checkbox - check and uncheck', async ({ page }) => {
  const homePage = new HomePage(page);
  const checkBoxPage = new CheckBoxPage(page);
  const elementsPage = new ElementsPage(page);

  await homePage.navigateToHomePage();

  await homePage.gotoElements();
  await elementsPage.navigateToCheckBox();
  await checkBoxPage.isCheckBoxTitleVisible();
  await checkBoxPage.isCheckBoxTitleContainsHome();
  await checkBoxPage.toggleCheckBox();
  expect(await checkBoxPage.isCheckBoxChecked()).toBe(true);
  await checkBoxPage.toggleCheckBox();
  expect(await checkBoxPage.isCheckBoxUnchecked()).toBe(true);
  
});