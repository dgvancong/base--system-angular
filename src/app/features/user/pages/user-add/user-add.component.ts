import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IconDefinition } from '@ant-design/icons-angular';
import { PlusOutline, CloseOutline, SearchOutline } from '@ant-design/icons-angular/icons';

const antDesignIcons: IconDefinition[] = [
  PlusOutline,
  CloseOutline,
  SearchOutline
];
@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {

  productForm: FormGroup = this.fb.group({  // Khởi tạo ngay
    productCode: ['', [Validators.required]],
    productName: ['', [Validators.required]],
    supplierName: ['', [Validators.required]],
    categoryName: ['', [Validators.required]],
    color: [[]],
    size: [null],
    purchasePrice: [0, [Validators.required, Validators.min(0)]],
    sellingPrice: [0, [Validators.required, Validators.min(0)]],
    quantityInStock: [0, [Validators.min(0)]],
    description: [''],
    brandName: [''],
    material: [''],
    gender: [null],
    status: ['Đang bán']
  }, { validators: this.priceValidator });

  colors = [
    { name: 'Đen', value: 'black', code: '#000000' },
    { name: 'Trắng', value: 'white', code: '#FFFFFF' },
    { name: 'Đỏ', value: 'red', code: '#FF0000' },
    { name: 'Xanh dương', value: 'blue', code: '#0000FF' },
    { name: 'Xanh lá', value: 'green', code: '#00FF00' },
    { name: 'Vàng', value: 'yellow', code: '#FFFF00' },
    { name: 'Tím', value: 'purple', code: '#800080' },
    { name: 'Cam', value: 'orange', code: '#FFA500' },
    { name: 'Hồng', value: 'pink', code: '#FFC0CB' },
    { name: 'Xám', value: 'gray', code: '#808080' },
    { name: 'Nâu', value: 'brown', code: '#8B4513' },
    { name: 'Xanh ngọc', value: 'teal', code: '#008080' },
    { name: 'Vàng kim', value: 'gold', code: '#FFD700' },
    { name: 'Bạc', value: 'silver', code: '#C0C0C0' }
  ];

  @Output() cancelModal = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {

  }

  priceValidator(group: FormGroup) {
    const purchasePrice = group.get('purchasePrice')?.value;
    const sellingPrice = group.get('sellingPrice')?.value;

    if (sellingPrice && purchasePrice && sellingPrice <= purchasePrice) {
      group.get('sellingPrice')?.setErrors({ min: true });
      return { priceInvalid: true };
    }
    return null;
  }

  vndFormatter = (value: number): string => {
    if (!value && value !== 0) return '0';
    return value.toLocaleString('vi-VN');
  }

  vndParser = (value: any): number => {
    if (!value) return 0;
    const cleanValue = value.replace(/[^0-9]/g, '');
    return cleanValue ? parseInt(cleanValue) : 0;
  }

  onProductCodeBlur() {
    const productCode = this.productForm.get('productCode')?.value;
    if (productCode) {
      const isDuplicate = this.checkDuplicateProductCode(productCode);
      if (isDuplicate) {
        this.productForm.get('productCode')?.setErrors({ duplicate: true });
      }
    }
  }

  checkDuplicateProductCode(code: string): boolean {
    return false;
  }

  handleOk() {
    if (this.productForm.valid) {
      const formValue = this.productForm.value;
      const productData = {
        ...formValue,
        color: formValue.color ? formValue.color.join(',') : null,
        createdDate: new Date(),
        updatedDate: new Date()
      };
      console.log('Product data to submit:', productData);
      this.addProduct(productData);
    }
    else {
      Object.values(this.productForm.controls).forEach(control => {
        control.markAsTouched();
      });
      console.log('Vui lòng điền đầy đủ thông tin bắt buộc');
    }
  }

  addProduct(productData: any) {
    setTimeout(() => {
      this.resetForm();
      this.loadProducts();
    }, 1000);
  }

  resetForm() {
    this.productForm.reset({
      productCode: '',
      productName: '',
      supplierName: '',
      categoryName: '',
      color: [],
      size: null,
      purchasePrice: 0,
      sellingPrice: 0,
      quantityInStock: 0,
      description: '',
      brandName: null,
      material: '',
      gender: null,
      status: 'Đang bán'
    });
  }

    // Lấy mã màu từ tên màu
  getColorCode(colorName: string): string {
    const color = this.colors.find(c => c.name === colorName);
    return color ? color.code : '#000000';
  }

    // Lấy giá trị màu
  getColorValue(colorName: string): string {
    const color = this.colors.find(c => c.name === colorName);
    return color ? color.value : 'black';
  }

  // Xóa màu đã chọn
  removeColor(colorName: string) {
    const currentColors = this.productForm.get('color')?.value || [];
    const newColors = currentColors.filter((c: string) => c !== colorName);
    this.productForm.get('color')?.setValue(newColors);
  }

  loadProducts() {
    // Load lại danh sách sản phẩm
  }

  handleCancel() {
    this.cancelModal.emit();
  }

}
