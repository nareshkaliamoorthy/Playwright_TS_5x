import { APIRequestContext } from "@playwright/test";

export class BaseApiClient {

    constructor(protected request: APIRequestContext) { }

    async get(endpoint: string, options?: any) {
        return await this.request.get(endpoint, options);
    }
    async post(endpoint: string, data: object, options?: any) {
        return await this.request.post(endpoint, { ...options, data });
    }
    async put(endpoint: string, data: object, options?: any) {
        return await this.request.put(endpoint, { ...options, data });
    }
    async patch(endpoint: string, data: object, options?: any) {
        return await this.request.patch(endpoint, { ...options, data });
    }
    async delete(endpoint: string, options?: any) {
        return await this.request.delete(endpoint, options);
    }

}