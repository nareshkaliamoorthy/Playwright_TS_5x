import { expect, request, test } from '@playwright/test';
import { BaseApiClient } from '../../api/client/BaseApiClient';
import { ProductApiClient } from '../../api/client/ProductApiClient';
import { ProductRequest, ProductResponse } from '../../api/models/Product';

test.describe("API Testing", () => {
    test("Basic API Testing", { tag: ["@api"] }, async ({ request }) => {
        const productId = 5;
        const limit = 5;
        const category = "electronics";

        const response = await request.get(`/products/`, { params: { limit: limit, category: category }, headers: { Accept: "application/text" } });
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody).toHaveLength(5);
        expect(responseBody[0].id).toBe(1);
        console.log(responseBody);
        // expect(responseBody.id).toBe(1);
        // expect(responseBody).toHaveProperty("title", "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops");
        // expect(responseBody).toHaveProperty("price");
        // expect(responseBody.price).toBeGreaterThan(0);
        // expect(responseBody.description).toEqual("Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday");
    })

    test("Post Request testing", { tag: ["@api-smoke"] }, async ({ request }) => {
        const requestBody: ProductRequest = {
            title: "Laptop",
            price: 75000,
            description: "Business laptop",
            category: "electronics"
        }
        const productApiClient = new ProductApiClient(request);
        const response = await productApiClient.createProduct(requestBody);

        expect(response.status()).toBe(201);
        const body: ProductResponse = await response.json();
        console.log("Body:", body);
        expect(body).toHaveProperty("id");
        expect(body.title).toBe("Laptop");
        expect(body.price).toBe(75000);
        expect(body.category).toEqual("electronics");
        console.log(body);
        const productId = body.id;
        const getResponse = await productApiClient.getProduct(productId);
        expect(getResponse.status()).toBe(200);


    })
})