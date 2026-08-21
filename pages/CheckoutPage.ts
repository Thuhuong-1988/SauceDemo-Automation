import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;

    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueButton: Locator;

    readonly subtotalLabel: Locator;
    readonly taxLabel: Locator;
    readonly totalLabel: Locator;
    readonly finishButton: Locator;

    readonly completeHeader: Locator;

    constructor(page: Page) {
        this.page = page;
        
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');

        this.subtotalLabel = page.locator('.summary_subtotal_label');
        this.taxLabel = page.locator('.summary_tax_label');
        this.totalLabel = page.locator('.summary_total_label');
        this.finishButton = page.locator('[data-test="finish"]');

        this.completeHeader = page.locator('.complete-header');
    }

    async fillDetailsAndContinue(firstName: string, lastName: string, zipCode: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(zipCode);
        await this.continueButton.click();
    }

    async verifyTotals() {
        const subtotalText = await this.subtotalLabel.innerText();
        const taxText = await this.taxLabel.innerText();
        const totalText = await this.totalLabel.innerText();

        const extractPrice = (text: string) => parseFloat(text.replace(/[^0-9.]/g, ''));

        const subtotal = extractPrice(subtotalText);
        const tax = extractPrice(taxText);
        const actualTotal = extractPrice(totalText);

        const expectedTotal = subtotal + tax;
        expect(Math.abs(expectedTotal - actualTotal), 
            `Error total: Expected ${expectedTotal} but Actual ${actualTotal}`
        ).toBeLessThan(0.01);
    }

    async finishCheckout() {
        await this.finishButton.click();
    }

    async verifyOrderComplete() {
        await expect(this.page).toHaveURL(/.*checkout-complete.html/);
                await expect(this.completeHeader).toHaveText(/thank you for your order/i);
    }
}