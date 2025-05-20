// import { test, expect } from '@playwright/test';
// import ElementsDynamicProperties from '../../pages/Elements/ElementsDynamicProperties';
// import HomePage from '../../pages/HomePage';
// import ElementsPage from '../../pages/Elements/ElementsPage';

// test('Verify all dynamic properties functionalities', async ({ page }) => {
//     const homePage = new HomePage(page);
//     const elementsPage = new ElementsPage(page);
//     const elementsDynamicProperties = new ElementsDynamicProperties(page);

//     // Navigate to the Dynamic Properties section
//     await homePage.loadHomePage();
//     await homePage.gotoElements();
//     await elementsPage.navigateToDynamicProperties();
//     await elementsDynamicProperties.verifyTextWithRandomIdVisible();
//     await elementsDynamicProperties.verifyButtonEnabledAfterFiveSeconds();
//     await elementsDynamicProperties.verifyButtonColorChange();
//     await elementsDynamicProperties.verifyButtonVisibleAfterFiveSeconds();
// });