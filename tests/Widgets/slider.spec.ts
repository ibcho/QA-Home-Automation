import { test, expect } from '@playwright/test';
import HomePage from '../../pages/HomePage';
import Widgets from '../../pages/Widgets/Widgets';
import Slider from '../../pages/Widgets/Slider';

let homePage: HomePage;
let widgets: Widgets;
let slider: Slider;

// Use per-test isolation

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  widgets = new Widgets(page);
  slider = new Slider(page);

  await homePage.loadHomePage();
  await homePage.gotoWidgets();
  await widgets.navigateToSlider();
});

test('Verify slider change', async ({ page }) => {
  const min = await slider.rangeLocator.getAttribute('min');
  const max = await slider.rangeLocator.getAttribute('max');
  const step = await slider.rangeLocator.getAttribute('step');
  console.log({ min, max, step });

  const inputValue = 50; // Set the slider value to 50
  await slider.dragSliderToValue(inputValue);
  const sliderValue = await slider.getSliderValue();
  console.log('Slider value after setting:', sliderValue);
  expect(Number(sliderValue)).toBe(inputValue);
});