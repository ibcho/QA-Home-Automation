import { test, expect, BrowserContext, Page } from '@playwright/test';
import ElementsUploadAndDownloadPage from '../pages/ElementsUploadAndDownload';
import HomePage from '../pages/HomePage';
import ElementsPage from '../pages/ElementsPage';
import * as path from 'path';

let elementsUploadDownloadPage: ElementsUploadAndDownloadPage;
let homePage: HomePage;
let elementsPage: ElementsPage;
let context: BrowserContext;
let page: Page;

test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();

    homePage = new HomePage(page);
    elementsPage = new ElementsPage(page);
    elementsUploadDownloadPage = new ElementsUploadAndDownloadPage(page);

    await homePage.navigateToHomePage();
    await homePage.gotoElements();
    await elementsPage.navigateToUploadDownload();
});

test.afterAll(async () => {
    await context.close();
});

test.describe('Upload and Download tests', () => {
    test('upload a file and verify', async () => {
        const filePath = path.resolve(__dirname, '../resources/Apartament.png');
        await elementsUploadDownloadPage.uploadFile(filePath);
        await elementsUploadDownloadPage.verifyUploadedFile('Apartament.png');
    });

    test('download a file and verify', async () => {
        const download = await elementsUploadDownloadPage.downloadFile();
        await elementsUploadDownloadPage.verifyDownloadedFile(download, 'sampleFile.txt');
    });
});