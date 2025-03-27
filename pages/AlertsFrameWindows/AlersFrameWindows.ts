import { expect, Locator, Page } from "@playwright/test";

export default class AlertsFrameWindows {
    page: Page;

    readonly browserWindows: Locator;
    readonly alerts: Locator;
    readonly frames: Locator;
    readonly nestedFrames: Locator;
    readonly modalDialogs: Locator;


    constructor(page: Page) {
        this.page = page;
         
        this.browserWindows = page.locator('text=Browser Windows');
        this.alerts = page.locator('text=Alerts');
        this.frames = page.locator('text=Frames');
        this.nestedFrames = page.locator('text=Nested Frames');
        this.modalDialogs = page.locator('text=Modal Dialogs');
    }

    async clickBrowserWindows() {
        await this.browserWindows.click();
    }

    async clickAlerts() {
        await this.alerts.click();
    }

    async clickFrames() {
        await this.frames.click();
    }

    async clickNestedFrames() {
        await this.nestedFrames.click();
    }

    async clickModalDialogs() {
        await this.modalDialogs.click();
    }

}