import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "../BasePage";

export default class Tooltips extends BasePage {
    // Button tooltip elements
    private readonly hoverMeToSeeButton: Locator;
    private readonly hoverMeToSeeButtonToolTip: Locator;

    // Text field tooltip elements
    private readonly hoverMeToSeeTextBox: Locator;
    private readonly hoverMeToSeeTextBoxToolTip: Locator;

    // Contrary text tooltip elements
    private readonly hoverOverContrary: Locator;
    private readonly hoverOverContraryToolTip: Locator;

    // Section number tooltip elements
    private readonly hoverOverSectionNumber: Locator;
    private readonly hoverOverSectionNumberToolTip: Locator;

    constructor(page: Page) {
        super(page);
        
        // Initialize button tooltip elements
        this.hoverMeToSeeButton = page.getByRole('button', { name: 'Hover me to see' });
        this.hoverMeToSeeButtonToolTip = page.getByText('You hovered over the Button');

        // Initialize text field tooltip elements
        this.hoverMeToSeeTextBox = page.getByPlaceholder("Hover me to see");
        this.hoverMeToSeeTextBoxToolTip = page.getByText('You hovered over the text field');

        // Initialize contrary text tooltip elements
        this.hoverOverContrary = page.locator("text=Contrary");
        this.hoverOverContraryToolTip = page.getByText('You hovered over the Contrary');

        // Initialize section number tooltip elements
        this.hoverOverSectionNumber = page.locator("text=1").first();
        this.hoverOverSectionNumberToolTip = page.getByText('You hovered over the 1.10.32');
    }

    /**
     * Verify button tooltip appears on hover
     */
    async verifyButtonTooltip(): Promise<void> {
        await this.hoverMeToSeeButton.hover();
        await this.waitForElement(this.hoverMeToSeeButtonToolTip, 5000);

        const isVisible = await this.isVisible(this.hoverMeToSeeButtonToolTip);
        expect(isVisible).toBe(true);

        const tooltipText = await this.getText(this.hoverMeToSeeButtonToolTip);
        expect(tooltipText).toBe('You hovered over the Button');
        console.log("Button tooltip text: " + tooltipText);
    }

    /**
     * Verify text field tooltip appears on hover
     */
    async verifyTextFieldTooltip(): Promise<void> {
        await this.hoverMeToSeeTextBox.hover();
        await this.waitForElement(this.hoverMeToSeeTextBoxToolTip, 5000);

        const isVisible = await this.isVisible(this.hoverMeToSeeTextBoxToolTip);
        expect(isVisible).toBe(true);

        const tooltipText = await this.getText(this.hoverMeToSeeTextBoxToolTip);
        expect(tooltipText).toBe('You hovered over the text field');
        console.log("Text field tooltip text: " + tooltipText);
    }

    /**
     * Verify contrary text tooltip appears on hover
     */
    async verifyContraryTooltip(): Promise<void> {
        await this.hoverOverContrary.hover();
        await this.waitForElement(this.hoverOverContraryToolTip, 5000);

        const isVisible = await this.isVisible(this.hoverOverContraryToolTip);
        expect(isVisible).toBe(true);

        const tooltipText = await this.getText(this.hoverOverContraryToolTip);
        expect(tooltipText).toBe('You hovered over the Contrary');
        console.log("Contrary tooltip text: " + tooltipText);
    }

    /**
     * Verify section number tooltip appears on hover (FIXED: was "hoveOverSectionNumber")
     */
    async verifySectionNumberTooltip(): Promise<void> {
        await this.hoverOverSectionNumber.hover();
        await this.waitForElement(this.hoverOverSectionNumberToolTip, 5000);

        const isVisible = await this.isVisible(this.hoverOverSectionNumberToolTip);
        expect(isVisible).toBe(true);

        const tooltipText = await this.getText(this.hoverOverSectionNumberToolTip);
        expect(tooltipText).toBe('You hovered over the 1.10.32');
        console.log("Section number tooltip text: " + tooltipText);
    }

    /**
     * Verify all tooltips work correctly
     */
    async verifyAllTooltips(): Promise<void> {
        await this.verifyButtonTooltip();
        await this.verifyTextFieldTooltip();
        await this.verifyContraryTooltip();
        await this.verifySectionNumberTooltip();
    }
}
