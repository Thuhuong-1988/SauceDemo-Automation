
import { test, expect } from '../fixtures/page-fixtures';
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigate(); 
    });

test('Part C: Cart and Checkout Flow', async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
    await loginPage.login('standard_user');

    // 1. Add 2 products & Navigate
    await inventoryPage.addItemToCart(0);
    await inventoryPage.addItemToCart(1);
    await inventoryPage.goToCart();

    // 2. Validate details in cart
    await cartPage.verifyItemsCount(2);
    await cartPage.verifyProductDetails(0);
    await cartPage.verifyProductDetails(1);

    // 3. Remove 1 product
    await cartPage.removeItem(0);
    await cartPage.verifyItemsCount(1);

    // 4. Proceed through checkout & fill details
    await cartPage.proceedToCheckout();
    await checkoutPage.fillDetailsAndContinue('QA', 'Automation', '100000');
    
    // 5. Validate displayed totals (Check cả toán học)
    await checkoutPage.verifyTotals();
    
    // 6. Complete and verify order confirmation
    await checkoutPage.finishCheckout();
    await checkoutPage.verifyOrderComplete();
});