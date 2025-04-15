import { Locator, Page } from "@playwright/test";

export default class AccordianPage { 
    page: Page;

    whatIsLoremIpsum_dropDown: Locator;
    whatIsLoremIpsum_dropDownText: Locator;
    whereDoesItComeFrom_dropDown: Locator;
    whereDoesItComeFrom_dropDownText: Locator;
    whyDoweUseIt_dropDown: Locator;
    whyDoweUseIt_dropDownText: Locator;

    // New locators for the specific <p> elements
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

        // Locators for the specific <p> elements
        this.loremIpsumParagraph = page.locator('#section1Content > p');
        this.longEstablishedFactParagraph = page.locator('#section3Content > p');
    }

    async clickWhatIsLoremIpsum() {
        await this.whatIsLoremIpsum_dropDown.dblclick();
    }
    async clickWhereDoesItComeFrom() {
        await this.whereDoesItComeFrom_dropDown.click();
    }
    async clickWhyDoweUseIt() {
        await this.whyDoweUseIt_dropDown.click();
    }

    async verifyWhatIsLoremIpsumText(expectedText: string) {
        const text = await this.whatIsLoremIpsum_dropDownText.innerText();
        if (text !== expectedText) {
            throw new Error(`Expected text: ${expectedText}, but got: ${text}`);
        }
    }

    async verifyWhereDoesItComeFromFirstParagraph(expectedText: string) {
        const text = await this.whereDoesItComeFrom_dropDownText.innerText();
        if (text !== expectedText) {
            throw new Error(`Expected text: ${expectedText}, but got: ${text}`);
        }
    }

    async verifyWhereDoesItComeFromText(expectedText: string) {
        const text = await this.whereDoesItComeFrom_dropDownText.innerText();
        if (text !== expectedText) {
            throw new Error(`Expected text: ${expectedText}, but got: ${text}`);
        }
    }


    async verifyWhyDoweUseItText(expectedText: string) {
        const text = await this.whyDoweUseIt_dropDownText.innerText();
        if (text !== expectedText) {
            throw new Error(`Expected text: ${expectedText}, but got: ${text}`);
        }   
    }

    // New method to verify the "Lorem Ipsum" paragraph
    async verifyLoremIpsumParagraph(expectedText: string) {
        const text = await this.loremIpsumParagraph.innerText();
        if (text !== expectedText) {
            throw new Error(`Expected text: ${expectedText}, but got: ${text}`);
        }
    }

    // New method to verify the "Long Established Fact" paragraph
    async verifyLongEstablishedFactParagraph(expectedText: string) {
        const text = await this.longEstablishedFactParagraph.innerText();
        if (text !== expectedText) {
            throw new Error(`Expected text: ${expectedText}, but got: ${text}`);
        }
    }
}