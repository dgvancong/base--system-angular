import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() jumpPage: number = 1;
  @Input() data: any[] = [];
  @Input() start: number = 1;
  @Input() end: number = 8;
  @Input() total: number = 8;
  @Input() page: number = 1;
  @Input() pageSize: number = 8;
  @Input() isJumPage: boolean = true;
  @Input() pageSizeOptions = [8, 16, 24, 32, 40, 48];
  @Input() showPageSizeSelector: boolean = true;
  @Input() isShowInfoPage: boolean = true;

  @Output() onJump = new EventEmitter<any>();
  @Output() onChangePage = new EventEmitter<any>();
  @Output() onPageSizeChange = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  jumpToPage(){
    this.onJump.emit(this.jumpPage);
  }

  handlePageIndexChange(event: any){
    this.page = event;
    this.onChangePage.emit(event);
  }

  handlePageSizeChange(event: any ) {
    this.pageSize = event
    this.onPageSizeChange.emit(this.pageSize);
  }

  onInput(event: Event): void {
    const input = (event.target as HTMLInputElement);
    input.value = input.value.replace(/[^0-9]/g, '');
    this.jumpPage = Number(input.value);
  }
}
