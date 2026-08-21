# Test Plan & Strategy

## 1. Automated Test Cases
- **Login Flow**: Validates both invalid credentials (verifying error messages) and valid login (verifying inventory page loads correctly).
- **Sorting Functionality**: Validates A-Z, Z-A, Low-High, High-Low. Extracted text arrays are programmatically sorted and asserted to prevent coincidentally passing tests.
- **Checkout Flow**: E2E journey from adding 2 items -> cart -> removing 1 item -> checkout forms -> validating tax & total calculation -> order completion.
- **Email Validation**: Unit test evaluating Regex accuracy against spaces, uppercase characters, and duplicate entries.

## 2. Additional Tests (Given more time)
- **Visual Regression Testing**: Snapshots of the UI (especially cart/inventory pages) across multiple viewports (Mobile, Tablet).
- **Session State Management**: Bypass the login UI for checkout tests using `storageState` to speed up execution time.
- **Negative Testing on Checkout**: Leaving fields blank in the checkout form to verify validation errors.

## 3. Assumptions & Risks
- **Assumption**: The `[data-test="..."]` attributes are reliable and will not change. 
- **Risk**: The sorting validation relies on string/number parsing. If currency symbols change or item titles introduce special characters, the programmatic sort comparison might become flaky.