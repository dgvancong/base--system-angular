import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../models/product.model';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  selectedPaymentMethod: string = 'cash';
  cartItems: Product[] = [];
  discountAmount: number = 0;

  @Input() data: any;
  @Output() cancelModal = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
  ) {

  }

  ngOnInit(): void {
    this.cartItems = this.data || [];
    console.log(this.cartItems);
  }

  formatPrice(price: number): string {
    if (!price && price !== 0) return '0 ₫';
    return price.toLocaleString('vi-VN') + ' ₫';
  }

  getSubtotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.sellingPrice * item.quantityInStock), 0);
  }

  getTotal(): number {
    return this.getSubtotal() - this.discountAmount;
  }

  updateQuantity(item: Product, newQuantity: number) {
    if (newQuantity < 1) {
      item.quantityInStock = 1;
    } else if (newQuantity > item.quantityInStock) {
      item.quantityInStock = item.quantityInStock;
    } else {
      item.quantityInStock = newQuantity;
    }
  }

  removeFromCart(item: Product) {
    const index = this.cartItems.indexOf(item);
    if (index > -1) {
      this.cartItems.splice(index, 1);
    }
  }

  clearCart() {
    if (this.cartItems.length > 0) {
      this.cartItems = [];
    }
  }

  processCheckout() {

  }

  onDiscountInput(event: any) {
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

  formatNumber(price: number): string {
    if (!price && price !== 0) return '0';
    return price.toLocaleString('vi-VN');
  }

  onDiscountChange() {
    if (this.discountAmount > this.getSubtotal()) {
      this.discountAmount = this.getSubtotal();
    }
    if (this.discountAmount < 0) {
      this.discountAmount = 0;
    }
  }

  handleCancel() {
    this.cancelModal.emit();
  }
}
