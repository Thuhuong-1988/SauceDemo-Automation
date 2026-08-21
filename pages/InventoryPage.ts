import { Page, Locator, expect } from '@playwright/test';

export type SortOption = 'az' | 'za' | 'lohi' | 'hilo';

export class InventoryPage {
    readonly page: Page;
    readonly inventoryList: Locator;
    readonly inventoryItems: Locator;
    readonly sortDropdown: Locator;
    readonly itemNames: Locator;
    readonly itemPrices: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inventoryList = page.locator('.inventory_list');
        this.inventoryItems = page.locator('.inventory_item');
        this.sortDropdown = page.getByRole('combobox');
        this.itemNames = page.locator('.inventory_item_name');
        this.itemPrices = page.locator('.inventory_item_price');
    }

    async verifyPageLoaded() {
        await expect(this.inventoryList).toBeVisible();
        await expect(this.inventoryItems.first()).toBeVisible();
    }

    async verifyItemDetails() {
        const firstItem = this.inventoryItems.first();
        await expect(firstItem.locator('.inventory_item_name')).toBeVisible();
        await expect(firstItem.locator('.inventory_item_img a img')).toBeVisible();
        await expect(firstItem.locator('.inventory_item_price')).toBeVisible();
        await expect(firstItem.locator('button[data-test^="add-to-cart"]')).toBeVisible();
    }

    // 1. Action Method: Selects option and waits for UI re-render (prevents race conditions)
    async sortItems(option: SortOption) {
        const firstItemBefore = await this.itemNames.first().innerText();
        await this.sortDropdown.selectOption(option);
        
        // Wait until the top item changes when switching to opposite sort orders
        if (option === 'za' || option === 'hilo') {
            await expect(this.itemNames.first()).not.toHaveText(firstItemBefore);
        }
    }

    // 2. Data Getters: Fetches and parses clean data
    async getItemNames(): Promise<string[]> {
        await expect(this.itemNames.first()).toBeVisible();
        return await this.itemNames.allInnerTexts();
    }

    async getItemPrices(): Promise<number[]> {
        await expect(this.itemPrices.first()).toBeVisible();
        const rawPrices = await this.itemPrices.allInnerTexts();
        return rawPrices.map(price => parseFloat(price.replace(/[^0-9.]/g, '')));
    }

    // 3. Verification Methods: Strict assertions against coincidental passing
    async verifyNameSorting(direction: 'asc' | 'desc') {
        const actualNames = await this.getItemNames();

        // Prevents coincidental pass: Ensure array is non-empty and has > 1 item
        expect(actualNames.length, 'Item list must contain more than 1 product').toBeGreaterThan(1);

        const expectedNames = [...actualNames].sort((a, b) =>
            direction === 'asc' ? a.localeCompare(b) : b.localeCompare(a)
        );

        expect(actualNames, `Item names should be sorted in ${direction} order`).toEqual(expectedNames);
    }

    async verifyPriceSorting(direction: 'asc' | 'desc') {
        const actualPrices = await this.getItemPrices();

        // Prevents coincidental pass: Ensure array is non-empty and has > 1 item
        expect(actualPrices.length, 'Price list must contain more than 1 item').toBeGreaterThan(1);

        const expectedPrices = [...actualPrices].sort((a, b) =>
            direction === 'asc' ? a - b : b - a
        );

        expect(actualPrices, `Item prices should be sorted in ${direction} order`).toEqual(expectedPrices);
    }

    // 4. High-Level Method: Selects option & asserts order in a single call
    async selectAndVerifySort(option: SortOption) {
        await this.sortItems(option);

        switch (option) {
            case 'az':
                await this.verifyNameSorting('asc');
                break;
            case 'za':
                await this.verifyNameSorting('desc');
                break;
            case 'lohi':
                await this.verifyPriceSorting('asc');
                break;
            case 'hilo':
                await this.verifyPriceSorting('desc');
                break;
        }
    }

    async addItemToCart(index: number) {
        await this.inventoryItems.nth(index).locator('button[data-test^="add-to-cart"]').click();
    }

    async goToCart() {
        await this.page.locator('.shopping_cart_link').click();
    }
}