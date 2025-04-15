import { test, BrowserContext, Page } from '@playwright/test';
import HomePage from '../../pages/HomePage';
import Widgets from '../../pages/Widgets/Widgets';
import DatePicker from '../../pages/Widgets/DatePicker';

let homePage : HomePage;
let context: BrowserContext;
let page: Page;
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

test.afterAll(async () => {
    await context.close(); 
});

test.describe('Testing Date Pickers', () => {
    test('Verify both date pickers', async () => {
        const date = '04/11/2025';
        const time = '12:00 AM'

        await datePicker.inputDate(date);
        await datePicker.inputTimeDateAndTime(date, time);
    });
});