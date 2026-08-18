import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductPage } from '../../pages/ProductPage';
import { users } from '../../test-data/users';


test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(
      users.standardUser.username,
      users.standardUser.password
    );
});


test('Products page should be displayed', async ({ page }) => {
    const productPage = new ProductPage(page);

    await expect(productPage.pageTitle).toHaveText('Products');
});


test('Products should be displayed', async ({ page }) => {
    const productsPage = new ProductPage(page);

    await expect(productsPage.productItems).toHaveCount(6);
});


test('Product images should be displayed', async ({ page }) => {
    const productsPage = new ProductPage(page);

    const imageCount = await productsPage.productImages.count();
    expect(imageCount).toBe(6);
});


test('Product names should be displayed', async ({ page }) => {
    const productsPage = new ProductPage(page);

    const nameCount = await productsPage.productNames.count();
    expect(nameCount).toBe(6);
});


test('Product prices should be displayed', async ({ page }) => {
    const productsPage = new ProductPage(page);

    const priceCount = await productsPage.productPrices.count();
    expect(priceCount).toBe(6);
});


test('Add to Cart buttons should be displayed', async ({ page }) => {
    const productsPage = new ProductPage(page);

    await expect(productsPage.addToCartButtons).toHaveCount(6);
});


test('User should be able to add product to cart', async ({ page }) => {
    const productsPage = new ProductPage(page);

    await productsPage.addFirstProductToCart();

    await expect(productsPage.cartBadge).toHaveText('1');
    await expect(productsPage.removeButtons.first()).toBeVisible();
});


test('User should be able to remove product from Products page', async ({ page }) => {
    const productsPage = new ProductPage(page);

    await productsPage.addFirstProductToCart();
    await expect(productsPage.cartBadge).toHaveText('1');

    await productsPage.removeFirstProduct();

    await expect(productsPage.cartBadge).not.toBeVisible();
});


test('Products should be sorted from A to Z', async ({ page }) => {
    const productsPage = new ProductPage(page);

    await productsPage.selectSortOption('az');

    const productNames = await productsPage.productNames.allTextContents();
    const sortedNames = [...productNames].sort();

    expect(productNames).toEqual(sortedNames);
});


test('Products should be sorted from Z to A', async ({ page }) => {
    const productsPage = new ProductPage(page);

    await productsPage.selectSortOption('za');

    const productNames = await productsPage.productNames.allTextContents();
    const sortedNames = [...productNames].sort().reverse();

    expect(productNames).toEqual(sortedNames);
});


test('Products should be sorted from Price Low to High', async ({ page }) => {
    const productsPage = new ProductPage(page);

    await productsPage.selectSortOption('lohi');

    const prices = await productsPage.productPrices.allTextContents();

    const numericPrices = prices.map(price =>
        Number(price.replace('$', ''))
    );

    const sortedPrices = [...numericPrices].sort((a, b) => a - b);

    expect(numericPrices).toEqual(sortedPrices);
});


test('Products should be sorted from Price High to Low', async ({ page }) => {
    const productsPage = new ProductPage(page);

    await productsPage.selectSortOption('hilo');

    const prices = await productsPage.productPrices.allTextContents();

    const numericPrices = prices.map(price =>
        Number(price.replace('$', ''))
    );

    const sortedPrices = [...numericPrices].sort((a, b) => b - a);

    expect(numericPrices).toEqual(sortedPrices);
});


test('User should be able to open product details', async ({ page }) => {
    const productsPage = new ProductPage(page);

    await productsPage.openFirstProduct();

    await expect(productsPage.productDetailsName).toBeVisible();
    await expect(productsPage.productDescription).toBeVisible();
    await expect(productsPage.productDetailsPrice).toBeVisible();
});


test('User should be able to add product from product details page', async ({ page }) => {
    const productsPage = new ProductPage(page);

    await productsPage.openFirstProduct();
    await productsPage.addProductFromDetails();

    await expect(productsPage.cartBadge).toHaveText('1');
    await expect(productsPage.removeButtons).toBeVisible();
});


test('User should be able to remove product from product details page', async ({ page }) => {
    const productsPage = new ProductPage(page);

    await productsPage.openFirstProduct();
    await productsPage.addProductFromDetails();

    await expect(productsPage.removeButtons).toBeVisible();

    await productsPage.removeProductFromDetails();

    await expect(productsPage.cartBadge).not.toBeVisible();
});


test('User should be able to return to Products page', async ({ page }) => {
    const productsPage = new ProductPage(page);

    await productsPage.openFirstProduct();
    await productsPage.backToProducts();

    await expect(productsPage.pageTitle).toHaveText('Products');
});