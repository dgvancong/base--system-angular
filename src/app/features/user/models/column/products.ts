import { ColumnItem } from "../Item/user";

export interface Product {
  productID?: number;
  productCode?: string;
  productName?: string;
  supplierName?: string;
  categoryName?: string;
  color?: string;
  size?: string;
  purchasePrice?: number;
  sellingPrice?: number;
  quantityInStock?: number;
  description?: string;
  brandName?: string;
  material?: string;
  gender?: string;
  status?: 'Đang bán' | 'Hết hàng' | 'Ngừng bán';
  createdDate?: Date;
  updatedDate?: Date;
  isAvailable?: boolean;
  profit?: number;
  profitMargin?: number;
}

export var listProduct: ColumnItem[] = [
  {
    name: 'Mã sản phẩm',
    key: 'productCode',
    hidden: false,
    listOfFilter: [],
    filterFn: null,
    sortFn: true,
    align: 'center',
    width: '120px'
  },
  {
    name: 'Tên sản phẩm',
    key: 'productName',
    hidden: false,
    listOfFilter: [],
    filterFn: null,
    sortFn: true,
    align: 'left',
    width: '250px'
  },
  {
    name: 'Danh mục',
    key: 'categoryName',
    hidden: false,
    listOfFilter: [],
    filterFn: null,
    sortFn: true,
    align: 'left',
    width: '120px'
  },
  {
    name: 'Nhà cung cấp',
    key: 'brandName',
    hidden: false,
    listOfFilter: [],
    filterFn: null,
    sortFn: true,
    align: 'left',
    width: '120px'
  },
  {
    name: 'Màu sắc',
    key: 'color',
    hidden: false,
    listOfFilter: [],
    filterFn: null,
    sortFn: false,
    align: 'center',
    width: '100px'
  },
  {
    name: 'Kích thước',
    key: 'size',
    hidden: false,
    listOfFilter: [],
    filterFn: null,
    sortFn: false,
    align: 'center',
    width: '80px'
  },
  {
    name: 'Giá nhập',
    key: 'purchasePrice',
    hidden: false,
    listOfFilter: [],
    filterFn: null,
    sortFn: true,
    align: 'right',
    width: '120px'
  },
  {
    name: 'Giá bán',
    key: 'sellingPrice',
    hidden: false,
    listOfFilter: [],
    filterFn: null,
    sortFn: true,
    align: 'right',
    width: '120px'
  },
  {
    name: 'Số lượng',
    key: 'quantityInStock',
    hidden: false,
    listOfFilter: [],
    filterFn: null,
    sortFn: true,
    align: 'center',
    width: '100px'
  },
  {
    name: 'Chất liệu',
    key: 'material',
    hidden: true,
    listOfFilter: [],
    filterFn: null,
    sortFn: false,
    align: 'left',
    width: '100px'
  },
  {
    name: 'Giới tính',
    key: 'gender',
    hidden: true,
    listOfFilter: [
      { text: 'Nam', value: 'Nam' },
      { text: 'Nữ', value: 'Nữ' },
      { text: 'Unisex', value: 'Unisex' }
    ],
    filterFn: (value: string, filter: string) => value === filter,
    sortFn: true,
    align: 'center',
    width: '100px'
  },
  {
    name: 'Trạng thái',
    key: 'status',
    hidden: false,
    listOfFilter: [
      { text: 'Đang bán', value: 'Đang bán' },
      { text: 'Hết hàng', value: 'Hết hàng' },
      { text: 'Ngừng bán', value: 'Ngừng bán' }
    ],
    filterFn: (value: string, filter: string) => value === filter,
    sortFn: true,
    align: 'center',
    width: '100px'
  },
  {
    name: 'Ngày tạo',
    key: 'createdDate',
    hidden: true,
    listOfFilter: [],
    filterFn: null,
    sortFn: true,
    align: 'center',
    width: '120px'
  }
];
