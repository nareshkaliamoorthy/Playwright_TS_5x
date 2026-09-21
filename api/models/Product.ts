
export interface ProductRequest {
    title: string;
    price: number;
    description: string;
    category: string;
}

export interface ProductPatchRequest {
    title?: string;
    price?: number;
    description?: string;
    category?: string;
}

export interface ProductResponse {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
}