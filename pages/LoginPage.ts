import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async navigate() {
        await this.page.goto('/');
    }

async login(username: string, password: string = 'secret_sauce') {
    await expect(this.usernameInput).toBeVisible();
        await this.usernameInput.clear();
        await this.usernameInput.fill(username);
        await expect(this.passwordInput).toBeVisible();
        await this.passwordInput.clear();
        await this.passwordInput.fill(password);
        await expect(this.loginButton).toBeVisible();
        await this.loginButton.click();
    }

async verifyErrorMessage(expectedText?: string) {
        await expect(this.errorMessage).toBeVisible();
        if (expectedText) {
            await expect(this.errorMessage).toContainText(expectedText);
        }
    }
}