import { test } from '@playwright/test';
import HomePage from '../../pages/HomePage';
import Widgets from '../../pages/Widgets/Widgets';
import DatePicker from '../../pages/Widgets/DatePicker';

test.describe('Testing Date Pickers', () => {
    test('Verify both date pickers', async ({ page }) => {
        const homePage = new HomePage(page);
        const widgets = new Widgets(page);
        const datePicker = new DatePicker(page);

        // Navigate to the Date Picker section
        await homePage.loadHomePage();
        await homePage.gotoWidgets();
        await widgets.navigateToDatePicker();

        // Verify the date pickers
        const date = '04/11/2025';
        const time = '12:00 AM';

        await datePicker.inputDate(date);
        await datePicker.inputTimeDateAndTime(date, time);
    });
});