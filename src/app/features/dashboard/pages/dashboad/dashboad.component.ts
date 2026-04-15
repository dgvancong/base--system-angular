import {
  Component,
  OnInit,
} from '@angular/core';
import * as moment from 'moment';
import { NzMessageService } from 'ng-zorro-antd/message';

interface ProductItem {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

interface Order {
  id: number;
  customerName: string;
  customerPhone?: string;
  customerEmail?: string;
  customerAddress?: string;
  totalAmount: number;
  quantity: number;
  status: 'completed' | 'pending' | 'cancelled';
  orderDate: Date;
  products: ProductItem[];
  expand?: boolean; // Thêm property để quản lý trạng thái mở rộng
}

@Component({
  selector: 'app-dashboad',
  templateUrl: './dashboad.component.html',
  styleUrls: ['./dashboad.component.scss'],
})
export class DashboadComponent implements OnInit {
  orders: Order[] = [
    {
      id: 1001,
      customerName: 'Nguyễn Văn A',
      customerPhone: '0987654321',
      customerEmail: 'nguyenvana@email.com',
      customerAddress: '123 Đường Láng, Đống Đa, Hà Nội',
      totalAmount: 1250000,
      quantity: 3,
      status: 'completed',
      orderDate: new Date(2026, 3, 10),
      expand: false,
      products: [
        { name: 'Áo sơ mi nam cao cấp', quantity: 2, price: 350000, total: 700000 },
        { name: 'Quần tây âu lịch sự', quantity: 1, price: 550000, total: 550000 }
      ]
    },
    {
      id: 1002,
      customerName: 'Trần Thị B',
      customerPhone: '0978123456',
      customerEmail: 'tranb@email.com',
      customerAddress: '456 Nguyễn Trãi, Quận 1, TP.HCM',
      totalAmount: 890000,
      quantity: 2,
      status: 'completed',
      orderDate: new Date(2026, 3, 11),
      expand: false,
      products: [
        { name: 'Váy công sở thanh lịch', quantity: 1, price: 590000, total: 590000 },
        { name: 'Giày cao gót nữ', quantity: 1, price: 300000, total: 300000 }
      ]
    },
    {
      id: 1003,
      customerName: 'Lê Văn C',
      customerPhone: '0912345678',
      customerEmail: 'levanc@email.com',
      customerAddress: '789 Hoàng Hoa Thám, Ba Đình, Hà Nội',
      totalAmount: 2100000,
      quantity: 5,
      status: 'pending',
      orderDate: new Date(2026, 3, 5),
      expand: false,
      products: [
        { name: 'Bộ suit nam cao cấp', quantity: 1, price: 1500000, total: 1500000 },
        { name: 'Cà vạt lụa thượng hạng', quantity: 2, price: 200000, total: 400000 },
        { name: 'Áo sơ mi trắng', quantity: 2, price: 100000, total: 200000 }
      ]
    },
    {
      id: 1004,
      customerName: 'Phạm Thị D',
      customerPhone: '0965432187',
      customerEmail: 'phamthid@email.com',
      customerAddress: '321 Lê Lợi, Hải Châu, Đà Nẵng',
      totalAmount: 450000,
      quantity: 1,
      status: 'completed',
      orderDate: new Date(2026, 2, 28),
      expand: false,
      products: [
        { name: 'Túi xách nữ hàng hiệu', quantity: 1, price: 450000, total: 450000 }
      ]
    },
    {
      id: 1005,
      customerName: 'Hoàng Văn E',
      customerPhone: '0934567890',
      customerEmail: 'hoangve@email.com',
      customerAddress: '567 Nguyễn Huệ, Ninh Kiều, Cần Thơ',
      totalAmount: 3200000,
      quantity: 7,
      status: 'completed',
      orderDate: new Date(2026, 2, 15),
      expand: false,
      products: [
        { name: 'Laptop Dell XPS 15', quantity: 1, price: 2500000, total: 2500000 },
        { name: 'Chuột không dây Logitech', quantity: 2, price: 200000, total: 400000 },
        { name: 'Túi chống sốc laptop', quantity: 1, price: 300000, total: 300000 }
      ]
    },
    {
      id: 1006,
      customerName: 'Ngô Thị F',
      customerPhone: '0945678123',
      customerEmail: 'ngothif@email.com',
      customerAddress: '890 Trần Phú, Hà Đông, Hà Nội',
      totalAmount: 670000,
      quantity: 2,
      status: 'cancelled',
      orderDate: new Date(2026, 1, 20),
      expand: false,
      products: [
        { name: 'Set mỹ phẩm dưỡng da', quantity: 1, price: 450000, total: 450000 },
        { name: 'Sữa rửa mặt trắng da', quantity: 1, price: 220000, total: 220000 }
      ]
    },
    {
      id: 1007,
      customerName: 'Đỗ Văn G',
      customerPhone: '0956781234',
      customerEmail: 'dovang@email.com',
      customerAddress: '123 Bạch Đằng, Hồng Bàng, Hải Phòng',
      totalAmount: 1890000,
      quantity: 4,
      status: 'completed',
      orderDate: new Date(2026, 3, 1),
      expand: false,
      products: [
        { name: 'Điện thoại iPhone 15 Pro', quantity: 1, price: 1890000, total: 1890000 }
      ]
    },
    {
      id: 1008,
      customerName: 'Bùi Thị H',
      customerPhone: '0976543210',
      customerEmail: 'buithih@email.com',
      customerAddress: '456 Phan Chu Trinh, Pleiku, Gia Lai',
      totalAmount: 990000,
      quantity: 2,
      status: 'completed',
      orderDate: new Date(2026, 3, 12),
      expand: false,
      products: [
        { name: 'Đồng hồ thể thao chính hãng', quantity: 1, price: 690000, total: 690000 },
        { name: 'Kính mát thời trang', quantity: 1, price: 300000, total: 300000 }
      ]
    },
    {
      id: 1009,
      customerName: 'Vũ Văn I',
      customerPhone: '0987123456',
      customerEmail: 'vuvani@email.com',
      customerAddress: '789 Hùng Vương, Việt Trì, Phú Thọ',
      totalAmount: 2550000,
      quantity: 6,
      status: 'pending',
      orderDate: new Date(2026, 2, 25),
      expand: false,
      products: [
        { name: 'Máy ảnh Canon EOS R50', quantity: 1, price: 1800000, total: 1800000 },
        { name: 'Ống kính 50mm f/1.8', quantity: 1, price: 500000, total: 500000 },
        { name: 'Thẻ nhớ 32GB', quantity: 2, price: 125000, total: 250000 }
      ]
    },
    {
      id: 1010,
      customerName: 'Đặng Thị K',
      customerPhone: '0967890123',
      customerEmail: 'dangthik@email.com',
      customerAddress: '234 Lý Tự Trọng, Vinh, Nghệ An',
      totalAmount: 730000,
      quantity: 1,
      status: 'completed',
      orderDate: new Date(2026, 3, 8),
      expand: false,
      products: [
        { name: 'Nước hoa cao cấp Pháp', quantity: 1, price: 730000, total: 730000 }
      ]
    },
    {
      id: 1011,
      customerName: 'Lý Văn L',
      customerPhone: '0978123456',
      customerEmail: 'lyvanl@email.com',
      customerAddress: '456 Lý Thường Kiệt, Hà Nội',
      totalAmount: 4120000,
      quantity: 9,
      status: 'completed',
      orderDate: new Date(2025, 11, 15),
      expand: false,
      products: [
        { name: 'TV Samsung 4K 55 inch', quantity: 1, price: 4120000, total: 4120000 }
      ]
    },
    {
      id: 1012,
      customerName: 'Mai Thị M',
      customerPhone: '0987654321',
      customerEmail: 'maithm@email.com',
      customerAddress: '789 Trần Hưng Đạo, Hải Phòng',
      totalAmount: 1540000,
      quantity: 3,
      status: 'completed',
      orderDate: new Date(2026, 0, 10),
      expand: false,
      products: [
        { name: 'Loa bluetooth JBL', quantity: 2, price: 500000, total: 1000000 },
        { name: 'Tai nghe Sony', quantity: 1, price: 540000, total: 540000 }
      ]
    }
  ];

  // Bộ lọc
  filterType: 'day' | 'week' | 'month' | 'year' = 'month';
  selectedDate: Date | null = new Date();

  // Dữ liệu sau lọc
  filteredOrders: Order[] = [];
  totalRevenue: number = 0;
  totalQuantity: number = 0;
  orderCount: number = 0;

  // Tùy chọn cho select
  filterOptions = [
    { value: 'day', label: 'Theo ngày' },
    { value: 'week', label: 'Theo tuần' },
    { value: 'month', label: 'Theo tháng' },
    { value: 'year', label: 'Theo năm' },
  ];

  constructor() {}

  ngOnInit(): void {
    this.applyFilter();
  }

  applyFilter(): void {
    if (!this.selectedDate) {
      this.filteredOrders = [];
      this.calculateStats();
     console.log('Vui lòng chọn mốc thời gian');
      return;
    }

    const referenceDate = moment(this.selectedDate);
    this.filteredOrders = this.orders.filter((order) => {
      const orderDate = moment(order.orderDate);
      switch (this.filterType) {
        case 'day':
          return orderDate.isSame(referenceDate, 'day');
        case 'week':
          return orderDate.isSame(referenceDate, 'week');
        case 'month':
          return orderDate.isSame(referenceDate, 'month');
        case 'year':
          return orderDate.isSame(referenceDate, 'year');
        default:
          return true;
      }
    });

    this.calculateStats();

    if (this.filteredOrders.length === 0) {
      console.log(`Không có đơn hàng nào trong ${this.getFilterLabel()}`);
    } else {
      console.log(`Tìm thấy ${this.filteredOrders.length} đơn hàng trong ${this.getFilterLabel()}`);
    }
  }

  // Thống kê tổng quan
  calculateStats(): void {
    this.totalRevenue = this.filteredOrders.reduce(
      (sum, order) => sum + order.totalAmount,
      0,
    );
    this.totalQuantity = this.filteredOrders.reduce(
      (sum, order) => sum + order.quantity,
      0,
    );
    this.orderCount = this.filteredOrders.length;
  }

  // Toggle expand row để hiển thị chi tiết hóa đơn
  toggleExpand(order: Order): void {
    order.expand = !order.expand;
  }

  // Reset filter
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
      case 'day': return `ngày ${date.format('DD/MM/YYYY')}`;
      case 'week': return `tuần ${date.week()} năm ${date.year()}`;
      case 'month': return `tháng ${date.format('MM/YYYY')}`;
      case 'year': return `năm ${date.format('YYYY')}`;
      default: return '';
    }
  }

  getStatusTag(status: string): string {
    switch (status) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'completed':
        return 'Hoàn thành';
      case 'pending':
        return 'Đang xử lý';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return status;
    }
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  }
}
