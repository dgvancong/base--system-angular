import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import { UserInfo } from 'src/app/core/models/auth.model';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/users.service';
import { listProduct } from '../../models/column/products';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss'],
})
export class ManageUserComponent implements OnInit {
  listColumnsUserDisplay = [...listProduct];
  listOfData: Product[] = [];
  listOfDisplayData: Product[] = [];
  setOfCheckedId = new Set<string>();
  loading: boolean = false;
  start: number = 1;
  page: number = 1;
  end: number = 10;
  totalCount = 0;
  pageSize: number = 10;
  pageSizeOptions = [10, 20, 50, 100, 150, 200];
  pageIndex: number = 1;
  jumpPage: number = 1;
  typeNoResult: 'load' | 'search' = 'load';
  isDeleteRole: boolean = false;
  currentUser: UserInfo | null = null;
  isDropdownOpen = false;
  selectedProductType: string | null = null;
  selectedColors: string[] = [];
  priceRange: [number, number] = [0, 30000000];
  hasActiveFilters = false;
  isResoucesUserAdd: boolean = false;
  isPayment: boolean = false;
  products: Product[] = [];
  searchTerm = '';
  selectedCategory = '';
  selectedBrand = '';
  selectedStatus = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  sortBy = '';
  sortDirection = 'desc';
  productID: any = null;
  bodyDataProduct: any[] = [];
  bodyDataProductadd: any[] = [];
  addinvoice: boolean = false;
  purchaseQuantities: { [key: number]: number } = {};
  showPurchasePrice: { [productId: number]: boolean } = {};

  private originalProductType: string | null = null;
  private originalColors: string[] = [];
  private originalPriceRange: [number, number] = [0, 30000000];

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

  pricePresets = [
    { label: 'Dưới 1tr', min: 0, max: 1000000 },
    { label: '1tr - 2tr', min: 1000000, max: 2000000 },
    { label: '2tr - 3tr', min: 2000000, max: 3000000 },
    { label: '3tr - 5tr', min: 3000000, max: 5000000 },
  ];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private productService: ProductService,
    private message: NzMessageService
  ) {
    this.route.params.subscribe((params) => {
      if (params['page']) {
        this.page = params['page'];
      }
      this.loadProducts();
    });
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
    });
  }

  loadProducts(): void {
    this.loading = true;
    const filter = {
      searchTerm: this.searchTerm || undefined,
      categoryName: this.selectedCategory || undefined,
      brandName: this.selectedBrand || undefined,
      status: this.selectedStatus || undefined,
      minPrice: this.minPrice || undefined,
      maxPrice: this.maxPrice || undefined,
      sortBy: this.sortBy || undefined,
      isDescending: this.sortDirection === 'desc',
      pageNumber: this.page,
      pageSize: this.pageSize
    };
    this.productService.getProducts(filter).subscribe(
      (res: any) => {
        this.loading = false;
        this.listOfData = res.items;
        this.listOfData.forEach(p => {
        this.purchaseQuantities[p.productID] = 1;
        });
        this.totalCount = res.totalCount;
        this.start = (this.page - 1) * this.pageSize + 1;
        this.end = Math.min(this.page * this.pageSize, this.totalCount);
      },
      (error) => {
        this.loading = false;
        console.log('Lỗi tải sản phẩm: ' + error.message);
      }
    );
  }

  handleOnSearch(value: any) {
    this.pageIndex = 1;
    this.typeNoResult = 'search';
    this.searchTerm = value;
    this.loadProducts();
  }

  handleOnClear(){
    this.searchTerm = '';
    this.typeNoResult = 'load';
    this.loadProducts();
  }

  onProductAddedSuccess() {
    this.loading = true;
    this.loadProducts();
  }

  handlePageSizeChange(newPageSize: number): void {
    this.pageSize = newPageSize;
    this.page = 1;
    this.pageIndex = 1;
    this.loadProducts();
  }

  handlePageIndexChange(newPageIndex: number) {
    this.page = newPageIndex;
    this.router.navigateByUrl(`/admin/manage-user/${this.page}`);
  }

  jumpToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.getTotalPages()) {
      this.page = pageNumber;
      this.pageIndex = pageNumber;
      this.router.navigateByUrl(`/admin/manage-product/${this.page}`);
    }
  }

  getTotalPages(): number {
    return Math.ceil(this.totalCount / this.pageSize);
  }

  showUserDetails(data: any): void {
    if (data?.id) {
      this.router.navigateByUrl(`/admin/manage-product/details/${data?.id}`);
    }
  }

  showDeleteRole(productID: any) {
    this.productID = productID;
    this.isDeleteRole = true;
  }

  submitDeleteRole() {
    this.productService.deleteProduct(this.productID).subscribe(
      (response) => {
        this.loadProducts();
      },
      (error) => {
        console.log('error', error);
      }
    );
    this.isDeleteRole = false;
  }

  canceDeleteRole() {
    this.isDeleteRole = false;
  }

  toggleDropdown() {
    if (!this.isDropdownOpen) {
      this.saveOriginalValues();
    }
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  saveOriginalValues() {
    this.originalProductType = this.selectedProductType;
    this.originalColors = [...this.selectedColors];
    this.originalPriceRange = [...this.priceRange] as [number, number];
  }

  isColorSelected(colorValue: string): boolean {
    return this.selectedColors.includes(colorValue);
  }

  toggleColor(colorValue: string) {
    const index = this.selectedColors.indexOf(colorValue);
    if (index > -1) {
      this.selectedColors.splice(index, 1);
    } else {
      this.selectedColors.push(colorValue);
    }
    this.onFilterChange();
  }

  onFilterChange() {
    this.updateActiveFiltersStatus();
  }

  applyPricePreset(preset: any) {
    this.priceRange = [preset.min, preset.max];
    this.onPriceChange();
  }

  applyFilters() {
    const filters = {
      productType: this.selectedProductType,
      colors: this.selectedColors,
      priceRange: this.priceRange,
    };
    this.updateActiveFiltersStatus();
    this.isDropdownOpen = false;
  }

  cancelFilters() {
    this.selectedProductType = this.originalProductType;
    this.selectedColors = [...this.originalColors];
    this.priceRange = [...this.originalPriceRange] as [number, number];
    this.updateActiveFiltersStatus();
    this.isDropdownOpen = false;
  }

  clearAllFilters() {
    this.selectedProductType = null;
    this.selectedColors = [];
    this.priceRange = [0, 30000000];
    this.updateActiveFiltersStatus();
  }

  formatPrice(value: any): string {
    if (!value && value !== 0) return '0';
    return value.toLocaleString('vi-VN');
  }

  onPriceInputChange(event: any, index: number) {
    let value = event.target.value;
    let cleanValue = value.replace(/[^0-9]/g, '');
    let numValue = cleanValue ? parseInt(cleanValue) : 0;
    if (index === 0) {
      if (numValue > this.priceRange[1]) {
        this.priceRange[0] = this.priceRange[1];
      } else if (numValue < 0) {
        this.priceRange[0] = 0;
      } else {
        this.priceRange[0] = numValue;
      }
    } else {
      if (numValue < this.priceRange[0]) {
        this.priceRange[1] = this.priceRange[0];
      } else if (numValue > 30000000) {
        this.priceRange[1] = 30000000;
      } else {
        this.priceRange[1] = numValue;
      }
    }
    this.onPriceChange();
  }

  onPriceInput(event: Event, index: number) {
    const inputElement = event.target as HTMLInputElement;
    let value = inputElement.value.replace(/[^0-9]/g, '');
    let numValue = value ? parseInt(value) : 0;

    if (index === 0) {
      this.priceRange[0] = numValue;
    } else {
      this.priceRange[1] = numValue;
    }

    this.onPriceChange();
  }

  onPriceChange() {
    this.updateActiveFiltersStatus();
  }

  updateActiveFiltersStatus() {
    this.hasActiveFilters = !!(
      this.selectedProductType ||
      this.selectedColors.length > 0 ||
      this.priceRange[0] > 0 ||
      this.priceRange[1] < 30000000
    );
  }

  formatSliderTip = (value: number): string => {
    if (!value && value !== 0) return '0 đ';
    return value.toLocaleString('vi-VN') + ' đ';
  };

  formatSliderTipShort = (value: number): string => {
    if (!value && value !== 0) return '0₫';

    if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + 'tr đ';
    }
    if (value >= 1000) {
      return (value / 1000).toFixed(0) + 'k đ';
    }
    return value + ' đ';
  };

  parseColors(colorString: string | null | undefined): string[] {
    if (!colorString) return [];
    return colorString
      .split(',')
      .map(color => color.trim())
      .filter(color => color.length > 0);
  }

  getColorCode(colorName: string): string {
    if (!colorName) return '#CCCCCC';

    const color = this.colors.find(c =>
      c.name === colorName ||
      c.value === colorName?.toLowerCase()
    );
    return color?.code || '#CCCCCC';
  }

  getColorDisplayName(colorName: string): string {
    const color = this.colors.find(c => c.name === colorName);
    return color?.name || colorName;
  }

  showAddResourcesUser() {
    this.isResoucesUserAdd = true;
  }

  cancelResoucesUserAdd(){
    this.isResoucesUserAdd = false;
  }

  showPayment() {
    this.isPayment = true;
  }

  cancelPayment(){
    this.isPayment = false;
  }

  addProductCatego(data: any){
    this.addinvoice = true;
    this.bodyDataProductadd = data ? [data] : [];
  }

  updateQuantity(productId: number, quantity: number): void {
    this.purchaseQuantities[productId] = quantity;
  }

  addToCart(product: any): void {
    const quantity = this.purchaseQuantities[product.productID];
    if (!quantity || quantity <= 0) {
      this.message.error('Vui lòng chọn số lượng hợp lệ');
      return;
    }
    if (quantity > product.quantityInStock) {
      this.message.error(`Số lượng vượt quá tồn kho (${product.quantityInStock})`);
      return;
    }
    const existingProduct = this.bodyDataProductadd.find(p => p.productID === product.productID);
    if (existingProduct) {
      existingProduct.purchaseQuantity = quantity;
      existingProduct.totalPrice = product.sellingPrice * quantity;
      this.message.info(`Đã cập nhật số lượng ${product.productName}`);
    }
    else {
      const cartItem = {
        productID: product.productID,
        productCode: product.productCode,
        productName: product.productName,
        sellingPrice: product.sellingPrice,
        purchaseQuantity: quantity,
        totalPrice: product.sellingPrice * quantity,
        addedAt: new Date(),
        inStock: product.quantityInStock
      };
      this.bodyDataProductadd.push(cartItem);
      this.message.success(`Đã thêm ${quantity} ${product.productName} vào giỏ hàng`);
    }
    this.bodyDataProduct = [...this.bodyDataProductadd];
    this.purchaseQuantities[product.productID] = 1;
    this.addinvoice = false;
  }

  cancelInvoiceAdd(){
    this.addinvoice = false;
  }

  togglePurchasePrice(productId: number): void {
    this.showPurchasePrice[productId] = !this.showPurchasePrice[productId];
  }

  isShowPurchasePrice(productId: number): boolean {
    return this.showPurchasePrice[productId] || false;
  }

  getDisplayPurchasePrice(product: any): string {
    const isShow = this.isShowPurchasePrice(product.productID);
    if (!isShow) {
      return '***';
    }
    return this.formatPrice(product?.purchasePrice);
  }

  getStatusClass(status: any): string {
    switch (status) {
      case 'Đang bán':
        return 'status-active';
      case 'Hết hàng':
        return 'status-outstock';
      case 'Ngừng bán':
        return 'status-stopped';
      default:
        return 'status-default';
    }
  }

}
