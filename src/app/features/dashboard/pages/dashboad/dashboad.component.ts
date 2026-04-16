import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ProductService } from 'src/app/features/user/services/users.service';
import { NzMessageService } from 'ng-zorro-antd/message';
export interface OrderDisplay {
  id: number;
  orderDate: string;
  totalAmount: number;
  paymentMethod: string;
  orderStatus: string;
  salesPerson: string;
  discountAmount: number;
  notes: string;
  quantity: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerAddress: string;
  products: any[];
  expand: boolean;
  status: string;
}

export interface OrderStats {
  totalRevenue: number;
  totalQuantity: number;
  orderCount: number;
  averageOrderValue: number;
  completedOrders: number;
  cancelledOrders: number;
  pendingOrders: number;
}

@Component({
  selector: 'app-dashboad',
  templateUrl: './dashboad.component.html',
  styleUrls: ['./dashboad.component.scss'],
})
export class DashboadComponent implements OnInit {
  start: number = 1;
  page: number = 1;
  end: number = 10;
  totalCount = 0;
  pageSize: number = 10;
  pageSizeOptions = [10, 20, 50, 100, 150, 200];
  pageIndex: number = 1;
  jumpPage: number = 1;
  loading: boolean = false;
  orders: OrderDisplay[] = [];
  filteredOrders: OrderDisplay[] = [];
  // Bộ lọc
  filterType: 'day' | 'week' | 'month' | 'year' = 'month';
  selectedDate: Date = new Date();
  fromDate: string = '';
  toDate: string = '';
  orderStatus: string = '';
  salesPerson: string = '';

  // Dữ liệu sau lọc
  totalRevenue: number = 0;
  totalQuantity: number = 0;
  orderCount: number = 0;
  stats: OrderStats = {
    totalRevenue: 0,
    totalQuantity: 0,
    orderCount: 0,
    averageOrderValue: 0,
    completedOrders: 0,
    cancelledOrders: 0,
    pendingOrders: 0,
  };

  // Tùy chọn cho select
  filterOptions = [
    { value: 'day', label: 'Theo ngày' },
    { value: 'week', label: 'Theo tuần' },
    { value: 'month', label: 'Theo tháng' },
    { value: 'year', label: 'Theo năm' },
  ];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private message: NzMessageService,
    private router: Router,
  ) {
    this.route.params.subscribe((params) => {
      if (params['page']) {
        this.page = params['page'];
      }
      this.loadOrders();
    });
  }

  ngOnInit(): void {
    this.applyFilter();
  }

  loadOrders(): void {
    this.loading = true;
    const filter = {
      pageNumber: this.page,
      pageSize: this.pageSize,
    };
    this.productService.getOrders(filter).subscribe({
      next: (response: any) => {
        this.loading = false;
        const rawOrders = response?.items || response?.data || [];
        this.totalCount = response?.totalCount || rawOrders.length;
        this.orders = rawOrders.map((order: any) =>
          this.mapOrderToDisplay(order),
        );
        this.filteredOrders = [...this.orders];
        this.calculateStatistics();
        this.start = (this.page - 1) * this.pageSize + 1;
        this.end = Math.min(this.page * this.pageSize, this.totalCount);
      },
      error: (error) => {
        this.loading = false;
        console.error('Lỗi tải đơn hàng:', error);
      },
    });
  }

  private mapOrderToDisplay(order: any): OrderDisplay {
    const totalQuantity =
      order.orderDetails?.reduce(
        (sum: number, item: any) => sum + (item.quantity || 0),
        0,
      ) || 0;
    const products =
      order.orderDetails?.map((item: any) => ({
        name: item.productName,
        quantity: item.quantity,
        price: item.unitPrice,
        total: item.totalAmount,
        code: item.productCode,
      })) || [];
    return {
      id: order.orderID,
      orderDate: order.orderDate,
      totalAmount: order.totalAmount,
      paymentMethod: order.paymentMethod,
      orderStatus: order.orderStatus,
      salesPerson: order.salesPerson,
      discountAmount: order.discountAmount,
      notes: order.notes,
      quantity: totalQuantity,
      status: order.orderStatus,
      customerName: order.customerName || 'Khách lẻ',
      customerPhone: order.customerPhone || 'Chưa cập nhật',
      customerEmail: order.customerEmail || 'Chưa cập nhật',
      customerAddress: order.customerAddress || order.notes || 'Chưa cập nhật',
      products: products,
      expand: false,
    };
  }

  applyFilter(): void {
    if (!this.selectedDate) {
      this.filteredOrders = [...this.orders];
      this.calculateStatistics();
      return;
    }

    this.filteredOrders = this.orders.filter((order) => {
      const orderDate = new Date(order.orderDate);

      switch (this.filterType) {
        case 'day':
          return this.isSameDay(orderDate, this.selectedDate);

        case 'week':
          return this.isSameWeek(orderDate, this.selectedDate);

        case 'month':
          return this.isSameMonth(orderDate, this.selectedDate);

        case 'year':
          return this.isSameYear(orderDate, this.selectedDate);

        default:
          return true;
      }
    });

    this.calculateStatistics();
  }

  /**
   * Kiểm tra cùng ngày
   */
  private isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

  /**
   * Kiểm tra cùng tuần
   */
  private isSameWeek(date1: Date, date2: Date): boolean {
    const getWeekNumber = (date: Date): number => {
      const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
      const pastDaysOfYear =
        (date.getTime() - firstDayOfYear.getTime()) / 86400000;
      return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    };

    return (
      date1.getFullYear() === date2.getFullYear() &&
      getWeekNumber(date1) === getWeekNumber(date2)
    );
  }

  /**
   * Kiểm tra cùng tháng
   */
  private isSameMonth(date1: Date, date2: Date): boolean {
    return (
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

  /**
   * Kiểm tra cùng năm
   */
  private isSameYear(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear();
  }

  /**
   * Format hiển thị ngày theo loại lọc
   */
  getDisplayDate(): string {
    if (!this.selectedDate) return 'Tất cả';

    switch (this.filterType) {
      case 'day':
        return this.selectedDate.toLocaleDateString('vi-VN');
      case 'week':
        const weekNumber = this.getWeekNumber(this.selectedDate);
        return `Tuần ${weekNumber}, ${this.selectedDate.getFullYear()}`;
      case 'month':
        return this.selectedDate.toLocaleDateString('vi-VN', {
          month: 'long',
          year: 'numeric',
        });
      case 'year':
        return this.selectedDate.getFullYear().toString();
      default:
        return this.selectedDate.toLocaleDateString('vi-VN');
    }
  }

  private getWeekNumber(date: Date): number {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear =
      (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  }

  calculateStatistics(): void {
    this.totalRevenue = 0;
    this.totalQuantity = 0;
    this.orderCount = this.filteredOrders.length;
    this.stats = {
      totalRevenue: 0,
      totalQuantity: 0,
      orderCount: this.orderCount,
      averageOrderValue: 0,
      completedOrders: 0,
      cancelledOrders: 0,
      pendingOrders: 0,
    };
    this.filteredOrders.forEach((order) => {
      this.stats.totalRevenue += order.totalAmount || 0;
      this.stats.totalQuantity += order.quantity || 0;
      switch (order.orderStatus) {
        case 'Hoàn thành':
          this.stats.completedOrders++;
          break;
        case 'Đã hủy':
          this.stats.cancelledOrders++;
          break;
        case 'Đang xử lý':
          this.stats.pendingOrders++;
          break;
      }
    });
    this.stats.averageOrderValue =
      this.orderCount > 0 ? this.stats.totalRevenue / this.orderCount : 0;
    this.totalRevenue = this.stats.totalRevenue;
    this.totalQuantity = this.stats.totalQuantity;
    this.orderCount = this.stats.orderCount;
  }

  toggleExpand(order: OrderDisplay): void {
    order.expand = !order.expand;
  }

  resetFilter(): void {
    this.selectedDate = new Date();
    this.filterType = 'month';
    this.applyFilter();
    console.log('Đã đặt lại bộ lọc về tháng hiện tại');
  }

  getFilterLabel(): string {
    if (!this.selectedDate) return 'Chưa chọn';
    const date = moment(this.selectedDate);
    switch (this.filterType) {
      case 'day':
        return `ngày ${date.format('DD/MM/YYYY')}`;
      case 'week':
        return `tuần ${date.week()} năm ${date.year()}`;
      case 'month':
        return `tháng ${date.format('MM/YYYY')}`;
      case 'year':
        return `năm ${date.format('YYYY')}`;
      default:
        return '';
    }
  }

  getStatusTag(status: string): string {
    switch (status) {
      case 'Hoàn thành':
        return 'success';
      case 'Đang xử lý':
        return 'warning';
      case 'Đã hủy':
        return 'error';
      case 'Đã giao':
        return 'processing';
      default:
        return 'default';
    }
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  }

  formatDateTime(dateString: string): string {
    if (!dateString) return 'Chưa cập nhật';
    const utcDate = new Date(dateString);
    const vnDate = new Date(utcDate.getTime() + 7 * 60 * 60 * 1000);
    const hours = vnDate.getHours().toString().padStart(2, '0');
    const minutes = vnDate.getMinutes().toString().padStart(2, '0');
    const seconds = vnDate.getSeconds().toString().padStart(2, '0');
    const day = vnDate.getDate().toString().padStart(2, '0');
    const month = (vnDate.getMonth() + 1).toString().padStart(2, '0');
    const year = vnDate.getFullYear();
    return `${hours}:${minutes}:${seconds} ngày ${day}/${month}/${year}`;
  }

  formatDate(dateString: string): string {
    if (!dateString) return 'Chưa cập nhật';

    const utcDate = new Date(dateString);
    const vnDate = new Date(utcDate.getTime() + 7 * 60 * 60 * 1000);

    const day = vnDate.getDate().toString().padStart(2, '0');
    const month = (vnDate.getMonth() + 1).toString().padStart(2, '0');
    const year = vnDate.getFullYear();

    return `${day}/${month}/${year}`;
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Hoàn thành':
        return 'status-completed';
      case 'Đang xử lý':
        return 'status-pending';
      case 'Đã hủy':
        return 'status-cancelled';
      case 'Đã giao':
        return 'status-delivered';
      default:
        return '';
    }
  }

  handlePageSizeChange(newPageSize: number): void {
    this.pageSize = newPageSize;
    this.page = 1;
    this.pageIndex = 1;
    this.loadOrders();
  }

  handlePageIndexChange(newPageIndex: number) {
    this.page = newPageIndex;
    this.router.navigateByUrl(`/admin/manage-product/${this.page}`);
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
}
