import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContentFollowComponent } from './content-follow.component';


@NgModule({
  imports: [
    CommonModule,
    NzModalModule,
    NzButtonModule,
    NzInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ContentFollowComponent
  ],
  exports: [ContentFollowComponent]
})
export class ContentFollowModule {}
