import { test, expect } from '@playwright/test';
import ElementsLinksPage from '../../pages/Elements/ElementsLinksPage';
import HomePage from '../../pages/HomePage';
import ElementsPage from '../../pages/Elements/ElementsPage';

test('Verify all links functionalities', async ({ page }) => {
    const homePage = new HomePage(page);
    const elementsPage = new ElementsPage(page);
    const elementsLinksPage = new ElementsLinksPage(page);

    // Navigate to the Links section
    await homePage.loadHomePage();
    await homePage.gotoElements();
    await elementsPage.navigateToLinks();
    await elementsLinksPage.clickStaticLinkHomeAndVerify();
    await elementsLinksPage.clickDynamicLinkHomeAndVerify();
});