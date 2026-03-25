import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { PopupComponent } from './popup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NzModalModule,
    NzButtonModule,
    NzInputModule,
    NzIconModule
  ],
  declarations: [
    PopupComponent
  ],
  exports: [PopupComponent]
})
export class PopupModule {}
