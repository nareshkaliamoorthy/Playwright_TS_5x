import { APIRequestContext } from "@playwright/test";
import { BaseApiClient } from "./BaseApiClient";
import { ProductRequest } from "../models/Product";


export class ProductApiClient extends BaseApiClient {
    private readonly endpoint = "/products";
    constructor(request: APIRequestContext) {
        super(request);

    }

    async getProduct(productId: number) {
        console.log(`GET REQUEST:${this.endpoint}/${productId}`);
        return await this.get(`${this.endpoint}/${productId}`);
    }
    async createProduct(data: ProductRequest) {
        console.log(`POST REQUEST:${this.endpoint}`);
        return await this.post(this.endpoint, data);
    }
    async patchProduct(productId: number, data: ProductRequest) {
        return await this.patch(`${this.endpoint}/${productId}`, data);
    }
    async updateProduct(productId: number, data: ProductRequest) {
        return await this.put(`${this.endpoint}/${productId}`, data);
    }
    async deleteProduct(productId: number) {
        return await this.delete(`${this.endpoint}/${productId}`);
    }
}