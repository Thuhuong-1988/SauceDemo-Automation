---

## Test Plan

### 1. Automated Test Cases
- **Login & Inventory Validation (`A`):**
  - Verify error message when attempting login with invalid credentials.
  - Verify successful login with `standard_user` and ensure redirection to the inventory page.
  - Validate inventory list loads correctly with items containing a valid name, image, price, and "Add to Cart" button.
- **Sorting Functionality (`B`):**
  - Test all 4 sorting options: Name (A to Z, Z to A) and Price (Low to High, High to Low).
  - Assert the sorted order programmatically to prevent coincidental passes.
- **Cart & Checkout E2E Flow (`C`):**
  - Add two different products to the cart and navigate to the cart page.
  - Verify product details inside the cart and remove one product.
  - Proceed through checkout, fill in required user information, validate totals (including tax and final amount), and verify the order confirmation page.
- **Email Validation Unit Test (`D`):**
  - Test the TypeScript function that filters and categorizes email arrays into `validEmails`, `invalidEmails`, and `duplicateEmails` based on regex and uniqueness rules.

### 2. Additional Tests for Future Scope (Given More Time)
- Responsive layout testing across mobile and tablet viewports.
- Security and negative testing on the login form (e.g., SQL injection attempts, locked-out user scenarios).
- Performance and load testing on inventory image loading and checkout submission.

### 3. Risks & Flaky Areas
- **DOM Stability:** Dynamic elements or asynchronous rendering on the inventory and cart pages could occasionally cause test flakiness if hardcoded waits are used instead of Playwright’s auto-waiting locators.
- **Environment Dependency:** External test sites like SauceDemo can sometimes experience network latency or downtime.

### 4. Assumptions & Questions
- Assumed that `standard_user` is always active and has a stable data state on SauceDemo.
- Assumed email validation strictly follows the format `<username>@<domain>.<tld>` with no spaces and lowercase characters only, as specified in the requirements.