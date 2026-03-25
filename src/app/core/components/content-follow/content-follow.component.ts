import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-follow',
  templateUrl: './content-follow.component.html',
  styleUrls: ['./content-follow.component.scss']
})
export class ContentFollowComponent implements OnInit {

  @Input() type: 'search'|'load' = 'load';
  @Input() typeIcon: 'clasic' | 'folder' | 'file' | 'tag' = 'clasic';
  @Input() width: string = '100%';
  @Input() height: string = '100%';
  @Input() widthImg: string = '200px';
  @Input() heightImg: string = '200px';
  @Input() padding: string = '50px 0';

  @Input() labelFollow: string = 'Danh sách người dùng trống';
  @Input() contentFollow: string = 'Thông tin người dùng bạn tìm không có trong danh sách';

  @Input() labelFollowSearch: string = 'Không tìm thấy kết quả người dùng';
  @Input() contentFollowSearch: string = 'Thông tin bạn đang tìm kiếm không tồn tại';

  constructor() { }

  ngOnInit(): void {
  }

}
