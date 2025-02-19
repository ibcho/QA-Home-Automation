import { test, expect, BrowserContext, Page } from '@playwright/test';
import RadioButtonsPage from '../pages/RadioButtonsPage';
import ElementsPage from '../pages/ElementsPage';
import HomePage from '../pages/HomePage';

test.describe('Radio Buttons Tests', () => {
    let radioButtonsPage: RadioButtonsPage;
    let homePage: HomePage;
    let elementsPage: ElementsPage;
    let context: BrowserContext;
    let page: Page;

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();

        homePage = new HomePage(page);
        elementsPage = new ElementsPage(page);
        radioButtonsPage = new RadioButtonsPage(page);

        // Navigate to the radio buttons page
        await homePage.navigateToHomePage();
        await homePage.gotoElements();
        await elementsPage.navigateToRadioButton();
    });

    test.afterAll(async () => {
        await context.close();
    });

    test('is Radio button title visible', async () => {
        expect(await radioButtonsPage.isRadioButtonsTitleVisible()).toBeTruthy();
    });

    test('select "yes" radio button', async () => {
        await radioButtonsPage.selectRadioButton('yes');
        expect(await radioButtonsPage.isRadioButtonSelected('yes')).toBeTruthy();
        expect(await radioButtonsPage.getSelectedRadioButtonText()).toBe('Yes');
    });

    test('select "impressive" radio button', async () => {
        await radioButtonsPage.selectRadioButton('impressive');
        expect(await radioButtonsPage.isRadioButtonSelected('impressive')).toBeTruthy();
        expect(await radioButtonsPage.getSelectedRadioButtonText()).toBe('Impressive');
    });

    test('should not select the "yes" radio button when "impressive" is selected', async () => {
        await radioButtonsPage.selectRadioButton('impressive');
        expect(await radioButtonsPage.isRadioButtonSelected('yes')).toBeFalsy();
    });

    test('should not select the "impressive" radio button when "yes" is selected', async () => {
        await radioButtonsPage.selectRadioButton('yes');
        expect(await radioButtonsPage.isRadioButtonSelected('impressive')).toBeFalsy();
    });

    test('should verify that "no" radio button is disabled', async () => {
        expect(await radioButtonsPage.isRadioButtonDisabled('no')).toBeTruthy();
    });
});