import { test, expect } from '@playwright/test';
import HomePage from '../../pages/HomePage';
import Widgets from '../../pages/Widgets/Widgets';
import Progressbar from '../../pages/Widgets/Progressbar';

test('Progress bar increases after starting', async ({ page }) => {
    const homePage = new HomePage(page);
    const widgets = new Widgets(page);
    const progressBar = new Progressbar(page);

    await homePage.loadHomePage();
    await homePage.gotoWidgets();
    await widgets.navigateToProgressBar();

    const initialValue = await progressBar.getValue();
    await progressBar.start();
    await page.waitForTimeout(2000); // Wait 2 seconds
    await progressBar.stop();
    const finalValue = await progressBar.getValue();

    expect(finalValue).toBeGreaterThan(initialValue);
});