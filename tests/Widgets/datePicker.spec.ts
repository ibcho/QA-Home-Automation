import { test, BrowserContext, Page, expect } from '@playwright/test';
import HomePage from '../../pages/HomePage';
import Widgets from '../../pages/Widgets/Widgets';
import DatePicker from '../../pages/Widgets/DatePicker';

let context: BrowserContext;
let page: Page;

let homePage: HomePage;
let widgets: Widgets;
let datePicker: DatePicker;

test.beforeAll(async ({ browser }) => {
  context = await browser.newContext();
  page = await context.newPage();
  homePage = new HomePage(page);
  widgets = new Widgets(page);
  datePicker = new DatePicker(page);

  await homePage.loadHomePage();
  await homePage.gotoWidgets();
  await widgets.navigateToDatePicker();
});

test('Verify date and time pickers', async () => {
    // Input a date
    const date = '05/12/2025';
    await datePicker.inputDate(date);

    // Input a date and time
    const time = '12:00 AM';
    await datePicker.inputTimeDateAndTime(date, time);
});

test.afterAll(async () => {
    // Close the browser context
    await context.close();
});

