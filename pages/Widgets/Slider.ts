import { Locator, Page } from '@playwright/test';

export default class Slider {
    private sliderValue: Locator;
    private sliderRange: Locator;

    constructor(page: Page) {
        this.sliderRange = page.locator('input[type="range"].range-slider.range-slider--primary'); // Refined locator
        this.sliderValue = page.locator('#sliderValue');
    }

    // Method to drag the slider to a specific value
    async dragSliderToValue(value: number) {
        const slider = await this.sliderRange.elementHandle();
        if (!slider) throw new Error('Slider element not found');

        const boundingBox = await slider.boundingBox();
        if (!boundingBox) throw new Error('Unable to get slider bounding box');

        const min = parseFloat(await slider.getAttribute('min') || '0');
        const max = parseFloat(await slider.getAttribute('max') || '100');
        const sliderWidth = boundingBox.width;

        // Calculate the x-coordinate for the desired value
        const valueRatio = (value - min) / (max - min);
        const targetX = boundingBox.x + valueRatio * sliderWidth;

        // Drag the slider to the target position
        await slider.hover();
        await this.sliderRange.page().mouse.down();
        await this.sliderRange.page().mouse.move(targetX, boundingBox.y + boundingBox.height / 2);
        await this.sliderRange.page().mouse.up();
    }

    // Method to get the current slider value
    async getSliderValue(): Promise<string> {
        const value = await this.sliderRange.getAttribute('value');
        if (value === null) throw new Error('Slider value attribute is null');
        return value;
    }
}