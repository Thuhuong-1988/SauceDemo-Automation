import { test, expect } from '../fixtures/page-fixtures';

test.describe('Authentication & Inventory Loading Tests', () => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigate();
    });

    test('Part A: Validate Invalid Login and Successful Login flow', async ({ loginPage, inventoryPage, page }) => {
        
        // 1. Attempt a login with invalid credentials
        await loginPage.login('invalid_user', 'wrong_password');
        
        // 2. Validate the error message
        await loginPage.verifyErrorMessage('Epic sadface: Username and password do not match any user in this service');

        // 3. Log in using valid credentials (standard_user)
        await loginPage.login('standard_user', 'secret_sauce');

        // 4. Confirm you land on the inventory page
        await expect(page).toHaveURL(/.*inventory.html/);

        // 5. Validate that the inventory list loads correctly
        await inventoryPage.verifyPageLoaded();

        // 6. Verify at least one item has: A name, An image, A price, Add to Cart button
        await inventoryPage.verifyItemDetails();
    });
    
});