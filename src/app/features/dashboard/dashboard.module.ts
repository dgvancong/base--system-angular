import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IconCustomService } from '../../core/services/icon/icon-system.service';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTableModule } from 'ng-zorro-antd/table';
import { PaginationModule } from 'src/app/core/components/pagination/pagination.module';
import { ContentFollowModule } from 'src/app/core/components/content-follow/content-follow.module';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { PopupModule } from 'src/app/core/components/popup/popup.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboadComponent } from './pages/dashboad/dashboad.component';

@NgModule({
  declarations: [
    DashboadComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzIconModule,
    NzToolTipModule,
    NzTableModule,
    PaginationModule,
    ContentFollowModule,
    NzAvatarModule,
    PopupModule,
    NzButtonModule,
    NzRadioModule,
    NzSliderModule,
    NzInputModule,
    FormsModule,
    NzSelectModule,
    DashboardRoutingModule,
    NzDatePickerModule,
    NzCardModule,
    NzStatisticModule,
    NzGridModule,
    NzTagModule,
    NzDividerModule,
    NzEmptyModule
  ],
  providers: [
    IconCustomService
  ],
})
export class DashboardModule {}

