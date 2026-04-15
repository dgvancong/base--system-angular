import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ProductService } from '../../services/users.service';
@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss'],
})
export class UserAddComponent implements OnInit {
  productForm: FormGroup = this.fb.group(
    {
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
      status: ['Đang bán'],
    },
    { validators: this.priceValidator },
  );

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
    { name: 'Bạc', value: 'silver', code: '#C0C0C0' },
  ];

  loadingbutton: boolean = false;

  @Output() cancelModal = new EventEmitter<any>();
  @Output() addSuccess = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private productService: ProductService,
  ) {}

  ngOnInit(): void {}

  priceValidator(group: FormGroup) {
    const purchasePrice = group.get('purchasePrice')?.value;
    const sellingPrice = group.get('sellingPrice')?.value;

    if (sellingPrice && purchasePrice && sellingPrice <= purchasePrice) {
      group.get('sellingPrice')?.setErrors({ min: true });
      return { priceInvalid: true };
    }
    return null;
  }

  vndFormatter = (value: any): string => {
    if (!value && value !== 0) return '0';
    return value.toLocaleString('vi-VN');
  };

  vndParser = (value: any): any => {
    if (!value) return 0;
    const cleanValue = value.replace(/[^0-9]/g, '');
    return cleanValue ? parseInt(cleanValue) : 0;
  };

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

  handleOk(): void {
    this.loadingbutton = true;
    const formValue = this.productForm.value;
    const productData = {
      productCode: formValue.productCode,
      productName: formValue.productName,
      supplierName: formValue.supplierName,
      categoryName: formValue.categoryName,
      color: formValue.color ? formValue.color.join(',') : null,
      size: formValue.size || null,
      purchasePrice: formValue.purchasePrice,
      sellingPrice: formValue.sellingPrice,
      quantityInStock: formValue.quantityInStock,
      description: formValue.description || null,
      brandName: formValue.brandName || null,
      material: formValue.material || null,
      gender: formValue.gender || null,
      status: formValue.status || 'Đang bán'
    };
    this.productService.createProduct(productData).subscribe(
      (res)=>{
        this.message.success('Thêm sản phẩm thành công');
        this.resetForm();
        this.handleCancel();
        this.loadingbutton = false;
        this.addSuccess.emit();
      },
      (error) => {
        const errorMessage = error.error?.message || 'Thêm sản phẩm thất bại';
        this.message.error(errorMessage);
        this.handleCancel();
        this.loadingbutton = false;
      }
    );
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
      status: 'Đang bán',
    });
  }

  getColorCode(colorName: string): string {
    const color = this.colors.find((c) => c.name === colorName);
    return color ? color.code : '#000000';
  }

  getColorValue(colorName: string): string {
    const color = this.colors.find((c) => c.name === colorName);
    return color ? color.value : 'black';
  }

  removeColor(colorName: string) {
    const currentColors = this.productForm.get('color')?.value || [];
    const newColors = currentColors.filter((c: string) => c !== colorName);
    this.productForm.get('color')?.setValue(newColors);
  }

  handleCancel() {
    this.cancelModal.emit();
  }
}
