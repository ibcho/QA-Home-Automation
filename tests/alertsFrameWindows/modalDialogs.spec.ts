import { test, BrowserContext, Page } from '@playwright/test';
import AlertsFrameWindows from '../../pages/AlertsFrameWindows/AlersFrameWindows';
import NestedFramesPage from '../../pages/AlertsFrameWindows/NestedFrames';
import HomePage from '../../pages/HomePage';
import ModalDialogs from '../../pages/AlertsFrameWindows/ModalDialogs';

let homePage: HomePage;
let context: BrowserContext;
let nestedFramesPage: NestedFramesPage;
let alertsFrameWindows: AlertsFrameWindows;
let modalDialogs: ModalDialogs;
let page: Page;

test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();

    homePage = new HomePage(page);
    nestedFramesPage = new NestedFramesPage(page);
    alertsFrameWindows = new AlertsFrameWindows(page);
    modalDialogs = new ModalDialogs(page);

    await homePage.loadHomePage();
    await homePage.gotoAlertsFrameWindows();
    await alertsFrameWindows.navigateToModalDialogs();
});


test.afterAll(async () => {
    await context.close();
});

test.describe('Verify modal dialogs', () => {
    test('Verify that small diaglos is displayed with the proper text', async () => {
        await modalDialogs.clickSmallModal();
        await modalDialogs.verifyModalHeader('Small Modal×Close');
        await modalDialogs.verifyModalBody('This is a small modal. It has very less content');
        await modalDialogs.clickCloseSmallModal();
    });

    test('Verify that large diaglos is displayed with the proper text', async () => {
        await modalDialogs.clickLargeModal();
        await modalDialogs.verifyModalHeader('Large Modal×Close');
        await modalDialogs.verifyModalBody("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.");
        await modalDialogs.clickCloseLargeModal();
    });
});

