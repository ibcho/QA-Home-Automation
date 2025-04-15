import { Locator, Page } from '@playwright/test';

export default class DatePicker {
    // Date Picker Locators
    private datePickerInput: Locator;
    private monthYearLabel: Locator;
    private nextButton: Locator;
    private previousButton: Locator;
    private datePickerCalendar: Locator;
    private datePickerCalendarDays: Locator;
    private monthDropdown: Locator;
    private yearDropdown: Locator;
    private specificDate: Locator;

    // Date & Time Picker Locators
    private dateAndTimePickerInput: Locator;
    private dateAndTimeNextButton: Locator;
    private dateAndTimePreviousButton: Locator;
    private dateAndTimeMonthDropdownArrow: Locator;
    private dateAndTimeYearPicker: Locator;
    private dateAndTimePickerTimeOptions: Locator;
    private dateAndTimePickerTimeList: Locator; // Scrollable time list

    constructor(page: Page) {
        // Date Picker Locators
        this.datePickerInput = page.locator('#datePickerMonthYearInput');
        this.monthYearLabel = page.locator('.react-datepicker__current-month');
        this.nextButton = page.locator('.react-datepicker__navigation--next'); // Forward button
        this.previousButton = page.locator('.react-datepicker__navigation--previous'); // Back button
        this.datePickerCalendar = page.locator('.react-datepicker__month');
        this.datePickerCalendarDays = page.locator('.react-datepicker__day');
        this.monthDropdown = page.locator('.react-datepicker__month-select'); // Month dropdown
        this.yearDropdown = page.locator('.react-datepicker__year-select'); // Year dropdown
        this.specificDate = page.locator('.react-datepicker__day--011'); // Specific date (April 11th, 2025)

        // Date & Time Picker Locators
        this.dateAndTimePickerInput = page.locator('#dateAndTimePickerInput'); // Date & Time picker input
        this.dateAndTimeNextButton = page.locator('.react-datepicker__navigation--next.react-datepicker__navigation--next--with-time'); // Forward button
        this.dateAndTimePreviousButton = page.locator('.react-datepicker__navigation--previous'); // Back button
        this.dateAndTimeMonthDropdownArrow = page.locator('.react-datepicker__month-read-view--down-arrow'); // Month dropdown arrow
        this.dateAndTimeYearPicker = page.locator('.react-datepicker__year-read-view'); // Year picker
        this.dateAndTimePickerTimeOptions = page.locator('.react-datepicker__time-list-item'); // Time picker options
        this.dateAndTimePickerTimeList = page.locator('.react-datepicker__time-list'); // Scrollable time list
    }

    async inputDate(date: string) {
        await this.datePickerInput.click();
        await this.datePickerInput.clear();
        await this.datePickerInput.fill(date);
        await this.datePickerInput.press('Enter');
    }

    async inputTimeDateAndTime(date: string, time: string) {
        await this.dateAndTimePickerInput.click();
        await this.dateAndTimePickerInput.clear();
        await this.dateAndTimePickerInput.fill(date + ' ' + time);
        await this.dateAndTimePickerInput.press('Enter');
    }
}