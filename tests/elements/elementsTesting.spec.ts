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

const TEST_USER = {
    name: 'Ibrahim',
    email: 'ibrahim@example.com',
    currentAddress: 'Sofia, Bulgaria',
    permanentAddress: 'Svishtov, Bulgaria'
};

const EXPECTED_CHECKBOX_ELEMENTS = [
    'home', 'desktop', 'notes', 'commands', 'documents', 'workspace',
    'react', 'angular', 'veu', 'office', 'public', 'private',
    'classified', 'general', 'downloads', 'wordFile', 'excelFile'
];

const REGISTRATION_FORM = {
    firstName: 'Ibrahim',
    lastName: 'Gavazov',
    email: 'ibrahim@example.com',
    age: '30',
    salary: '50000',
    department: 'Engineering'
};

const UPLOAD_FILE_NAME = 'sampleFile.txt';
const UPLOAD_FILE_PATH = path.resolve(__dirname, '../../testingFiles/sampleFile.txt');

test('Full Elements regression', async ({ page }) => {
    const homePage = new HomePage(page);
    const elementsPage = new ElementsPage(page);

    await test.step('Text Box Section', async () => {
        const textBoxPage = new ElementsTextBoxPage(page);
        await homePage.loadHomePage();
        await homePage.gotoElements();
        await elementsPage.navigateToTextBox();
        await textBoxPage.selectTextBox();
        expect(await textBoxPage.isTextBoxHeaderVisible()).toBe(true);
        await textBoxPage.fillAllTextBoxFormPage(
            TEST_USER.name,
            TEST_USER.email,
            TEST_USER.currentAddress,
            TEST_USER.permanentAddress
        );
        await textBoxPage.submitForm();
    });

    await test.step('Check Box Section', async () => {
        const checkBoxPage = new ElementsCheckBoxPage(page);
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
        expect(await checkBoxPage.validateSelectedHomeElements(EXPECTED_CHECKBOX_ELEMENTS)).toBe(true);
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
    });

    await test.step('Radio Buttons Section', async () => {
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
    });

    await test.step('Web Tables Section', async () => {
        const webTablesPage = new ElementsWebTablesPage(page);
        await elementsPage.navigateToWebTables();
        expect(await webTablesPage.isWebTablesTitleVisible()).toBe(true);
        await webTablesPage.addButton.click();
        await webTablesPage.verifyRegistrationFormLabels();
        await webTablesPage.verifyFieldMaxLengths();
        await webTablesPage.verifyEmailPatternValidation();
        await webTablesPage.verifyAgePatternValidation();
        await webTablesPage.submitEmptyRegistrationForm();
        await webTablesPage.verifyInvalidFieldBorderColor();
        await webTablesPage.fillRegistrationForm(
            REGISTRATION_FORM.firstName,
            REGISTRATION_FORM.lastName,
            REGISTRATION_FORM.email,
            REGISTRATION_FORM.age,
            REGISTRATION_FORM.salary,
            REGISTRATION_FORM.department
        );
        await webTablesPage.verifyValidFieldBorderColor();
        await webTablesPage.submitButton.click();
    });

    await test.step('Buttons Section', async () => {
        const buttonsPage = new ElementsButtonsPage(page);
        await elementsPage.navigateToButtons();
        await buttonsPage.performDoubleClick();
        await buttonsPage.verifyDoubleClickMessage('You have done a double click');
        await buttonsPage.performRightClick();
        await buttonsPage.verifyRightClickMessage('You have done a right click');
        await buttonsPage.performClickMe();
        await buttonsPage.verifyClickMeMessage('You have done a dynamic click');
    });

    await test.step('Links Section', async () => {
        const linksPage = new ElementsLinksPage(page);
        await elementsPage.navigateToLinks();
        await linksPage.clickStaticLinkHomeAndVerify();
        await linksPage.clickDynamicLinkHomeAndVerify();
    });

    await test.step('Upload and Download Section', async () => {
        const uploadAndDownloadPage = new ElementsUploadAndDownload(page);
        await elementsPage.navigateToUploadDownload();
        await uploadAndDownloadPage.uploadFile(UPLOAD_FILE_PATH);
        await uploadAndDownloadPage.verifyUploadedFile(UPLOAD_FILE_NAME);
        const download = await uploadAndDownloadPage.downloadFile();
        await uploadAndDownloadPage.verifyDownloadedFile(download, UPLOAD_FILE_NAME);
    });

    await test.step('Dynamic Properties Section', async () => {
        const dynamicPropertiesPage = new ElementsDynamicProperties(page);
        await elementsPage.navigateToDynamicProperties();
        await dynamicPropertiesPage.verifyTextWithRandomIdVisible();
        await dynamicPropertiesPage.verifyButtonEnabledAfterFiveSeconds();
        await dynamicPropertiesPage.verifyButtonColorChange();
        await dynamicPropertiesPage.verifyButtonVisibleAfterFiveSeconds();
    });

    await test.step('Broken Links & Images Section', async () => {
        const brokenLinksImagesPage = new ElementsBrokenLinksImages(page);
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
});