import { Page, expect, Locator } from '@playwright/test';

export class PlaywrightLabLoginPage {
    private page: Page;
    private usernameInputBox: Locator;
    private passwordInputBox: Locator;
    private loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInputBox = page.getByPlaceholder("you@example.com");
        this.passwordInputBox = page.getByPlaceholder("Enter your password");
        this.loginButton = page.getByRole("button", { name: "Sign In" });
    }

    async login(username: string, password: string) {
        await this.page.goto("https://playwrightlab.github.io/login.html");
        await this.usernameInputBox.fill(username);
        await this.passwordInputBox.fill(password);
        await this.loginButton.click();
        await expect(this.page.getByTestId("welcome-message")).toHaveText("Welcome back!");
    }

    async gotoDashboard() {
        await this.page.getByRole("link", { name: "Go to Dashboard" }).click();
    }


}