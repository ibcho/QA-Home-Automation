import { Locator, Page } from '@playwright/test';

export default class Slider {
    private sliderValue: Locator;
    private sliderRange: Locator;

    constructor(page: Page) {
        this.sliderRange = page.locator('input[type="range"].range-slider.range-slider--primary'); // Refined locator
        this.sliderValue = page.locator('#sliderValue');
    }

    // Method to get the current slider value
    async getSliderValue(): Promise<string> {
        const value = await this.sliderRange.getAttribute('value');
        if (value === null) throw new Error('Slider value attribute is null');
        return value;
    }

    // Method to set the slider to a specific value using a click at the calculated position
    async dragSliderToValue(value: number) {
        const slider = await this.sliderRange.elementHandle();
        if (!slider) throw new Error('Slider element not found');

        const boundingBox = await slider.boundingBox();
        if (!boundingBox) throw new Error('Unable to get slider bounding box');

        const min = parseFloat(await slider.getAttribute('min') || '0');
        const max = parseFloat(await slider.getAttribute('max') || '100');
        const sliderWidth = boundingBox.width;

        // Calculate the x offset for the desired value
        const valueRatio = (value - min) / (max - min);
        const xOffset = valueRatio * sliderWidth;

        // Click at the calculated position (relative to the slider's left edge)
        await this.sliderRange.click({
            position: {
                x: xOffset,
                y: boundingBox.height / 2
            }
        });
    }

    get rangeLocator() {
        return this.sliderRange;
    }
}