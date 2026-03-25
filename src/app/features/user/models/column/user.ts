import { ColumnItem } from "../Item/user";

export interface User {
  id?: any;
  name?: string;
  avatarUrl?: string;
  displayName?: string;
  department?: string;
  jobPosition?: string;
  email?: string;
  phone?: string;
  joinDate?: string;
  status?: 'active' | 'inactive';
}

export var listUser: ColumnItem[] = [
  {
    name: 'Mã nhân viên',
    key: 'employeeCode',
    hidden: false,
    listOfFilter: [],
    filterFn: null,
    sortFn: true,
    align: 'center'
  },
  {
    name: 'Tên người dùng',
    key: 'displayName',
    hidden: false,
    listOfFilter: [],
    filterFn: null,
    sortFn: true,
    align: 'left'
  },
  {
    name: 'Email',
    key: 'email',
    hidden: false,
    listOfFilter: [],
    filterFn: null,
    sortFn: true,
    align: 'left'
  },
  {
    name: 'Số điện thoại',
    key: 'phone',
    hidden: false,
    listOfFilter: [],
    filterFn: null,
    sortFn: true,
    align: 'center'
  },
  {
    name: 'Phòng ban',
    key: 'department',
    hidden: false,
    listOfFilter: [],
    filterFn: null,
    sortFn: true,
    align: 'left'
  },
  {
    name: 'Vị trí',
    key: 'jobPosition',
    hidden: false,
    listOfFilter: [],
    filterFn: null,
    sortFn: true,
    align: 'left'
  },
  {
    name: 'Trạng thái',
    key: 'status',
    hidden: false,
    listOfFilter: [
      { text: 'Đang làm', value: 'active' },
      { text: 'Đã nghỉ', value: 'inactive' }
    ],
    filterFn: (value: string, filter: string) => value === filter,
    sortFn: true,
    align: 'center'
  },
];