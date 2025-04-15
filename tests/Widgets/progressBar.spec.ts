import { test, BrowserContext, Page, expect } from '@playwright/test';
import HomePage from '../../pages/HomePage';
import Widgets from '../../pages/Widgets/Widgets';
import Progressbar from '../../pages/Widgets/Progressbar';

let context: BrowserContext;
let page: Page;

let homePage: HomePage;
let widgets: Widgets;
let progressBar: Progressbar;

test.beforeAll(async ({ browser }) => {
  context = await browser.newContext();
  page = await context.newPage();
  homePage = new HomePage(page);
  widgets = new Widgets(page);
  progressBar = new Progressbar(page);

  await homePage.loadHomePage();
  await homePage.gotoWidgets();
  await widgets.navigateToProgressBar();
});

test.afterAll(async () => {
  await context.close();
});

test.describe('Testing Progress Bar', () => {
    test('Verify progress bar reaches target value', async ({}) => {
        const progressBar = new Progressbar(page);

        // Start the progress bar
        await progressBar.startAndStopProgressBar();
        await page.waitForTimeout(5000); // Wait for 5 seconds to allow the progress bar to update
        await progressBar.startAndStopProgressBar();

        // Verify the progress bar value
        const progressBarValue = await progressBar.getProgressBarValue();
        expect(progressBarValue).toBeGreaterThanOrEqual(50);
        console.log('Final progress bar value:', progressBarValue);
    });
});