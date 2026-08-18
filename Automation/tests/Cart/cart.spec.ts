import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductPage } from '../../pages/ProductPage';
import { CartPage } from '../../pages/CartPage';
import { users } from '../../test-data/users';


test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(
        users.standardUser.username,
        users.standardUser.password
    );
});

test('Added product should be displayed in cart', async ({ page }) => {
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await productPage.addFirstProductToCart();
    await cartPage.openCart();

    await expect(cartPage.cartItems).toHaveCount(1);
});

test('Remove button should be displayed for added product', async ({ page }) => {
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await productPage.addFirstProductToCart();
    await cartPage.openCart();

    await expect(cartPage.removeButtons.first()).toBeVisible();
});

test('Continue Shopping should redirect user to Products page', async ({ page }) => {
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await cartPage.openCart();
    await cartPage.continueShopping();

    await expect(productPage.pageTitle).toHaveText('Products');
});

test('User should be able to remove product from cart', async ({ page }) => {
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await productPage.addFirstProductToCart();
    await cartPage.openCart();

    await expect(cartPage.cartItems).toHaveCount(1);

    await cartPage.removeFirstItem();

    await expect(cartPage.cartItems).toHaveCount(0);
});

test('Cart should be empty after removing all products', async ({ page }) => {
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await productPage.addFirstProductToCart();
    await cartPage.openCart();

    await cartPage.removeFirstItem();

    await expect(cartPage.cartItems).toHaveCount(0);
});

test('Checkout button should be visible on Cart page', async ({ page }) => {
    const cartPage = new CartPage(page);

    await cartPage.openCart();

    await expect(cartPage.checkoutButton).toBeVisible();
});

test('User should see Cart is empty error when checking out with empty cart', async ({ page }) => {
    const cartPage = new CartPage(page);

    await cartPage.openCart();

    // Verify cart is empty
    await expect(cartPage.cartItems).toHaveCount(0);

    // Click Checkout
    await cartPage.checkout();

    // Expected behavior
    await expect(cartPage.cartEmptyError).toHaveText('Cart is empty');
});