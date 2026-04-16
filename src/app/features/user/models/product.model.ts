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
    colors?: string;
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


export interface OrderItem {
  productID: number;
  quantity: number;
  unitPrice: number;
  discountAmount: number;
}

export interface CreateOrderRequest {
  paymentMethod: string;
  salesPerson: string;
  discountAmount: number;
  notes: string;
  items: OrderItem[];
}

export interface OrderResponse {
  success: boolean;
  orderId: number;
  message: string;
}

export interface OrderDetail {
  orderID: number;
  orderDate: string;
  totalAmount: number;
  paymentMethod: string;
  orderStatus: string;
  salesPerson: string;
  discountAmount: number;
  notes: string;
  orderDetails: OrderItemDetail[];
}

export interface OrderItemDetail {
  productID: number;
  productCode: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  discountAmount: number;
  totalAmount: number;
}


export interface OrderFilter {
  pageNumber: number;
  pageSize: number;
  fromDate?: string;
  toDate?: string;
  orderStatus?: string;
  salesPerson?: string;
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

export interface OrderDto {
  orderID: number;
  orderDate: string;
  totalAmount: number;
  paymentMethod: string;
  orderStatus: string;
  salesPerson: string;
  discountAmount: number;
  notes: string;
  orderDetails: OrderDetailDto[];
}

export interface OrderDetailDto {
  productID: number;
  productCode: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  discountAmount: number;
  totalAmount: number;
}
