
import { test, expect } from '../fixtures/page-fixtures';

test.describe('SauceDemo E2E Tests', () => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigate(); 
    });

  

    test('Part B: Sorting Functionality - Verify all sorting options on inventory page', async ({ loginPage, inventoryPage }) => {
        await loginPage.login('standard_user');
        
        await inventoryPage.selectAndVerifySort('za');   // Name Z to A
        await inventoryPage.selectAndVerifySort('az');   // Name A to Z
        await inventoryPage.selectAndVerifySort('lohi'); // Price low to high
        await inventoryPage.selectAndVerifySort('hilo'); // Price high to low
    });

});