import { test, expect, BrowserContext, Page } from '@playwright/test';
import HomePage from '../pages/HomePage';
import CheckBoxPage from '../pages/CheckBoxPage';
import ElementsPage from '../pages/ElementsPage';

let homePage: HomePage;
let checkBoxPage: CheckBoxPage;
let elementsPage: ElementsPage;

let context: BrowserContext;
let page: Page;

test.beforeAll(async ({ browser }) => {
  context = await browser.newContext();
  page = await context.newPage();

  homePage = new HomePage(page);
  checkBoxPage = new CheckBoxPage(page);
  elementsPage = new ElementsPage(page);

  await homePage.navigateToHomePage();
  await homePage.gotoElements();
  await elementsPage.navigateToCheckBox();
  await checkBoxPage.isCheckBoxTitleVisible();
  await checkBoxPage.isCheckBoxTitleContainsHome();
});

test.afterAll(async () => {
  await context.close();
});

test('Home checkbox - check and uncheck', async () => {
  await checkBoxPage.toggleCheckBox();
  expect(await checkBoxPage.isCheckBoxChecked()).toBe(true);
  await checkBoxPage.toggleCheckBox();
  expect(await checkBoxPage.isCheckBoxUnchecked()).toBe(true);
});

test('Collapse and shrink Home checkbox', async () => {
  // Expand the checkbox tree
  await checkBoxPage.expandCheckBoxHome();
  expect(await checkBoxPage.isCheckBoxHomeExpanded()).toBe(true);

  // Collapse the checkbox tree
  await checkBoxPage.closeCheckBoxHome();
  expect(await checkBoxPage.isCheckBoxHomeCollapsed()).toBe(true);
});

test('validate selected elements after selecting Home checkbox', async () => {
  await checkBoxPage.toggleCheckBox();
  const expectedElements = [
    'home', 'desktop', 'notes', 'commands', 'documents', 'workspace',
    'react', 'angular', 'veu', 'office', 'public', 'private',
    'classified', 'general', 'downloads', 'wordFile', 'excelFile'
  ];
  expect(await checkBoxPage.validateSelectedElements(expectedElements)).toBe(true);
  await checkBoxPage.toggleCheckBox();
});