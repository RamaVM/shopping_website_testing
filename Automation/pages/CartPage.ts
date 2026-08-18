import { Page, Locator } from '@playwright/test';

export class CartPage {
    readonly page: Page;

    readonly cartItems: Locator;
    readonly removeButtons: Locator;
    readonly continueShoppingButton: Locator;
    readonly checkoutButton: Locator;
    readonly cartEmptyError: Locator;

   constructor(page: Page) {
    this.page = page;

    this.cartItems = page.locator('.cart_item');
    this.removeButtons = page.locator('button:has-text("Remove")');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.cartEmptyError = page.locator('[data-test="error"]');
}
    async openCart() {
        await this.page.locator('.shopping_cart_link').click();
    }

    async removeFirstItem() {
        await this.removeButtons.first().click();
    }

    async continueShopping() {
        await this.continueShoppingButton.click();
    }

    async checkout() {
        await this.checkoutButton.click();
    }
}