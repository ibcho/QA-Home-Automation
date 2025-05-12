// import { test, expect } from '@playwright/test';
// import ElementsUploadAndDownloadPage from '../../pages/Elements/ElementsUploadAndDownload';
// import HomePage from '../../pages/HomePage';
// import ElementsPage from '../../pages/Elements/ElementsPage';
// import * as path from 'path';

// test('Verify upload and download functionalities', async ({ page }) => {
//     const homePage = new HomePage(page);
//     const elementsPage = new ElementsPage(page);
//     const elementsUploadDownloadPage = new ElementsUploadAndDownloadPage(page);

//     // Navigate to the Upload and Download section
//     await homePage.loadHomePage();
//     await homePage.gotoElements();
//     await elementsPage.navigateToUploadDownload();

//     // Upload a file and verify
//     const filePath = path.resolve(__dirname, 'C:/Users/IbrahimGavazov/Apartament.png');
//     await elementsUploadDownloadPage.uploadFile(filePath);
//     await elementsUploadDownloadPage.verifyUploadedFile('Apartament.png');

//     // Download a file and verify
//     const download = await elementsUploadDownloadPage.downloadFile();
//     await elementsUploadDownloadPage.verifyDownloadedFile(download, 'sampleFile.txt');
// });