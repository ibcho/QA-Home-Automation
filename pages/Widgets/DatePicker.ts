import { Locator, Page } from '@playwright/test';

export default class DatePicker {
    private datePickerInput: Locator;
    private dateAndTimePickerInput: Locator;

    constructor(page: Page) {
        this.datePickerInput = page.locator('#datePickerMonthYearInput');
        this.dateAndTimePickerInput = page.locator('#dateAndTimePickerInput'); // Date & Time picker input
  
    }

    async inputDate(date: string): Promise<void> {
        await this.fillInput(this.datePickerInput, date);
    }

    async inputTimeDateAndTime(date: string, time: string): Promise<void> {
        const dateTime = `${date} ${time}`;
        await this.fillInput(this.dateAndTimePickerInput, dateTime);
    }

    private async fillInput(input: Locator, value: string): Promise<void> {
        await input.click();
        await input.clear();
        await input.fill(value);
        await input.press('Enter');
    }
}