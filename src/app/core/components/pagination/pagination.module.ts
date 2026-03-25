import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { PaginationComponent } from './pagination.component';
import { NzSelectModule } from 'ng-zorro-antd/select';


@NgModule({
  imports: [
    CommonModule,
    NzModalModule,
    NzButtonModule,
    NzInputModule,
    NzPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    NzSelectModule
  ],
  declarations: [
    PaginationComponent
  ],
  exports: [PaginationComponent]
})
export class PaginationModule {}
