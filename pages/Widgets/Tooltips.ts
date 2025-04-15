import { Locator, Page, expect } from "@playwright/test";

export default class Tooltips {
    private readonly hoverMeToSeeButton: Locator;
    private readonly hoverMeToSeeButtonToolTip: Locator;

    private readonly hoverMeToSeeTextBoxLocator: Locator;
    private readonly hoverMeToSeeTextBoxToolTip: Locator;

    private readonly hoverOver_Contrary: Locator;
    private readonly hoverOver_ContraryToolTip: Locator;

    private readonly overOver_SectionNumber: Locator;
    private readonly overOver_SectionNumberToolTip: Locator;

    constructor(page: Page) {
        this.hoverMeToSeeButton = page.getByRole('button', { name: 'Hover me to see' })
        this.hoverMeToSeeButtonToolTip = page.getByText('You hovered over the Button') 

        this.hoverMeToSeeTextBoxLocator = page.getByPlaceholder("Hover me to see");
        this.hoverMeToSeeTextBoxToolTip = page.getByText('You hovered over the text field')

        this.hoverOver_Contrary = page.locator("text=Contrary");
        this.hoverOver_ContraryToolTip = page.getByText('You hovered over the Contrary')
        
        this.overOver_SectionNumber = page.locator("text=1").first();
        this.overOver_SectionNumberToolTip = page.getByText('You hovered over the 1.10.32')

    }

    async verifyHoverMeToSeeButtonPopUp(){
        await this.hoverMeToSeeButton.hover();
        await this.hoverMeToSeeButtonToolTip.waitFor({ state: "visible", timeout: 5000 });
    
        const isVisible = await this.hoverMeToSeeButtonToolTip.isVisible();
        expect(isVisible).toBe(true);

        const tooltipText = await this.hoverMeToSeeButtonToolTip.textContent();
        expect(tooltipText).toBe('You hovered over the Button');
        console.log("Tooltip text is: " + tooltipText);
    }

    async verifyHoverMeToSeTextBoxField(){
        await this.hoverMeToSeeTextBoxLocator.hover();
        await this.hoverMeToSeeTextBoxToolTip.waitFor({ state: "visible", timeout: 5000 });
    
        const isVisible = await this.hoverMeToSeeTextBoxToolTip.isVisible();
        expect(isVisible).toBe(true);

        const tooltipText = await this.hoverMeToSeeTextBoxToolTip.textContent();
        expect(tooltipText).toBe('You hovered over the text field');
        console.log("Tooltip text is: " + tooltipText);
    }

    async hoverOverContrary() {
        await this.hoverOver_Contrary.hover();
        await this.hoverOver_ContraryToolTip.waitFor({ state: "visible", timeout: 5000 });
    
        const isVisible = await this.hoverOver_ContraryToolTip.isVisible();
        expect(isVisible).toBe(true);

        const tooltipText = await this.hoverOver_ContraryToolTip.textContent();
        expect(tooltipText).toBe('You hovered over the Contrary');
        console.log("Tooltip text is: " + tooltipText);
    }

    async hoveOverSectionNumber() {
        await this.overOver_SectionNumber.hover();
        await this.overOver_SectionNumberToolTip.waitFor({ state: "visible", timeout: 5000 });
    
        const isVisible = await this.overOver_SectionNumberToolTip.isVisible();
        expect(isVisible).toBe(true);

        const tooltipText = await this.overOver_SectionNumberToolTip.textContent();
        expect(tooltipText).toBe('You hovered over the 1.10.32');
        console.log("Tooltip text is: " + tooltipText);
    }

}
