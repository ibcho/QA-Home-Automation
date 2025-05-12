import { test, expect } from '@playwright/test';
import HomePage from '../../pages/HomePage';
import Widgets from '../../pages/Widgets/Widgets';
import Tabs from '../../pages/Widgets/Tabs';

test('Verify tabs functionality', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    // Initialize page objects
    const homePage = new HomePage(page);
    const widgets = new Widgets(page);
    const tabs = new Tabs(page);

    // Navigate to the Tabs section
    await homePage.loadHomePage();
    await homePage.gotoWidgets();
    await widgets.navigateToTabs()

    // Verify that each tab has the "active" class when selected
    await tabs.verifyTabsActiveClass();
    await tabs.verifyLastTabIsDisabled();
    
    await context.close(); // close browser
});


