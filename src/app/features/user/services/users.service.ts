import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, PagedResult, ProductFilter, CreateOrderRequest, OrderResponse, OrderDetail } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://localhost:5001/api/products';
  private apiUrls = 'https://localhost:5001/api/orders';

  constructor(private http: HttpClient) { }

  getProducts(filter: ProductFilter): Observable<PagedResult<Product>> {
    let params = new HttpParams();
    if (filter.searchTerm) params = params.set('searchTerm', filter.searchTerm);
    if (filter.colors) params = params.set('colors', filter.colors);
    if (filter.categoryName) params = params.set('categoryName', filter.categoryName);
    if (filter.brandName) params = params.set('brandName', filter.brandName);
    if (filter.status) params = params.set('status', filter.status);
    if (filter.minPrice) params = params.set('minPrice', filter.minPrice.toString());
    if (filter.maxPrice) params = params.set('maxPrice', filter.maxPrice.toString());
    if (filter.sortBy) params = params.set('sortBy', filter.sortBy);
    if (filter.isDescending !== undefined) params = params.set('isDescending', filter.isDescending.toString());
    if (filter.pageNumber) params = params.set('pageNumber', filter.pageNumber.toString());
    if (filter.pageSize) params = params.set('pageSize', filter.pageSize.toString());
    return this.http.get<PagedResult<Product>>(this.apiUrl, { params });
  }

  createProduct(product: any): Observable<any> {
    return this.http.post(this.apiUrl, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  createOrder(orderData: CreateOrderRequest): Observable<OrderResponse> {
    return this.http.post<OrderResponse>(this.apiUrls, orderData);
  }

  getOrders(params?: any): Observable<any> {
    let httpParams = new HttpParams();
    if (params) {
      if (params.pageNumber) httpParams = httpParams.set('pageNumber', params.pageNumber);
      if (params.pageSize) httpParams = httpParams.set('pageSize', params.pageSize);
      if (params.fromDate) httpParams = httpParams.set('fromDate', params.fromDate);
      if (params.toDate) httpParams = httpParams.set('toDate', params.toDate);
      if (params.orderStatus) httpParams = httpParams.set('orderStatus', params.orderStatus);
      if (params.salesPerson) httpParams = httpParams.set('salesPerson', params.salesPerson);
    }
    return this.http.get<any>(this.apiUrls, { params: httpParams });
  }

  getOrderById(orderId: number): Observable<OrderDetail> {
    return this.http.get<OrderDetail>(`${this.apiUrls}/${orderId}`);
  }

}
