import { test, expect } from '@playwright/test';
import HomePage from '../../pages/HomePage';
import Widgets from '../../pages/Widgets/Widgets';
import DatePicker from '../../pages/Widgets/DatePicker';

let homePage: HomePage;
let widgets: Widgets;
let datePicker: DatePicker;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  widgets = new Widgets(page);
  datePicker = new DatePicker(page);
});

test('Verify date and time pickers', async ({ page }) => {
    await homePage.loadHomePage();
    await homePage.gotoWidgets();
    await widgets.navigateToDatePicker();

    // Input a date
    const date = '05/12/2025';
    await datePicker.inputDate(date);
    expect(await datePicker.getDateValue()).toBe(date);

    // Input a date and time
    const time = '12:00 AM';
    await datePicker.inputTimeDateAndTime(date, time);
    const dateTimeValue = await datePicker.getDateTimeValue();
    expect(dateTimeValue).toMatch(/May 12, 2025/);
    expect(dateTimeValue).toContain(time);
});

