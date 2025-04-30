import { test, expect, Page } from '@playwright/test';
import AlertsFrameWindows from '../../pages/AlertsFrameWindows/AlersFrameWindows';
import NestedFramesPage from '../../pages/AlertsFrameWindows/NestedFrames';
import HomePage from '../../pages/HomePage';

test('Verify nested frames content', async ({ page }) => {
    // Initialize page objects
    const homePage = new HomePage(page);
    const nestedFramesPage = new NestedFramesPage(page);
    const alertsFrameWindows = new AlertsFrameWindows(page);

    // Navigate to the Nested Frames section
    await homePage.loadHomePage();
    await homePage.gotoAlertsFrameWindows();
    await alertsFrameWindows.navigateToNestedFrames();

    // Verify the parent frame text
    await nestedFramesPage.verifyParentFrameText('Parent frame');

    // Verify the child frame text
    await nestedFramesPage.verifyChildFrameText('Child Iframe');
});