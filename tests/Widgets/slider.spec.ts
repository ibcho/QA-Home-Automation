import { test, BrowserContext, Page, expect } from '@playwright/test';
import HomePage from '../../pages/HomePage';
import Widgets from '../../pages/Widgets/Widgets';
import Slider from '../../pages/Widgets/Slider';

let context: BrowserContext;
let page: Page;

let homePage: HomePage;
let widgets: Widgets;
let slider: Slider;

test.beforeAll(async ({ browser }) => {
  context = await browser.newContext();
  page = await context.newPage();
  homePage = new HomePage(page);
  widgets = new Widgets(page);
  slider = new Slider(page);

  await homePage.loadHomePage();
  await homePage.gotoWidgets();
  await widgets.navigateToSlider();
});

test.describe('Testing Slider', () => {
    test('Verify slider change', async () => {
        const inputValue = 50; // Set the slider value to 50

        // Drag the slider to the desired value
        await slider.dragSliderToValue(inputValue);

        // Get the current slider value
        const sliderValue = await slider.getSliderValue();
    });
});