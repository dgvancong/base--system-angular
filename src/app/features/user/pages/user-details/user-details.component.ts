import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ProductService } from '../../services/users.service';
import { CreateOrderRequest } from '../../models/product.model';

export interface CartItem {
  productID: number;
  productCode: string;
  productName: string;
  sellingPrice: number;
  purchaseQuantity: number;
  totalPrice: number;
  inStock: number;
  color?: string;
  size?: string;
  categoryName?: string;
}

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  selectedPaymentMethod: string = 'cash';
  cartItems: CartItem[] = [];
  discountAmount: number = 0;
  paymentMethod: string = 'Tiền mặt';
  salesPerson: string = 'Nhân viên';
  notes: string = 'Giao hàng giờ hành chính, trước 17h';
  isLoading: boolean = false;

  @Input() data: any;
  @Output() cancelModal = new EventEmitter<any>();
  @Output() addSuccess = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private productService: ProductService,
  ) {}

  ngOnInit(): void {
    if (this.data && Array.isArray(this.data)) {
      this.cartItems = [...this.data];
    }
  }

  formatPrice(price: number): string {
    if (!price && price !== 0) return '0 ₫';
    return price.toLocaleString('vi-VN') + ' ₫';
  }

  formatNumber(price: number): string {
    if (!price && price !== 0) return '0';
    return price.toLocaleString('vi-VN');
  }

  getSubtotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.sellingPrice * item.purchaseQuantity), 0);
  }

  getTotal(): number {
    const total = this.getSubtotal() - this.discountAmount;
    return total < 0 ? 0 : total;
  }

  updateQuantity(item: CartItem, newQuantity: number): void {
    if (newQuantity < 1) {
      item.purchaseQuantity = 1;
    } else if (newQuantity > item.inStock) {
      item.purchaseQuantity = item.inStock;
      this.message.warning(`Số lượng vượt quá tồn kho (${item.inStock})`);
    } else {
      item.purchaseQuantity = newQuantity;
    }
    item.totalPrice = item.sellingPrice * item.purchaseQuantity;
  }

  removeFromCart(item: CartItem): void {
    const index = this.cartItems.findIndex(i => i.productID === item.productID);
    if (index > -1) {
      this.cartItems.splice(index, 1);
      this.message.success(`Đã xóa ${item.productName} khỏi giỏ hàng`);
    }
  }

  clearCart(): void {
    if (this.cartItems.length > 0) {
      this.cartItems = [];
      this.message.success('Đã xóa toàn bộ giỏ hàng');
    }
  }

  onDiscountInput(event: any): void {
    let value = event.target.value;
    let cleanValue = value.replace(/[^0-9]/g, '');
    let numValue = cleanValue ? parseInt(cleanValue) : 0;
    if (numValue < 0) {
      numValue = 0;
    }
    const maxDiscount = this.getSubtotal();
    if (numValue > maxDiscount) {
      numValue = maxDiscount;
    }
    this.discountAmount = numValue;
    event.target.value = this.formatNumber(numValue);
  }

  processCheckout(): void {
    if (this.cartItems.length === 0) {
      this.message.warning('Giỏ hàng trống, vui lòng thêm sản phẩm');
      return;
    }
    this.isLoading = true;
    const orderData: CreateOrderRequest = {
      paymentMethod: this.paymentMethod,
      salesPerson: this.salesPerson,
      discountAmount: this.discountAmount,
      notes: this.notes,
      items: this.cartItems.map(item => ({
        productID: item.productID,
        quantity: item.purchaseQuantity,
        unitPrice: item.sellingPrice,
        discountAmount: 0
      }))
    };
    this.productService.createOrder(orderData).subscribe(
      (res)=>{
        this.message.success('Tạo đơn hàng thành công');
        this.isLoading = false;
        this.addSuccess.emit();
        this.handleCancel();
      },
      (error) => {
        const errorMessage = error.error?.message || 'Tạo đơn hàng thất bại';
        this.message.error(errorMessage);
        this.isLoading = false;
        this.handleCancel();
      }
    );
  }

  handleCancel(): void {
    this.cancelModal.emit();
  }
}
