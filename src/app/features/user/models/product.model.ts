export interface Product {
    productID: number;
    productCode: string;
    productName: string;
    supplierName: string;
    categoryName: string;
    color?: string;
    size?: string;
    purchasePrice: number;
    sellingPrice: number;
    quantityInStock: number;
    description?: string;
    brandName?: string;
    material?: string;
    gender?: string;
    status?: string;
    createdDate: Date;
    updatedDate: Date;
    isAvailable?: boolean;
    profit?: number;
    profitMargin?: number;
}

export interface PagedResult<T> {
    items: T[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}

export interface ProductFilter {
    searchTerm?: string;
    categoryName?: string;
    brandName?: string;
    status?: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: string;
    isDescending?: boolean;
    pageNumber?: number;
    pageSize?: number;
}

export interface CreateProductRequest {
    productCode: string;
    productName: string;
    supplierName: string;
    categoryName: string;
    color?: string;
    size?: string;
    purchasePrice: number;
    sellingPrice: number;
    quantityInStock: number;
    description?: string;
    brandName?: string;
    material?: string;
    gender?: string;
}
