import { Locator, Page } from "@playwright/test";

export default class Widgets { 
    page: Page;

    readonly accordian: Locator;
    readonly autoComplete: Locator;
    readonly datePicker: Locator;
    readonly slider: Locator;
    readonly progressBar: Locator;
    readonly tabs: Locator;
    readonly toolTip: Locator;
    readonly menu: Locator;
    readonly selectMenu: Locator;

    constructor(page: Page) {
        this.page = page;

        this.accordian = page.getByText('Accordian');
        this.autoComplete = page.getByText('Auto Complete');
        this.datePicker = page.getByText('Date Picker');
        this.slider = page.getByText('Slider');
        this.progressBar = page.getByText('Progress Bar');
        this.tabs = page.getByText('Tabs');
        this.toolTip = page.getByText('Tool Tips');
        this.menu = page.getByText('Menu').nth(0);
        this.selectMenu = page.getByText('Select Menu').nth(1);;
    }

    private async navigateToSection(locator: Locator, sectionName: string) {
        try {
            console.log(`Navigating to ${sectionName}...`);
            await locator.click();
        } catch (error) {
            console.error(`Failed to navigate to ${sectionName}:`, error);
            throw error;
        }
    }

    async navigateToAccordian() {
        await this.navigateToSection(this.accordian, 'Accordian');
    }

    async navigateToAutoComplete() {
        await this.navigateToSection(this.autoComplete, 'Auto Complete');
    }

    async navigateToDatePicker() {
        await this.navigateToSection(this.datePicker, 'Date Picker');
    }

    async navigateToSlider() {
        await this.navigateToSection(this.slider, 'Slider');
    }

    async navigateToProgressBar() {
        await this.navigateToSection(this.progressBar, 'Progress Bar');
    }

    async navigateToTabs() {
        await this.navigateToSection(this.tabs, 'Tabs');
    }

    async navigateToToolTip() {
        await this.navigateToSection(this.toolTip, 'Tool Tips');
    }

    async navigateToMenu() {
        await this.navigateToSection(this.menu, 'Menu');
    }

    async navigateToSelectMenu() {
        await this.navigateToSection(this.selectMenu, 'Select Menu');
    }
}