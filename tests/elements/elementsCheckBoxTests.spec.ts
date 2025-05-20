// import { test, expect } from '@playwright/test';
// import CheckBoxPage from '../../pages/Elements/ElementsCheckBoxPage';
// import HomePage from '../../pages/HomePage';
// import ElementsPage from '../../pages/Elements/ElementsPage';

// test('Verify all checkbox functionalities', async ({ page }) => {
//     const homePage = new HomePage(page);
//     const checkBoxPage = new CheckBoxPage(page);
//     const elementsPage = new ElementsPage(page);

//     // Navigate to the CheckBox section
//     await homePage.loadHomePage();
//     await homePage.gotoElements();
//     await elementsPage.navigateToCheckBox();

//     // Verify the CheckBox title is visible and contains "Home"
//     await checkBoxPage.isCheckBoxTitleVisible();
//     await checkBoxPage.isCheckBoxTitleContainsHome();

//     // Test: Home checkbox - check and uncheck
//     await checkBoxPage.toggleCheckBox();
//     expect(await checkBoxPage.isCheckBoxChecked()).toBe(true);
//     await checkBoxPage.toggleCheckBox();
//     expect(await checkBoxPage.isCheckBoxUnchecked()).toBe(true);

//     // Test: Expand and collapse Home checkbox
//     await checkBoxPage.expandCheckBoxHome();
//     expect(await checkBoxPage.isCheckBoxHomeExpanded()).toBe(true);
//     await checkBoxPage.collapseCheckBoxHome();
//     expect(await checkBoxPage.isCheckBoxHomeCollapsed()).toBe(true);

//     // Test: Validate selected elements after selecting Home checkbox
//     await checkBoxPage.toggleCheckBox();
//     const expectedElements = [
//         'home', 'desktop', 'notes', 'commands', 'documents', 'workspace',
//         'react', 'angular', 'veu', 'office', 'public', 'private',
//         'classified', 'general', 'downloads', 'wordFile', 'excelFile'
//     ];
//     expect(await checkBoxPage.validateSelectedHomeElements(expectedElements)).toBe(true);
//     await checkBoxPage.toggleCheckBox();

//     // Test: Validate expand all and collapse all
//     await checkBoxPage.expandAllCheckboxes();
//     expect(await checkBoxPage.isExpandedDesktopNodeVisible()).toBe(true);
//     expect(await checkBoxPage.isExpandedDocumentsNodeVisible()).toBe(true);
//     expect(await checkBoxPage.isExpandedOfficeNodeVisible()).toBe(true);
//     expect(await checkBoxPage.isExpandedDownloadNodeVisible()).toBe(true);
//     await checkBoxPage.collapseAllCheckboxes();
//     expect(await checkBoxPage.isExpandedDesktopNodeNotVisible()).toBe(true);
//     expect(await checkBoxPage.isExpandedDocumentsNodeNotVisible()).toBe(true);
//     expect(await checkBoxPage.isExpandedOfficeNodeNotVisible()).toBe(true);
//     expect(await checkBoxPage.isExpandedDownloadNodeNotVisible()).toBe(true);
// });