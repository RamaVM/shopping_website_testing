import { Page, Locator } from '@playwright/test';

export class ProductPage {
    readonly page: Page;

    readonly pageTitle: Locator;
    readonly productItems: Locator;
    readonly productImages: Locator;
    readonly productNames: Locator;
    readonly productPrices: Locator;
    readonly addToCartButtons: Locator;
    readonly removeButtons: Locator;
    readonly sortDropdown: Locator;
    readonly cartBadge: Locator;

    readonly productDescription: Locator;
    readonly productDetailsName: Locator;
    readonly productDetailsPrice: Locator;
    readonly backToProductsButton: Locator;

    constructor(page: Page) {
        this.page = page;

        // Products page
        this.pageTitle = page.locator('.title');
        this.productItems = page.locator('.inventory_item');
        this.productImages = page.locator('.inventory_item_img img');
        this.productNames = page.locator('.inventory_item_name');
        this.productPrices = page.locator('.inventory_item_price');
        this.addToCartButtons = page.locator('button:has-text("Add to cart")');
        this.removeButtons = page.locator('button:has-text("Remove")');
        this.sortDropdown = page.locator('[data-test="product-sort-container"]');
        this.cartBadge = page.locator('.shopping_cart_badge');

        // Product details page
        this.productDescription = page.locator('.inventory_details_desc');
        this.productDetailsName = page.locator('.inventory_details_name');
        this.productDetailsPrice = page.locator('.inventory_details_price');
        this.backToProductsButton = page.locator('[data-test="back-to-products"]');
    }

    async selectSortOption(option: string) {
        await this.sortDropdown.selectOption(option);
    }

    async addFirstProductToCart() {
        await this.addToCartButtons.first().click();
    }

    async removeFirstProduct() {
        await this.removeButtons.first().click();
    }

    async openFirstProduct() {
        await this.productNames.first().click();
    }

    async addProductFromDetails() {
        await this.addToCartButtons.click();
    }

    async removeProductFromDetails() {
        await this.removeButtons.click();
    }

    async backToProducts() {
        await this.backToProductsButton.click();
    }
}