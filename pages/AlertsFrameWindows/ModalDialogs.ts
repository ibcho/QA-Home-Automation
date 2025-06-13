import { expect, Locator, Page } from "@playwright/test";

export default class ModalDialogs {
    readonly page: Page;
    readonly smallModal: Locator;
    readonly largeModal: Locator;
    readonly closeSmallModal: Locator;
    readonly closeLargeModal: Locator;

    readonly modalHeader: Locator;
    readonly modalBody: Locator;
    readonly modalFooter: Locator;

    readonly modalCloseButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.smallModal = page.locator("#showSmallModal");
        this.largeModal = page.locator("#showLargeModal");
        
        this.closeSmallModal = page.locator("#closeSmallModal");
        this.closeLargeModal = page.locator("#closeLargeModal");

        this.modalHeader = page.locator(".modal-header");
        this.modalBody = page.locator(".modal-body");
    }

    async clickSmallModal() {
        await this.smallModal.click();
    }
    async clickLargeModal() {
        await this.largeModal.click();
    }

    async clickCloseSmallModal() {
        await this.closeSmallModal.click();
    }
    async clickCloseLargeModal() {
        await this.closeLargeModal.click();
    }

    async verifyModalHeader(expectedText: string) {
        await expect(this.modalHeader).toHaveText(expectedText);
    }
    async verifyModalBody(expectedText: string) {
        await expect(this.modalBody).toHaveText(expectedText);
    }
}