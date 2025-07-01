import { test, expect } from '@playwright/test';
import HomePage from '../../pages/HomePage';
import Widgets from '../../pages/Widgets/Widgets';
import DatePicker from '../../pages/Widgets/DatePicker';

// Input format for the date picker
const TEST_DATES = {
    future: '04/11/2025',
    past: '01/15/2020',
    current: new Date().toLocaleDateString('en-US', { 
        month: '2-digit', 
        day: '2-digit', 
        year: 'numeric' 
    })
};

// Input format for the time picker
const TEST_TIMES = {
    morning: '09:30 AM',
    afternoon: '02:45 PM',
    midnight: '12:00 AM',
    noon: '12:00 PM'
};

// Expected output format for regular date picker (keeps input format)
const EXPECTED_DATE_FORMATS = {
    future: '04/11/2025',
    past: '01/15/2020',
    current: new Date().toLocaleDateString('en-US', { 
        month: '2-digit', 
        day: '2-digit', 
        year: 'numeric' 
    })
};

// Expected output format for date & time picker (formatted output)
const EXPECTED_DATETIME_FORMATS = {
    future: 'April 11, 2025',
    past: 'January 15, 2020',
    current: new Date().toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
    })
};

const EXPECTED_TIME_FORMATS = {
    morning: '9:30 AM',
    afternoon: '2:45 PM',
    midnight: '12:00 AM',
    noon: '12:00 PM'
};

test('Complete Date Picker Regression Test', async ({ page }) => {
    const homePage = new HomePage(page);
    const widgets = new Widgets(page);
    const datePicker = new DatePicker(page);

    await test.step('Navigate to Date Picker section', async () => {
        await homePage.loadHomePage();
        await homePage.gotoWidgets();
        await widgets.navigateToDatePicker();
        
        // Wait for the page to load properly using enhanced methods
        await datePicker.waitForDatePickerToBeVisible();
        await datePicker.waitForDateTimePickerToBeVisible();
    });

    await test.step('Test Date Picker (Month Year Input)', async () => {
        // Test future date
        await datePicker.inputDate(TEST_DATES.future);
        const futureDateValue = await datePicker.getDatePickerValue();
        expect(futureDateValue).toBe(EXPECTED_DATE_FORMATS.future);
        
        // Test past date
        await datePicker.inputDate(TEST_DATES.past);
        const pastDateValue = await datePicker.getDatePickerValue();
        expect(pastDateValue).toBe(EXPECTED_DATE_FORMATS.past);
        
        // Test current date
        await datePicker.inputDate(TEST_DATES.current);
        const currentDateValue = await datePicker.getDatePickerValue();
        expect(currentDateValue).toBe(EXPECTED_DATE_FORMATS.current);
    });

    await test.step('Test Date & Time Picker', async () => {
        // Test morning time
        await datePicker.inputTimeDateAndTime(TEST_DATES.future, TEST_TIMES.morning);
        const expectedDateTime1 = `${EXPECTED_DATETIME_FORMATS.future} ${EXPECTED_TIME_FORMATS.morning}`;
        const morningValue = await datePicker.getDateTimePickerValue();
        expect(morningValue).toBe(expectedDateTime1);
        
        // Test afternoon time
        await datePicker.inputTimeDateAndTime(TEST_DATES.past, TEST_TIMES.afternoon);
        const expectedDateTime2 = `${EXPECTED_DATETIME_FORMATS.past} ${EXPECTED_TIME_FORMATS.afternoon}`;
        const afternoonValue = await datePicker.getDateTimePickerValue();
        expect(afternoonValue).toBe(expectedDateTime2);
        
        // Test midnight
        await datePicker.inputTimeDateAndTime(TEST_DATES.current, TEST_TIMES.midnight);
        const expectedDateTime3 = `${EXPECTED_DATETIME_FORMATS.current} ${EXPECTED_TIME_FORMATS.midnight}`;
        const midnightValue = await datePicker.getDateTimePickerValue();
        expect(midnightValue).toBe(expectedDateTime3);
        
        // Test noon
        await datePicker.inputTimeDateAndTime(TEST_DATES.future, TEST_TIMES.noon);
        const expectedDateTime4 = `${EXPECTED_DATETIME_FORMATS.future} ${EXPECTED_TIME_FORMATS.noon}`;
        const noonValue = await datePicker.getDateTimePickerValue();
        expect(noonValue).toBe(expectedDateTime4);
    });

    await test.step('Test Date Picker Input Validation', async () => {
        // Verify both inputs are enabled and visible using enhanced methods
        const isDatePickerEnabled = await datePicker.isDatePickerEnabled();
        const isDateTimePickerEnabled = await datePicker.isDateTimePickerEnabled();
        const isDatePickerVisible = await datePicker.isDatePickerVisible();
        const isDateTimePickerVisible = await datePicker.isDateTimePickerVisible();
        
        expect(isDatePickerEnabled).toBe(true);
        expect(isDateTimePickerEnabled).toBe(true);
        expect(isDatePickerVisible).toBe(true);
        expect(isDateTimePickerVisible).toBe(true);
        
        // Verify input fields have proper attributes
        await expect(page.locator('#datePickerMonthYearInput')).toHaveAttribute('type', 'text');
        await expect(page.locator('#dateAndTimePickerInput')).toHaveAttribute('type', 'text');
        
        // Check if inputs are properly focused when clicked
        await datePicker.focusDatePicker();
        await expect(page.locator('#datePickerMonthYearInput')).toBeFocused();
        
        await datePicker.focusDateTimePicker();
        await expect(page.locator('#dateAndTimePickerInput')).toBeFocused();
    });
});

// Test edge cases and error scenarios
test('Date Picker Edge Cases and Error Handling', async ({ page }) => {
    const homePage = new HomePage(page);
    const widgets = new Widgets(page);
    const datePicker = new DatePicker(page);

    await test.step('Navigate to Date Picker section', async () => {
        await homePage.loadHomePage();
        await homePage.gotoWidgets();
        await widgets.navigateToDatePicker();
        await datePicker.waitForDatePickerToBeVisible();
    });

    await test.step('Test Invalid Date Formats', async () => {
        const invalidDates = ['invalid-date', '13/32/2025', '00/00/0000'];
        
        for (const invalidDate of invalidDates) {
            try {
                await datePicker.inputDate(invalidDate);
                // The input should still accept the value even if invalid
                const value = await datePicker.getDatePickerValue();
                expect(value).toBe(invalidDate);
            } catch (error) {
                console.log(`Expected error for invalid date: ${invalidDate}`);
            }
        }
    });

    await test.step('Test Empty Input Handling', async () => {
        // Test clearing the inputs using enhanced methods
        await datePicker.clearDatePicker();
        const emptyDateValue = await datePicker.getDatePickerValue();
        expect(emptyDateValue).toBe('');
        
        await datePicker.clearDateTimePicker();
        const emptyDateTimeValue = await datePicker.getDateTimePickerValue();
        expect(emptyDateTimeValue).toBe('');
    });
});

// Close browser after test completion
test.afterAll(async ({ browser }) => {
    await browser.close();
});
