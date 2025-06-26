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
        if (!fs.existsSync(filePath)) {
            throw new Error(`Upload file does not exist: ${filePath}`);
        }
        await this.uploadInput.setInputFiles(filePath);
    }

    async verifyUploadedFile(expectedFileName: string) {
        await expect(this.uploadedFilePath).toHaveText(`C:\\fakepath\\${expectedFileName}`);
    }

    async downloadFile() {
        const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            this.downloadButton.click()
        ]);
        return download;
    }

    async verifyDownloadedFile(download, expectedFileName: string) {
        // Save to a dedicated downloads directory in the project root
        const downloadsDir = path.resolve(process.cwd(), 'downloads');
        if (!fs.existsSync(downloadsDir)) {
            fs.mkdirSync(downloadsDir);
        }
        const downloadPath = path.join(downloadsDir, expectedFileName);
        await download.saveAs(downloadPath);
        expect(fs.existsSync(downloadPath)).toBe(true);
    }
}