import { test, BrowserContext, Page } from '@playwright/test';
import AlertsFrameWindows from '../../pages/AlertsFrameWindows/AlersFrameWindows';
import NestedFramesPage from '../../pages/AlertsFrameWindows/NestedFrames';
import HomePage from '../../pages/HomePage';

let homePage: HomePage;
let context: BrowserContext;
let nestedFramesPage: NestedFramesPage;
let alertsFrameWindows: AlertsFrameWindows;
let page: Page;

test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();

    homePage = new HomePage(page);
    nestedFramesPage = new NestedFramesPage(page);
    alertsFrameWindows = new AlertsFrameWindows(page);

    await homePage.loadHomePage();
    await homePage.gotoAlertsFrameWindows();
    await alertsFrameWindows.navigateToNestedFrames();
});


test.afterAll(async () => {
    await context.close();
});

test.describe('Verify nested frames content', () => {
    test('verify parent iFrame text', async () => {
        await nestedFramesPage.verifyParentFrameText('Parent frame');
    });

    test('verify child iFrame text', async () => {
        await nestedFramesPage.verifyChildFrameText('Child Iframe');
    });
});

