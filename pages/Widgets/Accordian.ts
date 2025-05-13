import { Locator, Page, expect } from "@playwright/test";
import { time } from "console";

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

    async clickAccourdianSection(section: Locator): Promise<void>{
        await section.click();
    }

    async verifyAccordiantText(sectionTextLocator: Locator, expedtedText: string): Promise<void>{
        await expect(sectionTextLocator).toHaveText(expedtedText, { timeout: 5000 });
    }
}