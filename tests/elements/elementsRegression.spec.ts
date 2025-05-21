import { test, expect } from '@playwright/test';
import path from 'path';
import HomePage from '../../pages/HomePage';
import ElementsPage from '../../pages/Elements/ElementsPage';
import ElementsTextBoxPage from '../../pages/Elements/ElementsTextBoxPage';
import ElementsCheckBoxPage from '../../pages/Elements/ElementsCheckBoxPage';
import ElementsButtonsPage from '../../pages/Elements/ElementsButtonsPage';
import ElementsDynamicProperties from '../../pages/Elements/ElementsDynamicProperties';
import ElementsLinksPage from '../../pages/Elements/ElementsLinksPage';
import ElementsRadioButtonsPage from '../../pages/Elements/ElementsRadioButtonsPage';
import ElementsUploadAndDownload from '../../pages/Elements/ElementsUploadAndDownload';
import ElementsWebTablesPage from '../../pages/Elements/ElementsWebTablesPage';
import ElementsBrokenLinksImages from '../../pages/Elements/ElementsBrokenLinksImages';

test('Full Elements regression', async ({ page }) => {
    const homePage = new HomePage(page);
    const elementsPage = new ElementsPage(page);
    const textBoxPage = new ElementsTextBoxPage(page);
    const checkBoxPage = new ElementsCheckBoxPage(page);
    const buttonsPage = new ElementsButtonsPage(page);
    const dynamicPropertiesPage = new ElementsDynamicProperties(page);
    const linksPage = new ElementsLinksPage(page);
    const webTablesPage = new ElementsWebTablesPage(page);
    const brokenLinksImagesPage = new ElementsBrokenLinksImages(page);

    // --- TextBox Section ---
    await homePage.loadHomePage();
    await homePage.gotoElements();
    await elementsPage.navigateToTextBox();
    await textBoxPage.selectTextBox();
    expect(await textBoxPage.isTextBoxHeaderVisible()).toBe(true);
    await textBoxPage.fillAllTextBoxFormPage('ibrata gavaza', 'ibragavaza@abv.bg', 'Sofia, Bulgaria', 'Svishtov, Bulgaria');
    await textBoxPage.submitForm();

    // --- CheckBox Section ---
    await elementsPage.navigateToCheckBox();
    await checkBoxPage.isCheckBoxTitleVisible();
    await checkBoxPage.isCheckBoxTitleContainsHome();
    await checkBoxPage.toggleCheckBox();
    expect(await checkBoxPage.isCheckBoxChecked()).toBe(true);
    await checkBoxPage.toggleCheckBox();
    expect(await checkBoxPage.isCheckBoxUnchecked()).toBe(true);
    await checkBoxPage.expandCheckBoxHome();
    expect(await checkBoxPage.isCheckBoxHomeExpanded()).toBe(true);
    await checkBoxPage.collapseCheckBoxHome();
    expect(await checkBoxPage.isCheckBoxHomeCollapsed()).toBe(true);
    await checkBoxPage.toggleCheckBox();
    const expectedElements = [
        'home', 'desktop', 'notes', 'commands', 'documents', 'workspace',
        'react', 'angular', 'veu', 'office', 'public', 'private',
        'classified', 'general', 'downloads', 'wordFile', 'excelFile'
    ];
    expect(await checkBoxPage.validateSelectedHomeElements(expectedElements)).toBe(true);
    await checkBoxPage.toggleCheckBox();
    await checkBoxPage.expandAllCheckboxes();
    expect(await checkBoxPage.isExpandedDesktopNodeVisible()).toBe(true);
    expect(await checkBoxPage.isExpandedDocumentsNodeVisible()).toBe(true);
    expect(await checkBoxPage.isExpandedOfficeNodeVisible()).toBe(true);
    expect(await checkBoxPage.isExpandedDownloadNodeVisible()).toBe(true);
    await checkBoxPage.collapseAllCheckboxes();
    expect(await checkBoxPage.isExpandedDesktopNodeNotVisible()).toBe(true);
    expect(await checkBoxPage.isExpandedDocumentsNodeNotVisible()).toBe(true);
    expect(await checkBoxPage.isExpandedOfficeNodeNotVisible()).toBe(true);
    expect(await checkBoxPage.isExpandedDownloadNodeNotVisible()).toBe(true);

    // --- Radio Buttons Section ---
    const radioButtonsPage = new ElementsRadioButtonsPage(page);
    await elementsPage.navigateToRadioButton();
    expect(await radioButtonsPage.isRadioButtonsTitleVisible()).toBeTruthy();
    await radioButtonsPage.selectRadioButton('yes');
    expect(await radioButtonsPage.isRadioButtonSelected('yes')).toBeTruthy();
    expect(await radioButtonsPage.getSelectedRadioButtonText()).toBe('Yes');
    await radioButtonsPage.selectRadioButton('impressive');
    expect(await radioButtonsPage.isRadioButtonSelected('impressive')).toBeTruthy();
    expect(await radioButtonsPage.getSelectedRadioButtonText()).toBe('Impressive');
    expect(await radioButtonsPage.isRadioButtonDisabled('no')).toBeTruthy();

    // --- Web Tables Section ---
    await elementsPage.navigateToWebTables();
    expect(await webTablesPage.isWebTablesTitleVisible()).toBe(true);
    await webTablesPage.addButton.click();
    await webTablesPage.verifyRegistrationFormLabels();
    await webTablesPage.verifyFieldMaxLengths();
    await webTablesPage.verifyEmailPatternValidation();
    await webTablesPage.verifyAgePatternValidation();
    await webTablesPage.submitEmptyRegistrationForm();
    await webTablesPage.verifyInvalidFieldBorderColor();
    await webTablesPage.fillRegistrationForm('Ibrahim', 'Gavazov', 'ibrahim@example.com', '30', '50000', 'Engineering');
    await webTablesPage.verifyValidFieldBorderColor();
    await webTablesPage.submitButton.click();

    // --- Buttons Section ---
    await elementsPage.navigateToButtons();
    await buttonsPage.performDoubleClick();
    await buttonsPage.verifyDoubleClickMessage('You have done a double click');
    await buttonsPage.performRightClick();
    await buttonsPage.verifyRightClickMessage('You have done a right click');
    await buttonsPage.performClickMe();
    await buttonsPage.verifyClickMeMessage('You have done a dynamic click');

    // --- Links Section ---
    await elementsPage.navigateToLinks();
    await linksPage.clickStaticLinkHomeAndVerify();
    await linksPage.clickDynamicLinkHomeAndVerify();

    // --- Upload and Download Section ---
    const uploadAndDownloadPage = new ElementsUploadAndDownload(page);
    await elementsPage.navigateToUploadDownload();
    const filePath = path.resolve(__dirname, '../../testingFiles/sampleFile.txt');
    await uploadAndDownloadPage.uploadFile(filePath);
    await uploadAndDownloadPage.verifyUploadedFile('sampleFile.txt');
    const download = await uploadAndDownloadPage.downloadFile();
    await uploadAndDownloadPage.verifyDownloadedFile(download, 'sampleFile.txt');

    // --- Dynamic Properties Section ---
    await elementsPage.navigateToDynamicProperties();
    await dynamicPropertiesPage.verifyTextWithRandomIdVisible();
    await dynamicPropertiesPage.verifyButtonEnabledAfterFiveSeconds();
    await dynamicPropertiesPage.verifyButtonColorChange();
    await dynamicPropertiesPage.verifyButtonVisibleAfterFiveSeconds();

    // --- Broken Links & Images Section ---
    await elementsPage.navigateToBrokenLinksImages();
    await brokenLinksImagesPage.verifyValidImageVisible();
    await brokenLinksImagesPage.verifyBrokenImageNotVisible();
    await brokenLinksImagesPage.clickValidLinkAndVerify();
    // reset the state of the page
    await homePage.loadHomePage();
    await homePage.gotoElements();
    await elementsPage.navigateToBrokenLinksImages();
    await brokenLinksImagesPage.clickBrokenLink();
    await page.waitForLoadState('domcontentloaded');
    const statusCodeDiv = page.locator('.example');
    await expect(statusCodeDiv).toContainText('This page returned a 500 status code.', { timeout: 8000 });
    await expect(statusCodeDiv).toContainText('For a definition and common list of HTTP status codes, go', { timeout: 8000 });
});