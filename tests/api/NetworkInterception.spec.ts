import { test } from "@playwright/test";

const apiUrl = "https://jsonplaceholder.typicode.com/posts/1";

test("API network interception", { tag: ["@smokeapi"] }, async ({ page }) => {

    await page.route("**/posts/1", async route => {

        const mockResponse = {
            id: 1,
            name: "Mock User Guest"
        };

        await route.fulfill({
            status: 500,
            contentType: "application/json",
            body: JSON.stringify(mockResponse)
        });

    });

    const result = await page.evaluate(async (url) => {

        const response = await fetch(url);

        return {
            status: response.status,
            body: await response.json()
        };

    }, apiUrl);

    console.log("Final response:", result);
});