import { expect, Locator, Page } from "@playwright/test";
import * as fs from 'fs';
import * as path from 'path';

export default class ElementsUploadAndDownloadPage {
    readonly page: Page;
    readonly uploadInput: Locator;
    readonly downloadButton: Locator;
    readonly uploadedFilePath: Locator;

    constructor(page: Page) {
        this.page = page;
        this.uploadInput = page.locator('#uploadFile');
        this.downloadButton = page.locator('#downloadButton');
        this.uploadedFilePath = page.locator('#uploadedFilePath');
    }

    async uploadFile(filePath: string) {
        await this.uploadInput.setInputFiles(filePath);
    }

    async verifyUploadedFile(expectedFilePath: string) {
        await expect(this.uploadedFilePath).toHaveText(`C:\\fakepath\\${expectedFilePath}`);
    }

    async downloadFile() {
        const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            this.downloadButton.click()
        ]);
        return download;
    }

    async verifyDownloadedFile(download, expectedFileName: string) {
        const downloadPath = path.join(__dirname, expectedFileName);
        await download.saveAs(downloadPath);
        expect(fs.existsSync(downloadPath)).toBe(true);
    }
}