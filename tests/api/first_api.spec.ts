import { expect, request, test } from '@playwright/test';

test.describe("API Testing", () => {
    test("Basic API Testing", async ({ request }) => {
        const response = await request.get("https://fakestoreapi.com/products/1");
        expect(response.status()).toBe(200);
        const response_body = response.body();
        console.log(response_body);
    })
})