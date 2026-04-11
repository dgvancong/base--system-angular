import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IconCustomService } from '../core/services/icon/icon-system.service';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { LayoutSystemComponent } from './layout-system/layout-system.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { PopupModule } from '../core/components/popup/popup.module';

@NgModule({
  declarations: [
    LayoutSystemComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzIconModule,
    LayoutRoutingModule,
    NzButtonModule,
    NzMenuModule,
    NzToolTipModule,
    NzDropDownModule,
    PopupModule
  ],
  providers: [
    IconCustomService
  ],
})
export class LayoutModule {}

