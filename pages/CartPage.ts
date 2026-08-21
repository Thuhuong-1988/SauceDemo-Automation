import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly cartItems: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartItems = page.locator('.cart_item');
        this.checkoutButton = page.locator('[data-test="checkout"]');
    }

    async verifyItemsCount(expectedCount: number) {
        await expect(this.cartItems).toHaveCount(expectedCount);
    }

    async verifyProductDetails(index: number) {
        const item = this.cartItems.nth(index);
        
        await expect(item.locator('.inventory_item_name')).toBeVisible();
        await expect(item.locator('.inventory_item_desc')).toBeVisible();
        await expect(item.locator('.inventory_item_price')).toBeVisible();
        await expect(item.locator('.cart_quantity')).toBeVisible();
    }

async removeItem(index: number) {
    const item = this.cartItems.nth(index);
    const removeButton = item.locator('button[data-test^="remove-"]');
    
    const initialCount = await this.cartItems.count();

    await removeButton.click();
    await expect(this.cartItems).toHaveCount(initialCount - 1);
    // await expect(item).not.toBeAttached();
}
    async proceedToCheckout() {
        await this.checkoutButton.click();
    }
}