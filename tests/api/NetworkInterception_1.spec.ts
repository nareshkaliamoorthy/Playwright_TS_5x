import { test } from "@playwright/test"

test("Test API mocking", { tag: ["@smokeai"] }, async ({ page }) => {
    const url = "https://playwrightlab.github.io/login.html";
    let abortedRequests = 0;
    await page.route("**analytics**", async (route) => {
        abortedRequests++;
        console.log("🚫 Aborted:", route.request().url());
        await route.abort()
    });
    await page.goto(url);
    // test.setTimeout(60000);
    // await page.waitForTimeout(30000);
    await page.getByPlaceholder("you@example.com").fill("test@playlab.com");
    await page.getByPlaceholder("Enter your password").fill("Password123");
    await page.getByRole("button", { name: "Sign In" }).click();

    // await page.waitForTimeout(5000);

    // const result = await page.evaluate(async (url) => {
    //     const response = await fetch(url);
    //     return {
    //         status: response.status,
    //         body: await response.json()
    //     }

    // }, apiUrl)
    // console.log(result);
});