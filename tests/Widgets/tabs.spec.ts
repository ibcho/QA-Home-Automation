import { test, BrowserContext, Page, expect } from '@playwright/test';
import HomePage from '../../pages/HomePage';
import Widgets from '../../pages/Widgets/Widgets';
import Tabs from '../../pages/Widgets/Tabs';

let context: BrowserContext;
let page: Page;

let homePage: HomePage;
let widgets: Widgets;
let tabs: Tabs;

test.beforeAll(async ({ browser }) => {
  context = await browser.newContext();
  page = await context.newPage();
  homePage = new HomePage(page);
  widgets = new Widgets(page);
  tabs = new Tabs(page);

  await homePage.loadHomePage();
  await homePage.gotoWidgets();
  await widgets.navigateToTabs();
});

test.describe('Testing Tabs', () => {
    test('Verify tabs status', async () => {

        // Verify the status of all tabs
        const { activeTab, disabledTabs, inactiveTabs } = await tabs.verifyTabsStatus();
 
        // Assertions
        expect(activeTab).toBe('What'); // Replace with the expected active tab text
        expect(disabledTabs).toEqual(['More']); // Replace with the expected disabled tab texts
        expect(inactiveTabs).toEqual(['Origin', 'Use']); // Replace with the expected inactive tab texts

        console.log('Active Tab:', activeTab);
        console.log('Disabled Tabs:', disabledTabs);
        console.log('Inactive Tabs:', inactiveTabs);
    });

    test('Verify tab content', async () => {
        // Verify the content of the first tab
        await tabs.verifyTabsStatus();
        await tabs.verifyTabContent(0, 'What is Lorem Ipsum?'); // Adjust as needed
        
        await tabs.verifyTabContent(1, 'Where does it come from?'); 
        // Verify the content of the third tab
        await tabs.verifyTabContent(2, 'Why do we use it?');
    });
});