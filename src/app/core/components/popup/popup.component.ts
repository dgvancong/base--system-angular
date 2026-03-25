import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  @Input() width: string = '520px'
  @Input() isVisiblePopup: boolean = false;
  @Input() nzMaskClosable: boolean = false;
  @Input() isOkLoading: boolean = false;
  @Input() showIcon: boolean = true;
  @Input() title: string = 'Thông báo';
  @Input() label: string = 'Thông báo';
  @Input() contentText: string = 'Nội dung';
  @Input() isFooterDefaul: boolean = true;
  @Input() isLoadingOk : boolean = false;
  @Input() type: 'success' | 'error' | 'danger' | 'info' | 'warning' = 'success' ;
  @Input() deletedQuantityInSameFolder: number = 0;

  @Output() onOk = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  handleCancel(){
    this.onCancel.emit();
  }

  handleOk(){
    this.onOk.emit();
  }

}
