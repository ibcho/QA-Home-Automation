import { Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';

export default class DatePicker extends BasePage {
    // Date picker input (Month/Year only)
    private readonly datePickerInput: Locator;
    
    // Date & Time picker input
    private readonly dateAndTimePickerInput: Locator;

    constructor(page: Page) {
        super(page);
        this.datePickerInput = page.locator('#datePickerMonthYearInput');
        this.dateAndTimePickerInput = page.locator('#dateAndTimePickerInput');
    }

    /**
     * Input date in the date picker (Month/Year format)
     */
    async inputDate(date: string): Promise<void> {
        await this.fillDateInput(this.datePickerInput, date);
    }

    /**
     * Input date and time in the date & time picker
     */
    async inputTimeDateAndTime(date: string, time: string): Promise<void> {
        const dateTime = `${date} ${time}`;
        await this.fillDateInput(this.dateAndTimePickerInput, dateTime);
    }

    /**
     * Get the current value of the date picker
     */
    async getDatePickerValue(): Promise<string> {
        await this.waitForElement(this.datePickerInput);
        return await this.datePickerInput.inputValue();
    }

    /**
     * Get the current value of the date & time picker
     */
    async getDateTimePickerValue(): Promise<string> {
        await this.waitForElement(this.dateAndTimePickerInput);
        return await this.dateAndTimePickerInput.inputValue();
    }

    /**
     * Clear the date picker input
     */
    async clearDatePicker(): Promise<void> {
        await this.safeClick(this.datePickerInput);
        await this.datePickerInput.clear();
    }

    /**
     * Clear the date & time picker input
     */
    async clearDateTimePicker(): Promise<void> {
        await this.safeClick(this.dateAndTimePickerInput);
        await this.dateAndTimePickerInput.clear();
    }

    /**
     * Check if date picker is enabled
     */
    async isDatePickerEnabled(): Promise<boolean> {
        return await this.datePickerInput.isEnabled();
    }

    /**
     * Check if date & time picker is enabled
     */
    async isDateTimePickerEnabled(): Promise<boolean> {
        return await this.dateAndTimePickerInput.isEnabled();
    }

    /**
     * Check if date picker is visible
     */
    async isDatePickerVisible(): Promise<boolean> {
        return await this.isVisible(this.datePickerInput);
    }

    /**
     * Check if date & time picker is visible
     */
    async isDateTimePickerVisible(): Promise<boolean> {
        return await this.isVisible(this.dateAndTimePickerInput);
    }

    /**
     * Focus the date picker input
     */
    async focusDatePicker(): Promise<void> {
        await this.datePickerInput.focus();
    }

    /**
     * Focus the date & time picker input
     */
    async focusDateTimePicker(): Promise<void> {
        await this.dateAndTimePickerInput.focus();
    }

    /**
     * Wait for date picker to be visible
     */
    async waitForDatePickerToBeVisible(): Promise<void> {
        await this.waitForElement(this.datePickerInput);
    }

    /**
     * Wait for date & time picker to be visible
     */
    async waitForDateTimePickerToBeVisible(): Promise<void> {
        await this.waitForElement(this.dateAndTimePickerInput);
    }

    /**
     * Verify date picker has expected value
     */
    async verifyDatePickerValue(expectedValue: string): Promise<void> {
        const actualValue = await this.getDatePickerValue();
        if (actualValue !== expectedValue) {
            throw new Error(`Date picker value mismatch. Expected: "${expectedValue}", Actual: "${actualValue}"`);
        }
    }

    /**
     * Verify date & time picker has expected value
     */
    async verifyDateTimePickerValue(expectedValue: string): Promise<void> {
        const actualValue = await this.getDateTimePickerValue();
        if (actualValue !== expectedValue) {
            throw new Error(`Date & time picker value mismatch. Expected: "${expectedValue}", Actual: "${actualValue}"`);
        }
    }

    /**
     * Fill date input with improved error handling and retry mechanism
     */
    private async fillDateInput(input: Locator, value: string, retries: number = 3): Promise<void> {
        for (let i = 0; i < retries; i++) {
            try {
                await this.waitForElement(input);
                await this.safeClick(input);
                await input.clear();
                await this.safeFill(input, value);
                await input.press('Enter');
                
                // Wait for the input to be processed
                await this.page.waitForTimeout(500);
                return;
            } catch (error) {
                if (i === retries - 1) {
                    console.error(`Failed to fill date input with value "${value}" after ${retries} attempts:`, error);
                    throw error;
                }
                console.log(`Retry ${i + 1}/${retries} for date input fill operation`);
                await this.page.waitForTimeout(1000);
            }
        }
    }

    /**
     * Get both date picker values for comparison
     */
    async getBothPickerValues(): Promise<{ datePicker: string; dateTimePicker: string }> {
        return {
            datePicker: await this.getDatePickerValue(),
            dateTimePicker: await this.getDateTimePickerValue()
        };
    }

    /**
     * Verify both date pickers are working correctly
     */
    async verifyBothPickersWorking(): Promise<void> {
        await this.verifyVisible(this.datePickerInput);
        await this.verifyVisible(this.dateAndTimePickerInput);
        
        const dateEnabled = await this.isDatePickerEnabled();
        const dateTimeEnabled = await this.isDateTimePickerEnabled();
        
        if (!dateEnabled || !dateTimeEnabled) {
            throw new Error('One or both date pickers are not enabled');
        }
    }

    async getDateValue(): Promise<string> {
        return await this.page.locator('input#datePickerMonthYearInput').inputValue();
    }

    async getDateTimeValue(): Promise<string> {
        return await this.page.locator('input#dateAndTimePickerInput').inputValue();
    }
}