import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IconCustomService } from '../../core/services/icon/icon-system.service';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { UserRoutingModule } from './user-routing.module';
import { ManageUserComponent } from './pages/manage-user/manage-user.component';
import { UserAddComponent } from './pages/user-add/user-add.component';
import { UserDeleteComponent } from './pages/user-delete/user-delete.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTableModule } from 'ng-zorro-antd/table';
import { PaginationModule } from 'src/app/core/components/pagination/pagination.module';
import { ContentFollowModule } from 'src/app/core/components/content-follow/content-follow.module';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { PopupModule } from 'src/app/core/components/popup/popup.module';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { InputModule } from 'src/app/core/components/input/input.module';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

@NgModule({
  declarations: [
    ManageUserComponent,
    UserAddComponent,
    UserDeleteComponent,
    UserDetailsComponent,
    UserEditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzIconModule,
    UserRoutingModule,
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
    NzModalModule,
    NzFormModule,
    NzInputNumberModule,
    NzTagModule,
    InputModule,
    NzSpinModule,
    NzMessageModule,
    PerfectScrollbarModule
    ],
  providers: [
    IconCustomService
  ],
})
export class UserModule {}

