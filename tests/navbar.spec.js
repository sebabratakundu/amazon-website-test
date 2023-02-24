// @ts-check

const {test, expect} = require('@playwright/test');

test.beforeEach(async ({page}) => {
    await page.goto('https://www.amazon.com/')
});

test.describe('amazon navigation test', () => {
    test('should display the navigation menu', async ({page}) => {
        const navigationMenu = await page.waitForSelector('#navbar-main');

        expect(await navigationMenu.isVisible()).toBe(true);
    });

    test('should contain links to all the main product categories', async ({page}) => {
        const productCategories = await page.$$('#nav-xshop a.nav-a');

        expect(productCategories.length).toBeGreaterThan(0);
    });

    test('should contains a search bar to search for products', async ({page}) => {
        const searchBar = await page.waitForSelector('#twotabsearchtextbox');

        expect(searchBar).toBeTruthy();
    });

    test('should contains a choose location option', async ({page}) => {
        const location = await page.waitForSelector('#nav-global-location-slot');

        expect(await location.isVisible()).toBeTruthy();
    });

    test('should open a modal when click on location', async ({page}) => {
        const locationModal = await page.waitForSelector('#nav-global-location-data-modal-action');
        locationModal.click();

        const modalHeader = await page.waitForSelector('#a-popover-header-1:has-text("Choose your location")');
        expect(await modalHeader.isVisible()).toBeTruthy();
    });

    test('display language selection dropdown when hovering over language', async ({page}) => {
        const language = await page.waitForSelector('#icp-nav-flyout');
        expect(await language.isVisible()).toBeTruthy();

        language.hover();
        const languageDropdown = await page.waitForSelector('#nav-flyout-icp');

        expect(await languageDropdown.isVisible()).toBeTruthy();
    });

    test('displays returns and orders', async ({page}) => {
        const returnAndOrder = await page.waitForSelector('#nav-orders');

        expect(await returnAndOrder.isVisible()).toBeTruthy();
    });

    test('displays signup/signin options when hovering over account', async ({page}) => {
        const account = await page.waitForSelector('a[data-nav-ref="nav_ya_signin"]');
        await account.hover();
        const signupBox = await page.waitForSelector('#nav-al-signin');

        expect(await signupBox.isVisible()).toBeTruthy();
    });

    test('displays links to "Your Account", "Your Orders", and "Your Lists" options', async ({page}) => {
        const accountLinks = await page.$$('a#nav-link-accountList');

        expect(accountLinks.length).toBeGreaterThan(0);
    });

    test('displays a list of items in the user\'s cart', async ({page}) => {
        const cartItems = await page.waitForSelector('#nav-cart-count-container');

        expect(await cartItems.isVisible()).toBeTruthy();
    });
});
