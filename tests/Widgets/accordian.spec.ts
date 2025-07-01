import { test, expect } from '@playwright/test';
import HomePage from '../../pages/HomePage';
import Widgets from '../../pages/Widgets/Widgets';
import Accordian from '../../pages/Widgets/Accordian';

// Expected texts as constants
const LOREM_IPSUM_TEXT = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
const WHERE_DOES_IT_COME_FROM_TEXT_1 = "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.";
const WHERE_DOES_IT_COME_FROM_TEXT_2 = "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.";
const WHY_DO_WE_USE_IT_TEXT = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).";

test.describe('Accordian Widget', () => {
    let homePage: HomePage;
    let widgets: Widgets;
    let accordian: Accordian;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        widgets = new Widgets(page);
        accordian = new Accordian(page);

        await test.step('Navigate to Accordian section', async () => {
            await homePage.loadHomePage();
            await homePage.gotoWidgets();
            await widgets.navigateToAccordian();
        });
    });

    test('should expand and verify all Accordian sections', async () => {
        await test.step('Expand and verify "What is Lorem Ipsum?"', async () => {
            await accordian.clickAccourdianSection(accordian.whatIsLoremIpsum_dropDown);
            await accordian.verifyAccordiantText(accordian.whatIsLoremIpsum_dropDownText, LOREM_IPSUM_TEXT);
            await expect(accordian.whatIsLoremIpsum_dropDownText).toBeVisible();
        });

        await test.step('Expand and verify "Where does it come from?"', async () => {
            await accordian.clickAccourdianSection(accordian.whereDoesItComeFrom_dropDown);
            await accordian.verifyAccordiantText(accordian.whereDoesItComeFrom_firstParagraph, WHERE_DOES_IT_COME_FROM_TEXT_1);
            await accordian.verifyAccordiantText(accordian.whereDoesItComeFrom_secondParagraph, WHERE_DOES_IT_COME_FROM_TEXT_2);
            await expect(accordian.whereDoesItComeFrom_dropDownText).toBeVisible();
        });

        await test.step('Expand and verify "Why do we use it?"', async () => {
            await accordian.clickAccourdianSection(accordian.whyDoweUseIt_dropDown);
            await accordian.verifyAccordiantText(accordian.whyDoweUseIt_dropDownText, WHY_DO_WE_USE_IT_TEXT);
            await expect(accordian.whyDoweUseIt_dropDownText).toBeVisible();
        });
    });
});