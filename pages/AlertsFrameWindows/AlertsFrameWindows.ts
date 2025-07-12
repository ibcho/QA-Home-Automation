import { Locator, Page } from "@playwright/test";

// It's recommended to use unique test IDs (e.g., data-testid) for locators for more resilient tests.

// Define the type for section names for type safety.
export type Section = 'Browser Windows' | 'Alerts' | 'Frames' | 'Nested Frames' | 'Modal Dialogs';

export default class AlertsFrameWindows {
    readonly page: Page;
    private readonly locators: Map<Section, Locator>;

    constructor(page: Page) {
        this.page = page;

        // Using a Map to store locators makes them easier to manage and access dynamically.
        this.locators = new Map<Section, Locator>([
            ['Browser Windows', page.getByText('Browser Windows')],
            ['Alerts', page.getByText('Alerts').nth(1)], 
            ['Frames', page.getByText('Frames').first()],
            ['Nested Frames', page.getByText('Nested Frames')],
            ['Modal Dialogs', page.getByText('Modal Dialogs')]
        ]);
    }

    /**
     * Navigates to a specified section.
     * @param sectionName The name of the section to navigate to.
     */
    
    async navigateTo(sectionName: Section) {
        const locator = this.locators.get(sectionName);
        if (!locator) {
            throw new Error(`Invalid section name: ${sectionName}`);
        }
        try {
            console.log(`Navigating to ${sectionName}...`);
            await locator.click();
        } catch (error) {
            console.error(`Failed to navigate to ${sectionName}:`, error);
            throw error;
        }
    }
}