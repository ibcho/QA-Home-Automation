import { Locator, Page } from "@playwright/test";

export default class AccordianPage {
    page: Page;

    whatIsLoremIpsum_dropDown: Locator;
    whatIsLoremIpsum_dropDownText: Locator;
    whereDoesItComeFrom_dropDown: Locator;
    whereDoesItComeFrom_dropDownText: Locator;
    whyDoweUseIt_dropDown: Locator;
    whyDoweUseIt_dropDownText: Locator;

    loremIpsumParagraph: Locator;
    longEstablishedFactParagraph: Locator;

    constructor(page: Page) {
        this.page = page;
        this.whatIsLoremIpsum_dropDown = page.locator('#section1Heading');
        this.whatIsLoremIpsum_dropDownText = page.locator('#section1Content > p').nth(0);
        this.whereDoesItComeFrom_dropDown = page.locator('#section2Heading');
        this.whereDoesItComeFrom_dropDownText = page.locator('#section2Content > p').nth(0);
        this.whyDoweUseIt_dropDown = page.locator('#section3Heading');
        this.whyDoweUseIt_dropDownText = page.locator('#section3Content > p').nth(0);

        this.loremIpsumParagraph = page.locator('#section1Content > p');
        this.longEstablishedFactParagraph = page.locator('#section3Content > p');
    }

    async clickDropDown(dropDown: Locator) {
        await dropDown.click();
    }

    async verifyText(locator: Locator, expectedText: string) {
        const text = await locator.innerText();
        if (text !== expectedText) {
            throw new Error(`Expected text: ${expectedText}, but got: ${text}`);
        }
    }

    async clickWhatIsLoremIpsum() {
        await this.clickDropDown(this.whatIsLoremIpsum_dropDown);
    }

    async clickWhereDoesItComeFrom() {
        await this.clickDropDown(this.whereDoesItComeFrom_dropDown);
    }

    async clickWhyDoweUseIt() {
        await this.clickDropDown(this.whyDoweUseIt_dropDown);
    }

    async verifyWhatIsLoremIpsumText(expectedText: string) {
        await this.verifyText(this.whatIsLoremIpsum_dropDownText, expectedText);
    }

    async verifyWhereDoesItComeFromText(expectedText: string) {
        await this.verifyText(this.whereDoesItComeFrom_dropDownText, expectedText);
    }

    async verifyWhyDoweUseItText(expectedText: string) {
        await this.verifyText(this.whyDoweUseIt_dropDownText, expectedText);
    }

    async verifyLoremIpsumParagraph(expectedText: string) {
        await this.verifyText(this.loremIpsumParagraph, expectedText);
    }

    async verifyLongEstablishedFactParagraph(expectedText: string) {
        await this.verifyText(this.longEstablishedFactParagraph, expectedText);
    }
}