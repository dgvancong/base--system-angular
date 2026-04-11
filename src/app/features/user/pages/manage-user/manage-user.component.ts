import { Component, OnInit } from '@angular/core';
import { listUser, User } from '../../models/column/user';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInfo } from 'src/app/core/models/auth.model';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {

  listColumnsUserDisplay = [...listUser];
  listOfData: User[] = [
    {
      id: 1,
      displayName: 'Nguyễn Văn An',
      department: 'Phòng Công nghệ thông tin',
      jobPosition: 'Frontend Developer',
      email: 'an.nguyen@cloudron.com',
      phone: '0912345678',
      joinDate: '2023-01-15',
      status: 'active'
    },
  ];
  listOfDisplayData: User[] = [];
  setOfCheckedId = new Set<string>();
  checked = false;
  indeterminate = false;
  loading = false;
  total: number = 10;
  start: number = 1;
  page: number = 1;
  end: number = 10;
  pageSize: number = 10;
  pageSizeOptions = [10, 20, 50, 100, 150, 200];
  pageIndex: number = 1;
  jumpPage: number = 1;
  typeNoResult: 'load' | 'search' = 'load';
  isDeleteRole: boolean = false;
  currentUser: UserInfo | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  onItemChecked(data: any, checked: boolean): void {

  }

  onAllChecked(checked: boolean): void {

  }

  refreshCheckedStatus(): void {

  }

  onCurrentPageDataChange(event : any) {

  }

  onQueryParamsChange(params: NzTableQueryParams): void {

  }

  handlePageIndexChange(e: any){

  }

  handlePageSizeChange(newPageSize: number) {

  }

  jumpToPage(value: any){

  }

  showUserDetails(data: any): void {
    if (data?.id) {
      this.router.navigateByUrl(`/admin/manage-user/details/${data?.id}`);
    }
  }

  showDeleteRole(){
    this.isDeleteRole = true;
  }

  submitDeleteRole() {
    this.isDeleteRole = false;
  }

  canceDeleteRole() {
    this.isDeleteRole = false;
  }
}
