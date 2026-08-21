# SauceDemo Playwright Automation E2E

## Prerequisites
- Node.js (v16 or higher)

## Installation
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Run `npx playwright install` to install browsers.

## How to run the tests
- **Headless mode** (Run in background): `npx playwright test`
- **Headed mode** (Open browser UI): `npx playwright test --headed`
- **View HTML Report**: `npx playwright show-report`

## Project Structure
- `pages/`: Page Object Model classes
- `tests/`: Spec files (E2E and Unit tests)
- `utils/`: Helper functions (Email Validator)